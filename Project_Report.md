# COLLEGE PROJECT REPORT ON "PACKMATE: A FULL-STACK TRAVEL PACKING LIST ORGANIZER"

**A Project Report submitted in partial fulfillment of the requirements for the degree of Bachelor of Computer Applications / Bachelor of Technology in Computer Science and Engineering.**

---

### **Submitted By:**
* **Student Name:** [Your Name]
* **Register / Roll Number:** [Your Register Number]
* **Department:** Department of Computer Applications / Computer Science

### **Under the Guidance of:**
* **Guide Name:** [Guide Name / Project Mentor Name]
* **Designation:** [Assistant Professor / Head of Department]

### **Institution Details:**
* **College Name:** [Your College / University Name]
* **Academic Year:** 2025 - 2026

---

## **DECLARATION**

I hereby declare that this project report entitled **"PackMate: A Full-Stack Travel Packing List Organizer"** is an authentic work carried out by me under the guidance of **[Guide Name]**. The work presented in this report has not been submitted for the award of any other degree or diploma elsewhere.

**Date:**  
**Place:**  

**Signature of the Student:**  

---

## **CERTIFICATE**

This is to certify that the project report entitled **"PackMate: A Full-Stack Travel Packing List Organizer"** is a bonafide record of work done by **[Your Name]** (Reg. No: **[Your Register Number]**) in partial fulfillment of the requirements for the award of the degree of Bachelor of Computer Science / Applications during the academic year 2025-2026.

<br>

**Signature of the Guide** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Signature of the Head of Department**  
*(Designation)* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *(Department Name)*  

<br>

**Signature of the Internal Examiner** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Signature of the External Examiner**  

---

## **ACKNOWLEDGEMENT**

I express my deep sense of gratitude and sincere thanks to our respected Principal, **[Principal Name]**, and our Head of the Department, **[HOD Name]**, for providing the necessary facilities and encouragement during the course of this project.

I am highly indebted to my guide, **[Guide Name]**, for their valuable guidance, constructive suggestions, and constant encouragement throughout the development of the project.

Lastly, I thank my parents, teachers, and friends who directly or indirectly helped me in successfully compiling this project work on time.

**[Your Name]**  

---

## **TABLE OF CONTENTS**

1. **Abstract**
2. **Introduction**
   - 2.1 Project Overview
   - 2.2 Problem Statement
   - 2.3 Objectives
   - 2.4 Project Scope
3. **System Requirements Specification (SRS)**
   - 3.1 Hardware Requirements
   - 3.2 Software Requirements
4. **System Design & Architecture**
   - 4.1 Architecture Diagram
   - 4.2 Database Design (MongoDB Schema)
5. **System Modules Description**
   - 5.1 Authentication Module
   - 5.2 User Workspace Module (CRUD Operations)
   - 5.3 Administrative Control Module
6. **Technology Stack Details**
   - 6.1 Frontend (React JS, Vanilla CSS)
   - 6.2 Backend (Spring Boot, Spring Data MongoDB)
   - 6.3 Database (MongoDB Atlas)
7. **Implementation Details (Code Snapshots)**
8. **Testing & Results**
9. **Deployment & Web Hosting**
10. **Conclusion & Future Scope**
11. **References**

---

## **1. ABSTRACT**

Modern travel planning involves organizing luggage and travel essentials, a process highly susceptible to human error and omission. **PackMate** is a full-stack web application designed to solve this issue by offering a responsive, interactive, and automated packing checklist. Built using a modern **three-tier architecture**, the system utilizes a **React JS** frontend styled with a purple-black glassmorphism theme, a **Spring Boot (Java)** REST API backend, and a cloud-based **MongoDB Atlas** database.

The application segregates access into two distinct roles:
1. **Regular User**: Can register, log in, and perform real-time CRUD operations to add, modify, toggle (check off), and delete items from their travel list.
2. **Administrator**: Can access a separate administrative console to view system statistics, monitor user registries, and exercise administrative control by removing users (which triggers a cascading database wipe of all associated packing items).

---

## **2. INTRODUCTION**

### **2.1 Project Overview**
PackMate is an interactive travel companion web application that digitizes the traditional paper-based travel packing checklist. It provides user-friendly dashboard interfaces that recalculate packing statistics (total items, packed items, remaining items, and progress bars) on the fly. 

