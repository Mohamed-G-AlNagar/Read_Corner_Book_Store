# Read Corner Library - React.js Frontend

## Project Overview

This is the frontend application for the Read Corner Library, built with React.js. It provides a user-friendly interface for browsing books, managing a shopping cart, placing orders, and interacting with user accounts.

## Technologies Used

- React 18.3.1
- TypeScript 5.6.2
- React Router 6.26.1
- React Query 5.52.2
- React Context API
- React Hooks & Custom Hooks
- Axios 1.7.5
- React Hook Form 7.53.0
- React Hot Toast 2.4.1
- JWT Decode 4.0.0
- FontAwesome 6.6.0
- Bootstrap
- Vite 5.3.4

## Features

1. **User Authentication**
   - User login and signup with field validations.
   - Email verification
   - Protected routes for authenticated users

2. **Book Browsing**
   - Homepage with featured books
   - Detailed book view with feedbacks
   - Book filtering by category, price, and title
   - `Quick search with auto-suggestions`

2. **Book Feedback**
   - Add Feedback with rating.
   - `Auto update the book total rate each time feedback added.`
   - delete your own feedback
   - view all feedbacks

3. **Shopping Cart**
   - Add/remove items
   - Increase/decrease item quantity

4. **Order Management**
   - `Place orders using Stripe payment`
   - View order history and status (for users)
   - Manage order status (for admins)

5. **User Panel**
   - View and update user profile
   - View order history

6. **Admin Panel**
   - All user panel features
   - Manage books (add, delete, filter)
   - Manage orders (update status)
   - User management

7. **Responsive Design**
   - Mobile-friendly interface


## Setup and Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server

## Available Scripts

- `npm start`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview the production build locally

## Routing

The application uses React Router for navigation. Main routes include:

- `/`: Homepage
- `/login`: Login page
- `/signup`: Signup page
- `/verifyEmail/:token`: Email verification
- `/cart`: Shopping cart (protected)
- `/controlPanel`: Book management for admins (protected) `conditional render based on user role ADMIN or USER for def functionality`
- `/book/:id`: Individual book details
- `/booksFilter`: Book filtering page
- `/order/success`: Successful payment page (protected)
- `/order/cancel`: Cancelled payment page (protected)
- `/*` : Not Found page for undefined routes (NotFound component).

## State Management

- React Query is used for server state management and caching
- Context-Api used for token, user management.
- Local state is managed using React hooks.

## API Integration

Axios is used for making HTTP requests to the backend API. The base URL should be configured in the var file.

## Styling

The project uses a combination of custom CSS and Bootstrap for styling.

## Important Notes
 - Admin user : mag3789@gmail.com
 - pass : m.A123456789

 ### frontend PORt shall be `5173` for redirect from the payment and email verify.

