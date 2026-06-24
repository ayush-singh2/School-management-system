from fastapi import APIRouter
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.llm import get_llm

router = APIRouter()

RECOVERY_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are helping a school accountant recover outstanding fees. Generate a polite but firm reminder message. Keep it under 100 words. Be respectful of family circumstances."),
    ("human", """Student: {student_name}, Class: {class_name}
Parent: {parent_name}
Outstanding amount: ₹{amount}
Overdue by: {overdue_days} days
Previous reminders sent: {prev_reminders}
Preferred channel: {channel}

Generate a fee reminder message."""),
])


class FeeReminderRequest(BaseModel):
    student_name: str
    class_name: str
    parent_name: str
    amount: float
    overdue_days: int
    prev_reminders: int
    channel: str = "WhatsApp"


@router.post("/reminder")
async def generate_fee_reminder(req: FeeReminderRequest):
    chain = RECOVERY_PROMPT | get_llm() | StrOutputParser()
    message = await chain.ainvoke(req.model_dump())
    return {"message": message, "channel": req.channel}
