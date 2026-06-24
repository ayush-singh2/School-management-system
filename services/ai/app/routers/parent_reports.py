from fastapi import APIRouter
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.llm import get_llm

router = APIRouter()

REPORT_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are writing a parent-facing academic report. Use simple, non-technical language. Be warm but factual. Maximum 4 sentences. Highlight improvement areas gently."),
    ("human", """Child: {child_name}, Class: {class_name}, Parent: {parent_name}
Attendance this quarter: {attendance_pct}%
Math marks trend: {math_trend}
Science marks trend: {science_trend}
English marks trend: {english_trend}
Behaviour: {behaviour}
Fees status: {fees_status}

Write a natural language progress summary for the parent."""),
])


class ParentReportData(BaseModel):
    child_name: str
    class_name: str
    parent_name: str
    attendance_pct: float
    math_trend: str
    science_trend: str
    english_trend: str
    behaviour: str
    fees_status: str


class ParentReportResponse(BaseModel):
    report: str


@router.post("/report", response_model=ParentReportResponse)
async def generate_parent_report(data: ParentReportData):
    chain = REPORT_PROMPT | get_llm() | StrOutputParser()
    report = await chain.ainvoke(data.model_dump())
    return ParentReportResponse(report=report)
