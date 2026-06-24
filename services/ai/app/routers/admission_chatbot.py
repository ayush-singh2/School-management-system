from fastapi import APIRouter
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from app.services.llm import get_llm
from app.services.rag import get_vectorstore

router = APIRouter()

SYSTEM_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are a helpful admission assistant for a school. Answer only questions
about admissions, fees, bus routes, school facilities, and academic programs.
Use only the context provided. If you don't know, say so politely.

Context:
{context}

Question: {question}
Answer:""",
)


class ChatRequest(BaseModel):
    school_id: str
    question: str


class ChatResponse(BaseModel):
    answer: str
    source_docs: int


@router.post("/chat", response_model=ChatResponse)
async def admission_chat(req: ChatRequest):
    vs = get_vectorstore(f"admission_{req.school_id}")
    retriever = vs.as_retriever(
        search_kwargs={"k": 4, "filter": {"school_id": req.school_id}}
    )
    chain = RetrievalQA.from_chain_type(
        llm=get_llm(),
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": SYSTEM_PROMPT},
        return_source_documents=True,
    )
    result = chain.invoke({"query": req.question})
    return ChatResponse(
        answer=result["result"],
        source_docs=len(result.get("source_documents", [])),
    )
