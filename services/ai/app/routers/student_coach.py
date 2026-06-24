from fastapi import APIRouter
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.llm import get_llm

router = APIRouter()

COACH_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an empathetic student academic coach. Provide concise, actionable insights. Be encouraging. Avoid jargon. Max 3 sentences."),
    ("human", """Student: {name}, Class: {class_name}
Attendance: {attendance_pct}% (previous: {prev_attendance_pct}%)
Strongest subject: {strongest_subject}
Weakest subject: {weakest_subject}
Overall marks trend: {marks_trend}
Pending assignments: {pending_assignments}

Generate a personalised academic insight for this student."""),
])


class StudentData(BaseModel):
    name: str
    class_name: str
    attendance_pct: float
    prev_attendance_pct: float
    strongest_subject: str
    weakest_subject: str
    marks_trend: str
    pending_assignments: int


class CoachResponse(BaseModel):
    insight: str


@router.post("/coach", response_model=CoachResponse)
async def student_coach(data: StudentData):
    chain = COACH_PROMPT | get_llm() | StrOutputParser()
    insight = await chain.ainvoke(data.model_dump())
    return CoachResponse(insight=insight)