### **2.2 Problem Statement**
Forgetting essentials such as travel documents, medication, chargers, or specialized gear is a common issue for travelers. Existing checklist applications are often over-engineered, slow, non-responsive, or lack a clear administrative overview to purge dormant accounts. The problem is to develop a lightweight, secure, responsive, and visually appealing web application that connects client checklist tasks with a robust backend service and a flexible NoSQL database.

### **2.3 Objectives**
- To create a secure, role-based login system for Users and Admins.
- To implement client CRUD operations (Create, Read, Update, Delete) on travel list items.
- To establish an Admin console capable of account audit and removal.
- To design a highly aesthetic web UI utilizing CSS glassmorphism, HSL custom color palettes, and fluid animations.
- To implement database cascading delete logic so that removing a user automatically deletes their list items.

### **2.4 Project Scope**
The scope of PackMate encompasses personal travel management and admin-level registry moderation. It can be easily extended to support group packing, destination-based automated suggestions, and API integrations with weather services.

---

## **3. SYSTEM REQUIREMENTS SPECIFICATION (SRS)**

### **3.1 Hardware Requirements**
- **Processor:** Intel Core i3 or equivalent (minimum); Intel Core i5 or AMD Ryzen 5 (recommended).
- **RAM:** 8 GB RAM minimum.
- **Storage:** 10 GB of available hard disk space.
- **Display Resolution:** 1366x768 minimum (app adjusts dynamically to mobile sizes).

### **3.2 Software Requirements**
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Java Runtime Environment:** JDK 17 (LTS) or higher.
- **Build Tool:** Maven 3.8.x.
- **Node.js Environment:** Node.js v18+ (for compiling Vite/React).
- **Database Engine:** MongoDB Community Server (v6.x) or MongoDB Atlas Cloud Cluster.
- **Text Editor / IDE:** Visual Studio Code (VS Code) or IntelliJ IDEA.
- **Web Browser:** Google Chrome, Mozilla Firefox, or Microsoft Edge.

---

## **4. SYSTEM DESIGN & ARCHITECTURE**

### **4.1 Architecture Diagram**
The application adheres to the standard Model-View-Controller (MVC) architectural pattern:

```text
  +-------------------------------------------------------------+
  |                        PRESENTATION LAYER                   |
  |             React JS Web App (Vite) + Vanilla CSS           |
  +------------------------------+------------------------------+
                                 | HTTP Request / JSON Response
                                 v
  +-------------------------------------------------------------+
  |                          BUSINESS LAYER                     |
  |     Spring Boot Backend REST API Controllers & Services     |
  +------------------------------+------------------------------+
                                 | Spring Data Mongo Drivers
                                 v
  +-------------------------------------------------------------+
  |                          DATA STORAGE LAYER                 |
  |                    MongoDB Database Collections             |
  +-------------------------------------------------------------+
```

### **4.2 Database Design (MongoDB Schema)**
NoSQL document schemas allow high write-speeds and horizontal scaling. PackMate utilizes two collections:

#### **Collection 1: `users`**
```json
{
  "_id": "ObjectId",
  "username": "String (Unique)",
  "password": "String (Encrypted/Plain)",
  "email": "String (Unique)",
  "role": "String (CLIENT / ADMIN)"
}
```

#### **Collection 2: `packing_items`**
```json
{
  "_id": "ObjectId",
  "name": "String",
  "quantity": "Int",
  "packed": "Boolean",
  "userId": "String (References users._id)"
}
```

---

## **5. SYSTEM MODULES DESCRIPTION**

### **5.1 Authentication Module**
Allows users to securely register and sign in.
- **Registration:** Captures Username, Email, and Password. By default, all public registrations are assigned the `CLIENT` role.
- **Login:** Verifies credentials. Upon success, returns user details (excluding password) and routes them:
  - Admins are redirected to `/admin`.
  - Clients are redirected to `/dashboard`.

### **5.2 User Workspace Module (CRUD)**
The core client interface containing the packing list:
- **Create:** Adds an item (name, quantity, default packed = `false`).
- **Read:** Fetches all items mapped to the user's unique ID.
- **Update:** Toggles packed status (checkbox checked) or modifies name and quantity via modal forms.
- **Delete:** Removes an item from the list.

