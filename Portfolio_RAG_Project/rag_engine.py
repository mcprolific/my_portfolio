import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

from typing import Generator
from langchain_core.output_parsers import StrOutputParser


# ---------------- LOAD ENV ----------------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY not found")

# ---------------- LOAD PDF ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(BASE_DIR, "CV", "CV_Saka_Idris_Ajayi.pdf")

if not os.path.exists(PDF_PATH):
    raise FileNotFoundError(f"CV PDF not found at {PDF_PATH}")

loader = PyPDFLoader(PDF_PATH)
pages = loader.load()

# ---------------- SPLIT DOCUMENT ----------------
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)
documents = splitter.split_documents(pages)

# ---------------- EMBEDDINGS ----------------
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=api_key
)

# ---------------- VECTOR STORE (LAZY LOAD) ----------------
_vectorstore = None

def get_vectorstore():
    global _vectorstore
    if _vectorstore is None:
        _vectorstore = FAISS.from_documents(documents, embeddings)
    return _vectorstore

def get_retriever():
    return get_vectorstore().as_retriever(search_kwargs={"k": 4})

# ---------------- LLM ----------------
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0,
    openai_api_key=api_key
)

# ---------------- PROMPT ----------------
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an AI assistant that answers questions strictly from the owner's CV.

RULES:
- Use ONLY the provided CV context.
- If the answer is not found in the CV, say exactly:
  "This information is not available in the CV."
- Do NOT guess.
- Do NOT add external knowledge.
"""
    ),
    ("human", "Question: {question}\n\nCV Context:\n{context}")
])

# ---------------- FORMAT DOCS ----------------
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# ---------------- RAG CHAIN ----------------
def get_rag_chain():
    return (
        {
            "context": get_retriever() | format_docs,
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
    )

output_parser = StrOutputParser()

def get_rag_chain_stream():
    return (
        {
            "context": get_retriever() | format_docs,
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | output_parser
    )

def ask_question_stream(question: str) -> Generator[str, None, None]:
    chain = get_rag_chain_stream()
    for chunk in chain.stream(question):
        yield chunk


# ---------------- PUBLIC FUNCTION ----------------
def ask_question(question: str) -> str:
    rag_chain = get_rag_chain()
    response = rag_chain.invoke(question)
    return response.content
