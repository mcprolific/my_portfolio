from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from .database import Base
from sqlalchemy.orm import relationship

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    source = Column(String(255), nullable=True)
    created_at = Column(DateTime, server_default=func.current_timestamp())

class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.current_timestamp())

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    image = Column(String(512), nullable=True)
    link = Column(String(512), nullable=True)
    created_at = Column(DateTime, server_default=func.current_timestamp())

class HomeContent(Base):
    __tablename__ = "home_content"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    desc = Column(Text, nullable=True)
    updated_at = Column(DateTime, server_default=func.current_timestamp())

class AboutContent(Base):
    __tablename__ = "about_content"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    p1 = Column(Text, nullable=True)
    p2 = Column(Text, nullable=True)
    updated_at = Column(DateTime, server_default=func.current_timestamp())

class ResumeItem(Base):
    __tablename__ = "resume_items"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    icon_key = Column(String(64), nullable=True)
    description = Column(Text, nullable=True)
    sort_order = Column(Integer, default=0)
    skills = relationship("ResumeSkill", back_populates="item", cascade="all, delete-orphan")

class ResumeSkill(Base):
    __tablename__ = "resume_skills"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    item_id = Column(Integer, ForeignKey("resume_items.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    level = Column(String(64), nullable=True)
    item = relationship("ResumeItem", back_populates="skills")

class SocialLinks(Base):
    __tablename__ = "social_links"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    github = Column(String(512), nullable=True)
    linkedin = Column(String(512), nullable=True)
    twitter = Column(String(512), nullable=True)
    updated_at = Column(DateTime, server_default=func.current_timestamp())

class SiteSettings(Base):
    __tablename__ = "site_settings"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    theme = Column(String(32), nullable=False, default="light")
    updated_at = Column(DateTime, server_default=func.current_timestamp())

class ContactSettings(Base):
    __tablename__ = "contact_settings"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    subtitle = Column(String(255), nullable=True)
    updated_at = Column(DateTime, server_default=func.current_timestamp())
