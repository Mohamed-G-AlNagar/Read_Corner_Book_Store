# Read Corner Book Store

## Project Overview

Read Corner Library is a full-stack digital library system that allows users to browse and purchase books online. The project consists of a Spring Boot backend providing robust APIs for managing books, user accounts, shopping carts, orders, and feedback, paired with a React.js frontend delivering a user-friendly interface for interacting with these features.

## Repository Structure

```
read-corner-library/
├── backend/
│   └── [Spring Boot project files]
├── frontend/
│   └── [React.js project files]
└── README.md
```

## Technologies Used

### Backend
- Java 21
- Spring Boot 3.3.3
- JPA (Hibernate)
- Spring Security
- MySQL
- Lombok
- JWT
- Spring Mail
- Thymeleaf
- Stripe
- Cloudinary
- Swagger

### Frontend
- React 18.3.1
- TypeScript 5.6.2
- React Router 6.26.1
- React Query 5.52.2
- React Context API
- Axios 1.7.5
- React Hook Form 7.53.0
- React Hot Toast 2.4.1
- JWT Decode 4.0.0
- FontAwesome 6.6.0
- Bootstrap
- Vite 5.3.4

## Features

### Backend Features
1. **Authentication**
   - User registration with email verification
   - JWT-based login and authentication
   - Account activation
2. **Book Management**
   - CRUD operations for books
   - Search and filter by category, author, and title
   - Image upload for book covers
3. **Shopping Cart**
   - Add, remove, update items in the cart
4. **Order Management**
   - Create orders from cart with Stripe integration
   - Order status management
5. **User Management**
   - CRUD operations for users
   - User profile management
6. **Feedback System**
   - Add, update, delete feedback for books

### Frontend Features
1. **User Authentication**
   - Login, signup, email verification
   - Protected routes for authenticated users
2. **Book Browsing**
   - Featured books on homepage
   - Book search and filtering
   - View book details and feedback
3. **Shopping Cart and Orders**
   - Add/remove items, update quantities
   - Place orders using Stripe
   - Order history and status tracking
4. **User and Admin Panels**
   - Profile management
   - Admin: Manage books, orders, and users
5. **Responsive Design**
   - Mobile-friendly UI

## API Documentation

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Postman: [API Documentation](https://documenter.getpostman.com/view/32077555/2sAXqy4fDi)

## Setup and Installation

### Backend Setup
1. Navigate to the `backend` directory
2. Update `application.yml` with required configurations (MySQL, JWT, email, Cloudinary, and Stripe credentials)
3. Set up environment variables for sensitive information
4. Run `mvn clean install`
5. Start the application with `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the `frontend` directory
2. Run `npm install`
3. Run `npm start` to start the development server

## Available Scripts (Frontend)

- `npm start`: Start the development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## Routing Overview

- `/`: Homepage
- `/login`, `/signup`: Authentication
- `/verifyEmail/:token`: Email verification
- `/cart`: Shopping cart (protected)
- `/controlPanel`: Admin panel (protected, role-based)
- `/book/:id`: Book details
- `/booksFilter`: Book filtering
- `/order/success`, `/order/cancel`: Payment status (protected)
- `/*`: Not Found page

## Security

- JWT Authentication for secure access to protected routes and endpoints
- Role-based Access Control: Admin functionality restricted to authorized users

## Payment Integration

Orders are initially marked as 'PENDING' upon creation, and their status is updated to 'PAID' or 'CANCELLED' based on Stripe payment success or failure.

## Image Management

Cloudinary is used for storing book cover images, allowing for scalable image storage.

## Important Notes

- Initial data will be added to the local database automatically on first run of the backend.
- Admin user credentials:
  - Email: mag3789@gmail.com
  - Password: m.A123456789
- Frontend port should be set to `5173` for proper redirection from payment and email verification processes.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd read-corner-library
   ```

2. Set up the backend:
   ```
   cd backend
   # Update application.yml
   mvn clean install
   mvn spring-boot:run
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   npm start
   ```

4. Access the application:
   - Backend API: `http://localhost:8080`
   - Frontend: `http://localhost:5173`

## Database ERD and Swagger Screenshots

### Database ERD
![DB ERD](https://github.com/user-attachments/assets/9b2270fe-7247-452b-b653-7c1ad3423236)

### Swagger UI
![swagger0](https://github.com/user-attachments/assets/0d00b1d4-4ea0-4c73-b75a-b0abdeb25f8f)
