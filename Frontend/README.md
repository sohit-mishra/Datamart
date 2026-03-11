# DataMart Dashboard – Frontend

A modern **React + TypeScript dashboard** for managing products in the **DataMart system**.  
Built with **Vite, Axios, Context API, and modular feature architecture** for scalability and maintainability.

---

# 🚀 Tech Stack

- React 18
- TypeScript
- Vite
- Axios
- Context API
- React Router
- GSAP
- Modular Feature Architecture

---

# 📁 Project Structure

```
Frontend
│
├── public
│   └── vite.svg
│
├── src
│   ├── api
│   │   ├── axios.ts
│   │   ├── productApi.ts
│   │   ├── uploadApi.ts
│   │   └── userApi.ts
│   │
│   ├── assets
│   │   └── react.svg
│   │
│   ├── components
│   │   ├── common
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SearchBar.tsx
│   │   │
│   │   ├── layout
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── table.tsx
│   │   │
│   │   └── PrivateRoute.tsx
│   │
│   ├── config
│   │   └── env.ts
│   │
│   ├── context
│   │   ├── auth-context.ts
│   │   ├── AuthProvider.tsx
│   │   └── useAuth.ts
│   │
│   ├── features
│   │   └── products
│   │       ├── components
│   │       │   ├── ProductCard.tsx
│   │       │   ├── ProductTable.tsx
│   │       │   └── RichTextEditor.tsx
│   │       │
│   │       ├── hooks
│   │       │   └── useProducts.ts
│   │       │
│   │       └── services
│   │           └── productService.ts
│   │
│   ├── hooks
│   │   └── useDebounce.ts
│   │
│   ├── lib
│   │   └── utils.ts
│   │
│   ├── pages
│   │   ├── CreateProduct.tsx
│   │   ├── Home.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PageNotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   ├── Profile.tsx
│   │   ├── SignupPage.tsx
│   │   └── UpdateProduct.tsx
│   │
│   ├── styles
│   │   └── globals.css
│   │
│   ├── types
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── common.types.ts
│   │   ├── product.types.ts
│   │   ├── upload.types.ts
│   │   └── user.types.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
VITE_API_URL=http://localhost:5000/api/v1/
VITE_APP_NAME=DataMart Dashboard
```

---

# 🔐 User Roles

The application supports **two owner roles**.

### Owner
- Create products
- Update products
- Delete products
- Manage their own products

### Admin Owner
- Full dashboard access
- Manage all products
- Manage users

---

# ✨ Features

## Authentication
- Login
- Signup
- JWT authentication
- Protected routes

## Product Management
- Create product
- Update product
- Delete product
- Product details page

## Product Listing
- Table view
- Card view
- Pagination
- Search
- Filters

## Dashboard UI
- Responsive dashboard
- Navbar navigation
- Sidebar navigation

## Rich Text Editor
- Product description editor

## API Integration
- Axios instance
- Centralized API services
- Error handling

---

# 📦 Installation

Clone the repository

```
git clone https://github.com/your-repo/datamart-dashboard.git
```

Go to project folder

```
cd Frontend
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

---

# 🖥️ Build for Production

```
npm run build
```

Preview production build

```
npm run preview
```

---

# 📡 API Base URL

All API requests use the base URL defined in `.env`.

```
VITE_API_URL=http://localhost:5000/api/v1/
```

Example full base URL:

```
http://localhost:5000/api/v1/
```

---

# 🔑 Authentication API

Base URL

```
/api/v1/auth
```

Endpoints

```
POST /auth/login
POST /auth/signup
POST /auth/me
PUT  /auth/update
```

Example

```
POST /api/v1/auth/login
POST /api/v1/auth/signup
POST /api/v1/auth/me
PUT  /api/v1/auth/update
```

Authentication uses **JWT tokens stored in localStorage**.

Authorization header format:

```
Authorization: Bearer <token>
```

---

# 🖼 Upload API

Base URL

```
/api/v1/upload
```

Endpoints

```
POST /upload/me
```

This endpoint is used for **profile image upload** using `multipart/form-data`.

Example request:

```
POST /api/v1/upload/me
Content-Type: multipart/form-data
```

---

# 📦 Product API

Base URL

```
/api/v1/products
```

Endpoints

```
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

Example

```
GET    /api/v1/products
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
```

---

# 🔐 Authentication Flow

1. User logs in

```
POST /auth/login
```

2. Backend returns a **JWT token**

3. Token is stored in:

```
localStorage
```

4. All protected routes send token in header

```
Authorization: Bearer <token>
```

---

# 🧩 Architecture

The project follows a **Feature-Based Architecture**.

Benefits:

- Scalable structure
- Easy maintenance
- Clear separation of concerns
- Reusable components
- Modular product features

Example structure:

```
src/
 ├── api
 ├── components
 ├── context
 ├── features
 │    └── products
 ├── hooks
 ├── pages
 ├── types
```

---

# 📄 License

This project is created for **assignment purposes**.

---

# 👨‍💻 Author

**Sohit**

Frontend Developer  
React • TypeScript • Node.js