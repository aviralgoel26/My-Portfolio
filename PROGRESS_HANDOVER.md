# Portfolio Microservices — Project Documentation

> **Status**: Completed  
> **Tech Stack**: Spring Boot | Java | React | MongoDB | Kafka | Redis | Docker

---

## 🌟 Project Overview

This project is a modern, high-performance **Personal Portfolio & Content Management System (CMS)**. 
Unlike a standard static website, this platform is built using an advanced "Microservices" architecture—the same underlying structure used by large tech companies like Netflix and Amazon. 

It allows you to not only showcase your skills, projects, and experiences beautifully to visitors but also provides a secure **Admin Dashboard** where you can dynamically add, edit, or delete content without ever needing to touch the code again.

---

## ✨ Key Features

- **Public Portfolio Showcase**: A beautiful, dark-themed, highly interactive frontend for visitors to view your projects, skills, and professional journey.
- **Admin CMS Dashboard**: A secure backend panel where you can manage your entire portfolio dynamically.
- **Event-Driven Contact Form**: When a visitor submits a contact form, the system processes the email asynchronously in the background so the user's screen never freezes.
- **Analytics Engine**: Silently tracks visitor telemetry (like page views) in the background.

---

## 🏗️ How It Works (For Non-Technical Readers)

Imagine this project as a **highly organized restaurant**:
- The **Frontend (React)** is the dining area and the menu. It's what the customers see and interact with.
- The **API Gateway** is the head waiter. Every request (or order) goes through the waiter, who ensures it gets sent to the right department.
- The **Microservices (Spring Boot)** are the specialized kitchen stations. Instead of one huge kitchen trying to do everything, there is a dedicated station for Authentication, a station for Profile Content, and a station for sending Emails. If one station gets overwhelmed, the rest of the kitchen keeps working fine.
- The **Databases (MongoDB & Redis)** are the pantry where all the ingredients (data) are stored.
- The **Event Broker (Kafka)** is the conveyor belt. If the waiter needs an email sent, they drop the request on the belt, and the email station picks it up whenever they are ready, without keeping the customer waiting.

---

## 💻 Technology Stack Explained

Here is the tech stack used to build this platform, explained simply:

### 1. Frontend (The User Interface)
- **React (with TypeScript & Vite)**: The engine that builds the visual components on the screen. It makes the website feel like a fast, native app rather than a clunky webpage.
- **TailwindCSS & Framer Motion**: Tools used to make the website look beautiful with modern styling and smooth animations.

### 2. Backend (The Logic Engine)
- **Java & Spring Boot**: The robust programming language and framework that powers the core logic of the application. It handles security, business rules, and data processing.
- **Spring Cloud (API Gateway & Eureka)**: Specialized tools that manage traffic and help the different microservices "find" each other on the network.

### 3. Data Storage & Messaging
- **MongoDB**: A modern, flexible database. Instead of rigid tables, it stores data like documents, making it perfect for varied content like projects and skills.
- **Apache Kafka**: A powerful message broker. It handles "events" (like a user viewing a project or sending a message) in the background so the main application stays incredibly fast.
- **Redis**: A high-speed caching system. It remembers frequently accessed data so the database doesn't have to work as hard, speeding up response times.

### 4. Infrastructure & Deployment
- **Docker**: A tool that packages the entire application into "containers." This ensures that the code runs exactly the same way on any computer or server in the world, completely eliminating the "it works on my machine" problem.

---

## 🛠️ Detailed Service Breakdown

The system is divided into several independent services, each running on its own designated network port (standardized to the `606X` series to avoid conflicts).

| Service | Port | What it does |
|---------|------|--------------|
| **Frontend Service** | `6060` | Serves the actual website to the user's browser. |
| **Gateway Service** | `6061` | The "front door" for all data requests. Checks security and routes traffic. |
| **Auth Service** | `6062` | Handles Admin login, password verification, and issues secure access tokens. |
| **Profile Content** | `6063` | Manages the creation, reading, updating, and deletion of your Skills, Projects, and Experience. |
| **Media Service** | `6064` | Handles uploading images (like project screenshots) to the cloud (Cloudinary). |
| **Analytics Service** | `6065` | Silently processes data in the background (like counting how many people viewed a project). |
| **Notification Service**| `6066` | Listens for contact form submissions and safely dispatches emails in the background. |
| **Eureka Server** | `6067` | The "phonebook". It keeps a directory of all running services so they can talk to each other. |

---

## 🔐 Setup & Configuration

To run this project, the system requires certain "Secrets" (like passwords and API keys) to be provided in a `.env` file at the root directory.

**Required Secrets:**
- **Database Credentials**: Username and password for MongoDB.
- **Security Key**: A random string (`JWT_SECRET`) used to encrypt admin login sessions.
- **Email Configuration**: SMTP details (like a Gmail app password) so the Notification Service can send contact form emails.
- **Cloudinary Keys**: API credentials for the image hosting service.
- **Admin Setup**: A default admin username and password to log into the CMS for the first time.

### How to start the project:
1. Ensure Docker Desktop is running.
2. Ensure the `.env` file is fully populated.
3. Run the following command in your terminal to start all services:
   ```bash
   docker-compose up -d
   ```
4. Access the public portfolio at `http://localhost:6060` and the Admin CMS at `http://localhost:6060/login`.
