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

## 🤔 Assumptions & Tradeoffs
1. **Soft Defaults over Hard Deletions**: Deleting a record via the `DELETE /records/:id` API intentionally updates an `isDeleted: true` flag rather than erasing the schema `record.deleteOne()`. This scales better for enterprise finance ledgers avoiding irreversible data loss. Our aggregations inherently ignore ghost entries using `$match: { isDeleted: false }`.
2. **Registration Open-Door Default**: Open `POST /api/auth/register` natively registers all users as `Viewer` status. Only standard Admins can elevate a profile's rights organically avoiding open security vectors. 
3. **Regex Queries vs Full-Text Indexing**: Filtering `?search=` maps to basic MongoDB `$regex` match expressions scanning the `description` and `category`. While simple and fully operational on this scale without requiring DB index alterations, a full-text Search Index would scale faster over millions of documents.
4. **Pagination Memory Traces**: Applied native limits parsing skip nodes in memory avoiding array choking during high throughput.

---
*Built intricately mapping rigorous backend system integration goals.*
