from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import ask_question

from fastapi.responses import StreamingResponse
from rag_engine import ask_question_stream

app = FastAPI(title="CV RAG API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {"status": "RAG API is running"}

@app.post("/ask")
def ask(req: QuestionRequest):
    try:
        answer = ask_question(req.question)
        return {"answer": answer}
    except Exception as e:
        print("ERROR:", e)
        return {
            "answer": "I could not process that question right now."
        }

@app.post("/ask-stream")
def ask_stream(req: QuestionRequest):
    return StreamingResponse(
        ask_question_stream(req.question),
        media_type="text/plain"
    )