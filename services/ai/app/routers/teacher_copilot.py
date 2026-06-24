from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.llm import get_llm

router = APIRouter()


class LessonPlanRequest(BaseModel):
    subject: str
    chapter: str
    num_classes: int
    grade: str


class QuestionGenRequest(BaseModel):
    subject: str
    topic: str
    grade: str
    difficulty: Literal["easy", "medium", "hard"]
    num_mcq: int = 5
    num_short: int = 3
    num_long: int = 2


LESSON_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are a curriculum expert. Generate structured weekly lesson plans for Indian school teachers."),
    ("human", "Subject: {subject}, Chapter: {chapter}, Grade: {grade}, Number of classes: {num_classes}\n\nGenerate a lesson plan with learning objectives, activities, and assessment strategy."),
])

QUESTION_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an experienced question paper setter for Indian schools (CBSE/ICSE). Generate varied questions."),
    ("human", "Subject: {subject}, Topic: {topic}, Grade: {grade}, Difficulty: {difficulty}\nGenerate {num_mcq} MCQs, {num_short} short-answer, and {num_long} long-answer questions."),
])


@router.post("/lesson-plan")
async def generate_lesson_plan(req: LessonPlanRequest):
    chain = LESSON_PROMPT | get_llm() | StrOutputParser()
    plan = await chain.ainvoke(req.model_dump())
    return {"lesson_plan": plan}


@router.post("/question-paper")
async def generate_question_paper(req: QuestionGenRequest):
    chain = QUESTION_PROMPT | get_llm() | StrOutputParser()
    paper = await chain.ainvoke(req.model_dump())
    return {"question_paper": paper}
