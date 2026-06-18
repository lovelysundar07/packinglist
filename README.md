# Packing List (PackMate) Full-Stack Project Guide

This document is your complete step-by-step guide to run, customize, connect, and deploy the **Packing List** application.

---

## 📂 Codebase Directory Structure

Here is how the project files are laid out. Review this structure to understand where each file resides:

```text
packing-list/
├── backend/                                 # Spring Boot (Java 17, Maven)
│   ├── src/main/java/com/packinglist/
│   │   ├── controller/                      # REST Controllers
│   │   │   ├── AuthController.java          # Login and registration endpoints
│   │   │   ├── ItemController.java          # Packing items CRUD
│   │   │   └── UserController.java          # Admin user control (remove users)
│   │   ├── model/                           # MongoDB Entities (Documents)
│   │   │   ├── User.java                    # User structure (CLIENT / ADMIN)
│   │   │   └── PackingItem.java             # Checklist items structure
│   │   ├── repository/                      # Spring Data Repositories
│   │   │   ├── UserRepository.java          # Mongo DB query methods for User
│   │   │   └── ItemRepository.java          # Mongo DB query methods for Items
│   │   ├── service/                         # Service Layer (Business Logic)
│   │   │   ├── UserService.java             # User login, sign-up, cascading delete
│   │   │   └── ItemService.java             # Item CRUD operations
│   │   └── PackingListApplication.java      # Application bootstrap & CORS configuration
│   ├── src/main/resources/
│   │   └── application.properties           # MongoDB connection settings & server port
│   └── pom.xml                              # Maven dependencies configurations
│
└── frontend/                                # React JS (Vite, HSL CSS Theme)
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx                   # Profile header and logout component
    │   ├── pages/
    │   │   ├── Login.jsx                    # Sign-in portal (Client / Admin)
    │   │   ├── Register.jsx                 # Registration portal (Role choice)
    │   │   ├── ClientDashboard.jsx          # Client workspace (List checking & CRUD)
    │   │   └── AdminDashboard.jsx           # Admin workspace (Directory & user removal)
    │   ├── styles/
    │   │   └── index.css                    # Glassmorphism, CSS vars, responsive animations
    │   ├── App.jsx                          # Main routing, state, and toast notification context
    │   └── main.jsx                         # React mounting script
    ├── package.json                         # Dependencies (React, Router, Lucide icons)
    ├── vite.config.js                       # Vite dev settings (Runs on port 5173)
    └── index.html                           # Entry web page & Google Fonts integration
```

---

## 🛠️ VS Code Setup & Configurations

To start pair programming and editing with ease, open VS Code and configure these items:

### 1. Recommended Extensions
Open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`) and install:
- **For Backend Development**:
  - `Extension Pack for Java` (Microsoft) – Installs language server, debugger, and Maven support.
  - `Spring Boot Extension Pack` (VMware) – Facilitates code autocompletion and execution profiles for Spring.
  - `Lombok Device Support` (Gabriel) – Integrates Lombok getter/setter helpers into VS Code compilation.
- **For Frontend Development**:
  - `ES7+ React/Redux/React-Native Snippets` – Provides code triggers to create React components instantly.
- **For Database Management**:
  - `MongoDB for VS Code` – Connect, query, and edit records inside your editor.

### 2. Opening the Code
1. Open VS Code.
2. Select **File > Open Folder**.
3. Open the main parent folder `packing-list`.
4. We recommend splitting your terminal in VS Code:
   - One split terminal for the backend directory (`cd backend`).
   - One split terminal for the frontend directory (`cd frontend`).

---

## 💾 MongoDB Database Setup

The backend depends on MongoDB to store users and items. You have two options:

### Option A: Local MongoDB Community Server (Recommended for development)
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community) for Windows.
2. Follow the installer steps (select **Install MongoDB as a Service**).
3. Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass) (a GUI database explorer).
4. Launch Compass and connect to `mongodb://localhost:27017`.
5. The database `packinglist` and collections (`users`, `packing_items`) will be automatically created by Spring Boot when you run it!

### Option B: Cloud MongoDB Atlas (Recommended for production/deployment)
1. Sign up on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (e.g. M0 tier).
3. **Important**: Go to **Network Access** and add IP `0.0.0.0/0` (allows incoming requests from anywhere, which is helpful during initial deployment/testing).
4. Go to **Database Access** and create a user (e.g., username `admin` and password `mysecurepassword`).
5. Click **Connect > Drivers**, select Java or connection string, copy the connection URI which looks like:
   `mongodb+srv://admin:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
6. Open `backend/src/main/resources/application.properties` and replace:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://admin:mysecurepassword@cluster0.xxxx.mongodb.net/packinglist?retryWrites=true&w=majority
   ```

