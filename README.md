# 🛒 Advanced React E-Commerce Web App with Firestore

A modern, fully-featured e-commerce web application built with React, TypeScript, Redux, and Firebase/Firestore for backend data management and user authentication.

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.2-purple?logo=redux)
![React Query](https://img.shields.io/badge/React%20Query-5.90.5-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![Firebase](https://img.shields.io/badge/Firebase-11.1.0-orange?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.1.7-green?logo=vite)

## 🌟 Features

### 🔐 User Authentication & Management
- **Firebase Authentication**: Secure user sign-up and sign-in
- **User Registration**: Create new accounts with email/password
- **User Profile Management**: View and edit user information
- **Profile Deletion**: Delete account (removes both Firestore data and Firebase Auth user)
- **Session Management**: Persistent authentication across browser sessions

### 🏪 Core E-commerce Functionality
- **Product Catalog**: Browse products with category filtering
- **Shopping Cart**: Add, remove, and modify product quantities
- **Checkout Process**: Complete purchase flow with order creation
- **Order Persistence**: Orders saved to Firestore database
- **Order History**: View all previous orders with full details
- **Real-time Data**: Products and orders stored in Firebase Firestore

### 🛠️ Product Management (CRUD Operations)
- **Create Products**: Add new products to the catalog
- **Read Products**: Fetch and display products from Firestore
- **Update Products**: Edit existing product details
- **Delete Products**: Remove products with confirmation modal
- **Click-to-Edit**: Navigate to edit page by clicking product cards
- **Auto ID Generation**: Automatic product ID assignment
- **Category Management**: Organize products by categories
- **Form Validation**: Comprehensive input validation

### 🎨 User Interface
- **Modern UI Components**: Clean, professional interface with React Bootstrap
- **Interactive Carousel**: Hero section with promotional content
- **Product Cards**: Detailed product information with ratings and images
- **User Dropdown**: Quick access to profile, orders, and logout
- **Confirmation Modals**: User-friendly dialogs for critical actions

### ⚡ Advanced Features
- **State Management**: Redux Toolkit for cart state management
- **Data Fetching**: React Query (TanStack Query) for server state
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable logic (useProducts, useAuth, useOrder)
- **Error Handling**: Comprehensive error management and user feedback
- **Optimistic Updates**: Cache invalidation for instant UI updates
- **Route Parameters**: Dynamic routing for product editing
- **Form Auto-population**: Edit forms pre-filled with existing data

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Cart.tsx
│   ├── CartItem.tsx
│   ├── HomePage.tsx
│   ├── NavBar.tsx
│   ├── Product.tsx
│   ├── ProductList.tsx
│   ├── CreateOrEditProduct.tsx
│   ├── OrderHistory.tsx
│   ├── UserProfile.tsx
│   ├── SignIn.tsx
│   ├── Register.tsx
│   ├── CheckoutSuccessModal.tsx
│   └── ConfirmationModal.tsx
├── hooks/
│   ├── useProducts.ts
│   ├── useAuth.ts
│   └── useOrder.ts
├── redux/
│   ├── store.ts
│   ├── cartSlice.ts
│   └── hooks.ts
├── services/
│   ├── productService.ts
│   ├── authServices.ts
│   ├── orderService.ts
│   └── settingService.ts
├── lib/
│   └── firebaseConfig.ts
├── types/
│   └── types.ts
└── styles/
    ├── cart.css
    ├── home-page.css
    ├── navbar.css
    ├── product.css
    ├── create-product.css
    └── order-history.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm package manager
- Firebase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhanushkaChandimal/Advanced-React-E-Commerce-Web-App-With-Firestore.git
   cd advanced-ecommerce-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📋 Key Components & Features

### 🔐 Authentication Flow
- **Sign In**: Email/password authentication with Firebase
- **Register**: New user account creation with profile setup
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Persistence**: Stay logged in across browser sessions

### 🏠 HomePage
- Hero carousel with promotional content
- Featured products showcase
- Navigation to product catalog

### 🛍️ Product Catalog
- **ProductList**: Category-based filtering and grid layout
- **Product Cards**: Click to view details or edit
- **Live Data**: Products fetched from Firestore in real-time
- **Search & Filter**: Browse by category

### ✏️ Product Management
- **Create Product**: Add new products with full details
- **Edit Product**: Click any product card to edit
- **Delete Product**: Remove products with confirmation
- **Form Validation**: Comprehensive input validation
- **Dual-mode Form**: Single component for create/edit operations

### 🛒 Cart Management
- **Redux State**: Global cart state management
- **Quantity Controls**: Increment/decrement with immediate updates
- **Remove Items**: Delete products from cart
- **Clear Cart**: Remove all items with confirmation
- **Persistent Cart**: Redux state persists across sessions
- **Price Calculations**: Subtotal, tax (10%), and final total

### 💳 Checkout & Orders
- **Order Creation**: Generate unique order IDs
- **Firestore Persistence**: Save orders to database
- **Order History**: View all past orders with full details
- **Order Details**: Date, items, quantities, prices, and totals
- **Success Modal**: Confirmation with order number
- **Cart Reset**: Automatic cart clearing after purchase

### 👤 User Profile
- **View Profile**: Display user information
- **Edit Profile**: Update first name and last name
- **Delete Account**: Remove both Firestore profile and Firebase Auth user
- **Profile Dropdown**: Quick access from navigation bar

## 👨‍💻 Author

**Dhanushka Chandimal**
- GitHub: [@DhanushkaChandimal](https://github.com/DhanushkaChandimal)
