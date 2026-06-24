from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    groq_api_key: str = ""
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    database_url: str = ""
    redis_url: str = "redis://localhost:6379"
    chroma_persist_dir: str = "./chroma_db"
    # "groq" | "openai" | "anthropic"
    default_llm: str = "groq"
    # Groq model — llama-3.3-70b-versatile is free-tier and very capable
    groq_model: str = "llama-3.3-70b-versatile"
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
