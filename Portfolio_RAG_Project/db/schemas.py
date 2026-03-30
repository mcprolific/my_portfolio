from pydantic import BaseModel, EmailStr
from typing import Optional, List

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str
    source: Optional[str] = None

class HomeUpdate(BaseModel):
    title: str
    desc: Optional[str] = None

class AboutUpdate(BaseModel):
    p1: Optional[str] = None
    p2: Optional[str] = None

class SocialUpdate(BaseModel):
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None

class SettingsUpdate(BaseModel):
    theme: str

class ContactSettingsUpdate(BaseModel):
    subtitle: Optional[str] = None

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    image: Optional[str] = None
    link: Optional[str] = None

class ResumeSkillIn(BaseModel):
    name: str
    level: Optional[str] = None

class ResumeItemIn(BaseModel):
    title: str
    iconKey: Optional[str] = None
    description: Optional[str] = None
    skills: List[ResumeSkillIn] = []

class ResumeUpsert(BaseModel):
    items: List[ResumeItemIn]
