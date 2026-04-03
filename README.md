# Zorvyn Finance Dashboard - Backend

A robust, logically structured REST backend built for a finance dashboard ecosystem. It supports role-based access control (RBAC), multi-layered user verification, custom dashboard aggregations, rate-limiting, and deep data manipulation workflows.

## 🚀 Live Demo
- **Production API URL**: [https://finanace-zorvyn-backend.onrender.com](https://finanace-zorvyn-backend.onrender.com)
- **Swagger Documentation UI**: [https://finanace-zorvyn-backend.onrender.com/api-docs](https://finanace-zorvyn-backend.onrender.com/api-docs)

> Testing local development? Head to `http://localhost:5005/api-docs` after running the setup process.

---

## ✨ Features Implemented
- **Mongoose / MongoDB Integration**: Real-time scalable document database.
- **Role-Based Access Control (RBAC)**: Secure Express middleware strictly dividing API bounds for `Viewers` (Read-only data endpoints), `Analysts` (Extensive Data Read Access), and `Admins` (Full CRUD execution parameters).
- **JWT Authentication**: Full token persistence securing user logins natively.
- **Aggregation Dashboard APIs**: Mongoose pipelines natively crunching totals, calculating net balances, indexing category breakdowns, and graphing time-series monthly trends.
- **Soft Deletes**: Active protection avoiding permanent data erasure using boolean `.isDeleted` flags natively.
- **Anti-Spam Security**: Intercepts brute-forcing attempts natively leveraging global `express-rate-limit`.
- **Intelligent Queries**: Implemented Pagination (`?page=1&limit=5`) and RegExp based deep-searching (`?search=query`) on Record outputs.

---

## 🛠 Tech Stack
- **JavaScript (Node.js)**
- **Express.js** 
- **MongoDB** / **Mongoose**
- **JWT** (`jsonwebtoken`) & `bcrypt` for secure auth
- **Swagger** (`swagger-ui-express` & `yamljs`) for native documentation styling

---

## 💻 Setup Process

### 1. Prerequisites 
- Ensure you have Node.js and npm installed.
- Ensure you have access to a MongoDB instance (Local or Atlas).

### 2. Installation
Clone the repository, enter the backend directory, and install dependencies.
```bash
git clone https://github.com/PratikChavan05/Finanace-Zorvyn-Backend.git
cd Finanace-Zorvyn-Backend
npm install
```

### 3. Environment Variables
Create a `.env` file at the root. Include these parameters:
```env
NODE_ENV=development
PORT=5005
MONGO_URL=<YOUR_MONGODB_URI>
JWT_SEC=<YOUR_JWT_SECRET>
```

### 4. Running the App
To deploy the development environment natively utilizing `nodemon`:
```bash
npm run dev
```
To deploy standard Production logic:
```bash
npm start
```

---

## 📊 API Schema Definitions
You can visualize and interactively test the complete REST framework bypassing Postman using the provided **Swagger Configuration** mounted internally at `/api-docs`.

### Core Highlights
* **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
* **Users** *(Admin)*: `GET /api/users`, `PUT /api/users/:id/role`, `PUT /api/users/:id/status`
* **Records** *(Admin/Analyst)*: `GET /api/records` (supports pagination & search), `POST /api/records`, `PUT /api/records/:id`, `DELETE /api/records/:id`
* **Insights**: `/api/dashboard/summary`, `/api/dashboard/category-totals`, `/api/dashboard/trends`

---

## 🤔 About Project
1. Choice of Framework & Architecture I utilized Node.js with Express.js for the backend. Express was chosen for its minimal footprint and immense flexibility, allowing me to build a highly structured, layered architecture (separating Routes, Controllers, Models, and Middlewares). This separation of concerns ensures that business logic is strictly decoupled from routing, establishing a clean, maintainable, and easily testable codebase.

2. Database Selection (MongoDB & Mongoose) I selected MongoDB as the database, utilizing Mongoose for Object Data Modeling (ODM). Financial records and dashboard metrics often require rapid iteration on schemas. MongoDB provided the flexibility needed, while Mongoose enforced strict data validations at the application layer. Instead of writing complex SQL joins for the dashboard insights, I leveraged MongoDB’s native Aggregation Pipelines ($group, $match, $project). This allowed the backend to compute category breakdowns and monthly multi-node trends directly at the database level, drastically reducing the memory overhead on the Node server.

3. Authentication & Access Control Approach I opted for stateless JSON Web Tokens (JWT) combined with bcrypt for password hashing. By embedding the user’s id and role within the JWT payload, the authentication middleware can instantly verify and authorize requests without needing to repeatedly hit the database to check session states.

I implemented a strict Role-Based Access Control (RBAC) system using a custom middleware guard (authorize('Viewer', 'Analyst', 'Admin')).

A Trade-off considered here was registration friction vs. security: I intentionally designed the POST /register route to default all new signups to the lowest permissions tier (Viewer). This creates initial friction, as an Admin must manually elevate their status to Analyst, but it secures the application against automated bot-takeovers or unauthorized data mutations.
4. Data Integrity: Soft Deletions over Hard Deletions A major architectural decision was implementing "Soft Deletes." When an Admin triggers a DELETE request, the record's isDeleted boolean is toggled to true, rather than invoking record.deleteOne().

Trade-off: This permanently increases the overall database storage size over time, but in a financial application context, the auditability, ledger preservation, and ability to recover accidentally deleted transaction records far outweigh the storage costs. All reading APIs and Dashboard Aggregations immediately filter out these ghost records using { $match: { isDeleted: false } }.
5. Querying & Search Capabilities I implemented dynamic offset pagination (page, limit) natively within Mongoose combining .skip() and .limit(). For record hunting, I implemented RegEx $or statements targeting descriptions and categories based on search queries.

Trade-off: Currently, standard RegEx querying is used instead of instantiating dedicated MongoDB Full-Text Search Indexes. While RegEx is simple, elegant, and highly performant at our current scale, a tradeoff was made against ultra-high throughput; if the finance ledger scales to tens of millions of records, migrating to a dedicated Text Index would be required to maintain sub-millisecond search latencies.
6. API Security & Documentation To ensure reliability, I wrapped the server in an express-rate-limit guard limiting IP connections to prevent spam or brute-forcing. Finally, all endpoints, parameters, and authentication requirements were formally mapped using an OpenAPI 3.0 swagger.yaml structure, generating a live UI utilizing swagger-ui-express to bridge the communication gap between the backend and future frontend clients seamlessly.


---
*Built intricately mapping rigorous backend system integration goals.*
