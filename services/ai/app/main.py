from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    admission_chatbot,
    student_coach,
    parent_reports,
    teacher_copilot,
    principal_analytics,
    fee_recovery,
)

app = FastAPI(
    title="School OS AI Microservice",
    description="LLM-powered AI features: RAG chatbot, student coach, teacher copilot, executive summaries",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admission_chatbot.router, prefix="/ai/admission", tags=["Admission Chatbot"])
app.include_router(student_coach.router, prefix="/ai/student", tags=["Student Coach"])
app.include_router(parent_reports.router, prefix="/ai/parent", tags=["Parent Reports"])
app.include_router(teacher_copilot.router, prefix="/ai/teacher", tags=["Teacher Copilot"])
app.include_router(principal_analytics.router, prefix="/ai/principal", tags=["Principal Analytics"])
app.include_router(fee_recovery.router, prefix="/ai/fees", tags=["Fee Recovery"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "school-os-ai"}
