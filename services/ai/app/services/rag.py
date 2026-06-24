from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from app.config import settings


def get_embeddings():
    """Use free local HuggingFace embeddings when no OpenAI key is set."""
    if settings.openai_api_key:
        return OpenAIEmbeddings(api_key=settings.openai_api_key)
    # all-MiniLM-L6-v2: small, fast, runs fully locally — no API key needed
    return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


def get_vectorstore(collection: str) -> Chroma:
    embeddings = get_embeddings()
    return Chroma(
        collection_name=collection,
        embedding_function=embeddings,
        persist_directory=settings.chroma_persist_dir,
    )


def ingest_document(file_path: str, collection: str, school_id: str) -> int:
    """Ingest a PDF or text document into the school's RAG vector store."""
    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    else:
        loader = TextLoader(file_path)

    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    for chunk in chunks:
        chunk.metadata["school_id"] = school_id

    vs = get_vectorstore(collection)
    vs.add_documents(chunks)
    return len(chunks)
