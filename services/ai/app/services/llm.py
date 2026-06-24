from langchain_groq import ChatGroq
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from app.config import settings


def get_llm(provider: str | None = None):
    """Return the configured LLM. Defaults to Groq (fast, free-tier friendly)."""
    p = provider or settings.default_llm

    if p == "groq":
        return ChatGroq(
            model=settings.groq_model,
            api_key=settings.groq_api_key,
            temperature=0.3,
            max_tokens=1024,
        )

    if p == "anthropic":
        return ChatAnthropic(
            model="claude-sonnet-4-6",
            api_key=settings.anthropic_api_key,
            temperature=0.3,
            max_tokens=1024,
        )

    return ChatOpenAI(
        model="gpt-4o",
        api_key=settings.openai_api_key,
        temperature=0.3,
        max_tokens=1024,
    )