### **5.3 Administrative Control Module**
Provides specialized controls to the Admin:
- **User Catalog:** Lists all registered accounts (Admins and regular users).
- **User Purge:** Removes users. This triggers a service call that deletes the user record and calls the item repository to delete all item records containing the target user's ID.

---

## **6. TECHNOLOGY STACK DETAILS**

### **6.1 Frontend (React JS & Vanilla CSS)**
- **Vite:** Used for rapid compiling and hot-reloading.
- **React Router DOM:** Controls client routing without page reloads.
- **Lucide React:** Supplies responsive SVG vector icons.
- **Vanilla CSS:** Implements CSS custom properties (`:root`), flex/grid layouts, scrollbars, and keyframe animations.

### **6.2 Backend (Spring Boot & Spring Data MongoDB)**
- **Spring Web:** Provides RESTful controllers.
- **Spring Data MongoDB:** Handles CRUD mapping automatically from repositories.
- **Lombok:** Eliminates boilerplate getters, setters, and constructors.

### **6.3 Database (MongoDB Atlas)**
A fully-managed cloud database service. Offers high reliability, whitelisted IP firewalls, and document-level storage.

---

## **7. IMPLEMENTATION DETAILS (CORE CLASSES)**

### **7.1 Backend CORS and Initial Database Seed**
The class `PackingListApplication.java` configures the application and pre-seeds a default admin (`admin` / `admin123`) inside MongoDB:

```java
@SpringBootApplication
public class PackingListApplication {
    public static void main(String[] args) {
        SpringApplication.run(PackingListApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123");
                admin.setEmail("admin@packmate.com");
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }
        };
    }
}
```

### **7.2 Cascading Delete Logic (Service Layer)**
Inside `UserService.java`, the user removal triggers a cascading clean up of their packing items:

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemRepository itemRepository;

    public void removeUser(String userId) {
        userRepository.deleteById(userId);
        itemRepository.deleteByUserId(userId); // Cascades delete
    }
}
```

---

## **8. TESTING & RESULTS**

### **8.1 Unit Testing**
REST endpoints were tested locally using curl and REST Clients. 
1. **POST `/api/auth/register`**: Register standard user `test_user` -> Success (200 OK).
2. **POST `/api/auth/login`**: Login as `test_user` -> Returns user profile and role `CLIENT`.
3. **GET `/api/items/user/{id}`**: Fetch items -> Returns empty list `[]`.
4. **DELETE `/api/users/{id}`**: Triggered as Admin -> Deletes user and deletes all their list items.

### **8.2 Responsive Layout Verification**
The UI was tested on multiple simulated devices:
- **Mobile (iPhone SE/Pro):** Cards collapse into a single-column layout, and navigation shifts to stack.
- **Desktop (1080p):** Implements a responsive 3-column card grid.

---

## **9. DEPLOYMENT & WEB HOSTING**

The project was successfully deployed in a distributed cloud environment:
1. **Database:** Deployed on **MongoDB Atlas** M0 Cluster. IP Whitelisting (`0.0.0.0/0`) was configured to allow secure incoming connections.
2. **Backend Server:** Containerized using a multi-stage **Dockerfile** and deployed on **Render.com** (Web Service). Environment variables were configured to securely inject the MongoDB URI.
3. **Frontend Webpage:** Deployed on **Vercel** with the root directory directed to `/frontend`.

---

## **10. CONCLUSION & FUTURE SCOPE**

### **10.1 Conclusion**
The project **PackMate** was successfully implemented, verified, and deployed. The React frontend and Spring Boot backend communicate securely over CORS, storing and modifying data in a NoSQL MongoDB Atlas cloud. The admin dashboard operates with proper cascading logic, ensuring clean directory maintenance.

### **10.2 Future Scope**
- **BCrypt Encryption:** Implement Spring Security and password encoding.
- **Luggage Templates:** Pre-populate categories based on travel type (e.g. business, beach, trekking).
- **Group Packing:** Collaborate on shared packing lists in real time using WebSockets.

---

## **11. REFERENCES**

1. Spring Boot Documentation: https://docs.spring.io/spring-boot/docs
2. React JS Official Documentation: https://react.dev/reference/react
3. MongoDB NoSQL Database Design Guide: https://www.mongodb.com/docs
4. Vite Guide: https://vitejs.dev/guide
