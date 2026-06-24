from fastapi import APIRouter
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.llm import get_llm

router = APIRouter()

SUMMARY_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an executive assistant for a school principal. Summarise complex school metrics into 4-5 bullet points. Be direct and factual. Flag concerns clearly."),
    ("human", """Month: {month}
Total students: {total_students}, New admissions: {new_admissions}
Avg attendance: {avg_attendance}% (prev: {prev_avg_attendance}%)
Fee collection rate: {fee_collection_pct}% (outstanding: ₹{outstanding_fees})
Top performing class: {top_class}
Struggling class: {struggling_class}
Staff attendance: {staff_attendance}%

Generate a concise executive summary with actionable points."""),
])


class SchoolMetrics(BaseModel):
    month: str
    total_students: int
    new_admissions: int
    avg_attendance: float
    prev_avg_attendance: float
    fee_collection_pct: float
    outstanding_fees: float
    top_class: str
    struggling_class: str
    staff_attendance: float


@router.post("/summary")
async def executive_summary(metrics: SchoolMetrics):
    chain = SUMMARY_PROMPT | get_llm() | StrOutputParser()
    summary = await chain.ainvoke(metrics.model_dump())
    return {"summary": summary}
