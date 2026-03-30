from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import ask_question
from sqlalchemy.orm import Session
from db.database import SessionLocal, init_db
from db.models import (
    ContactMessage,
    HomeContent, AboutContent, SocialLinks, SiteSettings, ContactSettings,
    Project, ResumeItem, ResumeSkill
)
from db.schemas import (
    ContactMessageCreate, HomeUpdate, AboutUpdate, SocialUpdate,
    ContactSettingsUpdate, SettingsUpdate, ProjectCreate, ResumeUpsert
)

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

@app.on_event("startup")
def on_startup():
    init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@app.post("/contact")
def submit_contact(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    name = payload.name.strip()
    email = payload.email.strip()
    message = payload.message.strip()
    source = (payload.source or "").strip() if payload.source else None
    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="All fields are required")
    contact = ContactMessage(name=name, email=email, message=message, source=source)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return {"status": "ok", "id": contact.id}

# ---------------- Admin content APIs ----------------
@app.get("/admin/overview")
def admin_overview(db: Session = Depends(get_db)):
    home = db.query(HomeContent).first()
    about = db.query(AboutContent).first()
    social = db.query(SocialLinks).first()
    settings = db.query(SiteSettings).first()
    contact_settings = db.query(ContactSettings).first()
    projects = db.query(Project).order_by(Project.id.desc()).all()
    items = db.query(ResumeItem).order_by(ResumeItem.sort_order, ResumeItem.id).all()
    resume = []
    for it in items:
        resume.append({
            "id": it.id,
            "title": it.title,
            "iconKey": it.icon_key,
            "description": it.description,
            "skills": [{"name": s.name, "level": s.level} for s in it.skills]
        })
    return {
        "home": {"title": home.title if home else "", "desc": home.desc if home else ""},
        "about": {"p1": about.p1 if about else "", "p2": about.p2 if about else ""},
        "social": {"github": social.github if social else "", "linkedin": social.linkedin if social else "", "twitter": social.twitter if social else ""},
        "settings": {"theme": settings.theme if settings else "light"},
        "contact": {"subtitle": contact_settings.subtitle if contact_settings else ""},
        "projects": [{"id": p.id, "title": p.title, "description": p.description, "image": p.image, "link": p.link} for p in projects],
        "resume": resume,
    }

@app.put("/admin/home")
def update_home(payload: HomeUpdate, db: Session = Depends(get_db)):
    row = db.query(HomeContent).first()
    if not row:
        row = HomeContent(title=payload.title, desc=payload.desc or "")
        db.add(row)
    else:
        row.title = payload.title
        row.desc = payload.desc or ""
    db.commit()
    return {"status": "ok"}

@app.put("/admin/about")
def update_about(payload: AboutUpdate, db: Session = Depends(get_db)):
    row = db.query(AboutContent).first()
    if not row:
        row = AboutContent(p1=payload.p1 or "", p2=payload.p2 or "")
        db.add(row)
    else:
        row.p1 = payload.p1 or ""
        row.p2 = payload.p2 or ""
    db.commit()
    return {"status": "ok"}

@app.put("/admin/social")
def update_social(payload: SocialUpdate, db: Session = Depends(get_db)):
    row = db.query(SocialLinks).first()
    if not row:
        row = SocialLinks(github=payload.github or "", linkedin=payload.linkedin or "", twitter=payload.twitter or "")
        db.add(row)
    else:
        row.github = payload.github or ""
        row.linkedin = payload.linkedin or ""
        row.twitter = payload.twitter or ""
    db.commit()
    return {"status": "ok"}

@app.put("/admin/settings")
def update_settings(payload: SettingsUpdate, db: Session = Depends(get_db)):
    row = db.query(SiteSettings).first()
    if not row:
        row = SiteSettings(theme=payload.theme)
        db.add(row)
    else:
        row.theme = payload.theme
    db.commit()
    return {"status": "ok"}

@app.put("/admin/contact")
def update_contact_settings(payload: ContactSettingsUpdate, db: Session = Depends(get_db)):
    row = db.query(ContactSettings).first()
    if not row:
        row = ContactSettings(subtitle=payload.subtitle or "")
        db.add(row)
    else:
        row.subtitle = payload.subtitle or ""
    db.commit()
    return {"status": "ok"}

@app.get("/admin/projects")
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.id.desc()).all()
    return [{"id": p.id, "title": p.title, "description": p.description, "image": p.image, "link": p.link} for p in projects]

@app.post("/admin/projects")
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    p = Project(title=payload.title, description=payload.description, image=payload.image, link=payload.link)
    db.add(p)
    db.commit()
    db.refresh(p)
    return {"status": "ok", "id": p.id}

@app.delete("/admin/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(p)
    db.commit()
    return {"status": "ok"}

@app.put("/admin/resume")
def upsert_resume(payload: ResumeUpsert, db: Session = Depends(get_db)):
    # Clear existing
    db.query(ResumeSkill).delete()
    db.query(ResumeItem).delete()
    db.commit()
    # Insert new
    for idx, item in enumerate(payload.items):
        it = ResumeItem(title=item.title, icon_key=item.iconKey, description=item.description, sort_order=idx)
        db.add(it)
        db.flush()
        for sk in item.skills:
            db.add(ResumeSkill(item_id=it.id, name=sk.name, level=sk.level))
    db.commit()
    return {"status": "ok"}
