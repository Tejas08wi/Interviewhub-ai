# 🚀 InterviewHub AI

An AI-powered full-stack recruitment platform that streamlines the hiring process by connecting candidates and recruiters while leveraging Google Gemini AI for resume analysis and AI-generated mock interviews.

---

## 📌 Overview

InterviewHub AI enables candidates to build professional profiles, upload resumes, receive AI-powered resume analysis, practice AI-generated interviews, and apply for jobs. Recruiters can manage jobs, review applications, download resumes, and track hiring. Administrators oversee the complete platform through a dedicated dashboard.

---

## ✨ Features

### 👨‍🎓 Candidate

- Secure JWT Authentication
- Candidate Profile Management (CRUD)
- Resume Upload, Download & Delete
- AI Resume Analysis using Google Gemini
- AI Interview Question Generation
- Interview Submission & Evaluation
- Interview History
- Browse Available Jobs
- Search Jobs
- View Job Details
- Apply for Jobs
- Track My Applications

---

### 🏢 Recruiter

- Secure Recruiter Authentication
- Recruiter Profile Management
- Dashboard
- Create Job
- Update Job
- Delete Job
- View Posted Jobs
- View Applications
- Update Candidate Application Status
- Download Candidate Resume

---

### 👨‍💼 Admin

- Dashboard
- Candidate Management
- Recruiter Management
- Job Management
- Application Management
- Interview Management

---

## 🤖 AI Features

- Resume Analysis using Google Gemini API
- Skill Extraction
- Strength & Weakness Identification
- ATS Score Generation
- Improvement Suggestions
- AI Interview Question Generation
- AI Interview Evaluation

---

# 🛠 Tech Stack

## Backend

- Java 17
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Google Gemini REST API
- WebClient
- Jackson ObjectMapper
- Apache PDFBox

---

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router DOM
- Context API

---

## Database

- MySQL

---

# 🏗 Architecture

```
React Frontend
        │
        ▼
REST API (Axios)
        │
        ▼
Spring Boot Backend
        │
        ▼
Service Layer
        │
        ▼
Repository Layer (JPA)
        │
        ▼
MySQL Database

                │
                ▼
        Google Gemini API
```

---

# 📁 Project Structure

```
InterviewHub-AI

├── backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
├── frontend
│   ├── src
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- Role-Based Authorization
- Spring Security
- Protected Routes
- Axios JWT Interceptor
- Session Persistence

---

# 📄 Backend Architecture

```
Controller
     │
     ▼
Service Interface
     │
     ▼
Service Implementation
     │
     ▼
Repository
     │
     ▼
Database
```

---

# 🎯 Frontend Architecture

```
components
context
layouts
pages
routes
services
utils
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Tejas08wi/Interviewhub-ai.git
```

---

## Backend

```bash
cd backend
```

Install dependencies

```bash
mvn clean install
```

Run

```bash
mvn spring-boot:run
```

---

## Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create the following files before running the project.

### Backend

```
src/main/resources/application.properties
```

Configure:

```
Database URL
Database Username
Database Password
JWT Secret
Gemini API Key
```

---

### Frontend

```
.env
```

Example

```
VITE_API_BASE_URL=http://localhost:8081
```

---

# 📚 API Documentation

Swagger UI

```
http://localhost:8081/swagger-ui/index.html
```

---

# 📸 Screenshots

Add screenshots here.

Examples:

- Login Page
- Candidate Dashboard
- Recruiter Dashboard
- Admin Dashboard
- Resume Analysis
- AI Interview
- Job Listing
- Application Page

---

# 🚀 Future Improvements

- Email Notifications
- Interview Scheduling
- Real-time Chat
- Video Interview Integration
- Resume Builder
- AI Skill Gap Analysis
- Company Profiles
- Analytics Dashboard

---

# 👨‍💻 Author

**Tejaswi Kumar**

B.Tech CSE

KIIT University

GitHub:
https://github.com/Tejas08wi

---

# ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.

---