---

## 🚀 Running the Application Locally

### Step 1: Run the Backend (Spring Boot)
1. Open a terminal in VS Code and go to the backend folder:
   ```bash
   cd backend
   ```
2. Verify you have Java 17 installed:
   ```bash
   java -version
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(On Windows, if `./mvnw` is blocked by scripts execution policy, use `mvn spring-boot:run` or double-click `mvnw.cmd`)*.
4. The backend is running once you see `Started PackingListApplication in X.XXX seconds (process running...)` and will listen on **`http://localhost:8080`**.

### Step 2: Run the Frontend (React JS)
1. Open another terminal in VS Code and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite hot-reloading development server:
   ```bash
   npm run dev
   ```
4. Click on the URL output in terminal (typically **`http://localhost:5173`**) to launch the web client in your browser.

---

## 📈 Testing & Demo Scenario

To test all application flows, perform the following:
1. Open the app in your browser (`http://localhost:5173`).
2. Click **Create Account** and register a new user (e.g. `jane_doe`).
3. You will be redirected to the sign-in page. Enter `jane_doe`'s credentials and sign in.
4. You are taken to your personal **Dashboard**:
   - Add new items (e.g., "Passport", Qty 1; "Socks", Qty 6).
   - Click the check box to mark items as packed, and watch the progress bar update.
   - Click the edit icon to modify name/quantities.
   - Click the trash icon to delete an item.
5. Click the **Logout** icon in the navbar.
6. Sign in using the pre-seeded default administrative account:
   - **Username**: `admin`
   - **Password**: `admin123`
7. You are taken to the **Admin Console**:
   - You will see card count stats for total users, administrators, and regular users.
   - You can search the user list.
   - Click the trash bin icon next to `jane_doe` and confirm.
   - Now, log out and try to login as `jane_doe` again. It will fail, and checking the backend console or database will verify that `jane_doe` and all her packing items were removed in a cascading manner!

---

## 🌐 Cloud Deployment Guide

When you are ready to publish your application online, configure your project with these services:

### 1. Database Deployment (MongoDB Atlas)
- Make sure to use the **MongoDB Atlas** connection string as explained in Option B of the MongoDB database section.

### 2. Frontend Hosting (React JS)
We recommend hosting the React app on **Vercel** or **Netlify** (both have free tiers).
1. Push your code repository to GitHub.
2. Sign in to Vercel/Netlify.
3. Import your project repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Use default build command: `npm run build` and output folder: `dist`.
7. Once deployed, take note of the public URL (e.g., `https://packing-list.vercel.app`).
8. **Important Update**: Go back to `backend/src/main/java/com/packinglist/PackingListApplication.java` and add your Vercel URL to the allowed CORS origins list, then redeploy the backend:
   ```java
   registry.addMapping("/**")
           .allowedOrigins("http://localhost:5173", "https://packing-list.vercel.app")
   ```

### 3. Backend Hosting (Spring Boot)
We recommend hosting the Spring Boot jar on **Railway.app** or **Render.com**.
- **On Render.com (Web Service)**:
  1. Create a `Dockerfile` in the root of the `backend/` folder (or use Render's native Java runtime).
  2. For a simple setup, link your GitHub repository, choose **Web Service**, set the root directory to `backend`.
  3. Choose build command: `./mvnw clean package -DskipTests` (or `mvn clean package`).
  4. Set start command: `java -jar target/backend-0.0.1-SNAPSHOT.jar` (or select the built jar filename).
  5. Under environment variables, you can set `SPRING_DATA_MONGODB_URI` to override your Atlas connection string securely.
  
- **On Railway.app**:
  1. Railway automatically detects Spring Boot projects in GitHub.
  2. Create a project, link GitHub, set `backend` as root directory.
  3. Deploy! Railway handles Maven builds and starts the application automatically.
  4. Note the backend API URL provided (e.g. `https://backend-production.up.railway.app`).
  5. Update the API endpoints in your React code (e.g., inside `Login.jsx`, `Register.jsx`, `ClientDashboard.jsx`, and `AdminDashboard.jsx`) to point to your live backend domain instead of `http://localhost:8080`.
