# 🚀 Supply Setu - Supply Chain Management Platform

A comprehensive B2B supply chain management platform that connects suppliers and vendors, enabling efficient surplus exchange, product management, and delivery tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [User Roles & Permissions](#user-roles--permissions)
- [Key Features Breakdown](#key-features-breakdown)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Supply Setu is a modern web application designed to streamline supply chain operations between suppliers and vendors. The platform facilitates surplus material exchange, product cataloging, real-time delivery tracking, and comprehensive transaction management.

### Core Objectives
- **Connect Suppliers & Vendors**: Seamless marketplace for B2B transactions
- **Reduce Waste**: Efficient surplus material exchange system
- **Optimize Logistics**: Real-time delivery tracking and management
- **Streamline Operations**: Comprehensive dashboard for all stakeholders

## ✨ Features

### 🔐 Authentication & User Management
- **Multi-role Authentication**: Supplier and Vendor role-based access
- **Secure Login/Register**: JWT-based authentication with bcrypt password hashing
- **Profile Management**: Comprehensive user profiles with business information
- **Role-based Navigation**: Dynamic navigation based on user permissions

### 🏪 Supplier Features
- **Product Catalog Management**: Create, edit, and manage product listings
- **Inventory Tracking**: Real-time stock quantity monitoring
- **Order Management**: Track and manage incoming orders
- **Delivery Creation**: Create and manage delivery schedules
- **Analytics Dashboard**: Sales performance and order analytics

### 🛒 Vendor Features
- **Surplus Exchange**: Post and browse surplus materials
- **Supplier Marketplace**: Browse and order from supplier catalogs
- **Transaction History**: Complete transaction tracking
- **Analytics**: Business performance insights
- **Real-time Notifications**: Order status and surplus booking alerts

### 📦 Delivery & Logistics
- **Real-time Tracking**: Live delivery status updates
- **Delivery Logs**: Comprehensive delivery history
- **Status Management**: Update delivery statuses
- **Route Optimization**: Efficient delivery planning

### 💳 Payment Integration
- **Razorpay Integration**: Secure payment processing
- **Transaction Management**: Complete payment history
- **Booking System**: Reserve surplus materials and products

### 🔔 Notification System
- **Real-time Alerts**: Order status, surplus bookings, delivery updates
- **Email Notifications**: Automated email alerts
- **Push Notifications**: In-app notification system

### 📊 Analytics & Reporting
- **Dashboard Analytics**: Performance metrics and insights
- **Transaction Reports**: Detailed transaction history
- **Business Intelligence**: Data-driven insights for decision making

## 🛠 Technology Stack

### Frontend
- **React 19.1.0**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Redux Toolkit**: State management
- **GSAP**: Advanced animations and transitions
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Nodemailer**: Email service
- **Razorpay**: Payment gateway integration
- **Node-cron**: Scheduled tasks

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
hackathon/
├── backend/                    # Backend API server
│   ├── config/                # Configuration files
│   │   ├── db.js             # Database configuration
│   │   └── razorpay.js       # Payment gateway config
│   ├── controllers/           # Route controllers
│   │   ├── authController.js  # Authentication logic
│   │   ├── productController.js # Product management
│   │   ├── vendorController.js # Vendor operations
│   │   ├── supplierController.js # Supplier operations
│   │   ├── deliveryController.js # Delivery management
│   │   ├── surplusController.js # Surplus exchange
│   │   ├── transactionController.js # Transaction handling
│   │   ├── paymentController.js # Payment processing
│   │   ├── bookingController.js # Booking system
│   │   ├── dashboardController.js # Analytics
│   │   ├── profileController.js # User profiles
│   │   └── deliveryLogController.js # Delivery logs
│   ├── middleware/            # Custom middleware
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/               # Database models
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   ├── SurplusPost.js   # Surplus post schema
│   │   ├── Transaction.js   # Transaction schema
│   │   ├── Delivery.js      # Delivery schema
│   │   ├── Booking.js       # Booking schema
│   │   └── ...              # Other models
│   ├── routes/              # API routes
│   │   ├── authRoutes.js    # Authentication routes
│   │   ├── productRoutes.js # Product routes
│   │   ├── vendorRoutes.js  # Vendor routes
│   │   ├── supplierRoutes.js # Supplier routes
│   │   ├── deliveryRoutes.js # Delivery routes
│   │   ├── surplusRoutes.js # Surplus routes
│   │   ├── transactionRoutes.js # Transaction routes
│   │   ├── paymentRoutes.js # Payment routes
│   │   └── ...              # Other route files
│   ├── utils/               # Utility functions
│   │   ├── emailService.js  # Email functionality
│   │   ├── expiryScheduler.js # Expiry notifications
│   │   └── dailyBroadcast.js # Daily notifications
│   ├── scheduler/           # Scheduled tasks
│   │   └── expiryReminder.js # Expiry reminders
│   └── index.js             # Main server file
├── frontend/                # React frontend application
│   ├── public/             # Static assets
│   │   ├── logo.png        # Application logo
│   │   ├── poster.png      # Marketing materials
│   │   └── ...             # Other assets
│   ├── src/                # Source code
│   │   ├── Components/     # Reusable components
│   │   │   ├── Navbar.jsx  # Navigation component
│   │   │   ├── Footer.jsx  # Footer component
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   └── NotificationSystem.jsx # Notifications
│   │   ├── context/        # React context
│   │   │   ├── AuthContext.jsx # Authentication context
│   │   │   └── useAuth.js  # Auth hook
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx    # Landing page
│   │   │   ├── AuthPage.jsx # Authentication page
│   │   │   ├── Dashboard.jsx # Main dashboard
│   │   │   ├── Products.jsx # Product catalog
│   │   │   ├── CreateProduct.jsx # Product creation
│   │   │   ├── Profile.jsx # User profile
│   │   │   ├── vendor/     # Vendor-specific pages
│   │   │   │   ├── Analytics.jsx # Vendor analytics
│   │   │   │   ├── AddSurplus.jsx # Surplus posting
│   │   │   │   ├── SurplusExchange.jsx # Surplus marketplace
│   │   │   │   ├── SupplierMarketplace.jsx # Supplier catalog
│   │   │   │   └── TransactionHistory.jsx # Transaction history
│   │   │   └── Supplier/   # Supplier-specific pages
│   │   │       ├── Dashboard.jsx # Supplier dashboard
│   │   │       ├── CreateDelivery.jsx # Delivery creation
│   │   │       └── Profile.jsx # Supplier profile
│   │   ├── api.js          # API configuration
│   │   ├── store.js        # Redux store
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
└── README.md               # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackathon
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/surplushub
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_BASE_URL=http://localhost:5001
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

### Database Setup

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Create database**
   The application will automatically create the database and collections on first run.

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Surplus Endpoints
- `GET /api/surplus` - Get all surplus posts
- `POST /api/surplus` - Create surplus post
- `GET /api/surplus/:id` - Get surplus post by ID
- `PUT /api/surplus/:id` - Update surplus post
- `DELETE /api/surplus/:id` - Delete surplus post

### Transaction Endpoints
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/:id` - Update transaction status

### Delivery Endpoints
- `GET /api/delivery` - Get all deliveries
- `POST /api/delivery` - Create delivery
- `GET /api/delivery/:id` - Get delivery by ID
- `PUT /api/delivery/:id/status` - Update delivery status

### Payment Endpoints
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/history` - Get payment history

## 👥 User Roles & Permissions

### Supplier Role
- **Product Management**: Create, edit, and manage product listings
- **Inventory Control**: Monitor stock levels and update quantities
- **Order Processing**: View and process incoming orders
- **Delivery Management**: Create and track deliveries
- **Analytics**: View sales performance and order analytics

### Vendor Role
- **Surplus Exchange**: Post and browse surplus materials
- **Marketplace Access**: Browse supplier catalogs and place orders
- **Transaction History**: View complete transaction records
- **Analytics**: Access business performance insights
- **Booking System**: Reserve surplus materials and products

## 🔧 Key Features Breakdown

### 1. Authentication System
- **JWT-based authentication** with secure token management
- **Role-based access control** for suppliers and vendors
- **Password hashing** using bcrypt for security
- **Session management** with automatic token refresh

### 2. Product Management
- **Comprehensive product catalog** with categories and specifications
- **Image upload** support for product photos
- **Inventory tracking** with real-time stock updates
- **Pricing management** with flexible pricing models
- **Product status** management (active/inactive)

### 3. Surplus Exchange System
- **Material posting** with expiry dates and pricing
- **Booking system** for surplus materials
- **Real-time availability** tracking
- **Location-based** surplus discovery
- **Automatic expiry** notifications

### 4. Delivery Management
- **Real-time tracking** with status updates
- **Delivery logs** for complete history
- **Route optimization** suggestions
- **Status notifications** to all parties
- **Proof of delivery** documentation

### 5. Payment Integration
- **Razorpay integration** for secure payments
- **Multiple payment methods** support
- **Transaction history** with detailed records
- **Payment verification** and confirmation
- **Refund processing** capabilities

### 6. Notification System
- **Real-time alerts** for order updates
- **Email notifications** for important events
- **Push notifications** for mobile users
- **Customizable notification** preferences
- **Scheduled reminders** for expiring items

### 7. Analytics Dashboard
- **Sales performance** metrics
- **Order analytics** and trends
- **Inventory insights** and recommendations
- **Customer behavior** analysis
- **Revenue tracking** and reporting

## 🎨 UI/UX Features

### Modern Design
- **Responsive design** that works on all devices
- **Clean and professional** interface
- **Intuitive navigation** with role-based menus
- **Consistent branding** throughout the application

### Animations & Interactions
- **GSAP animations** for smooth transitions
- **Interactive elements** with hover effects
- **Loading states** for better user experience
- **Smooth scrolling** and page transitions

### User Experience
- **Role-based dashboards** tailored to user needs
- **Quick actions** for common tasks
- **Search and filtering** capabilities
- **Bulk operations** for efficient management

## 🔒 Security Features

- **JWT authentication** with secure token storage
- **Password hashing** using bcrypt
- **Input validation** and sanitization
- **CORS configuration** for API security
- **Rate limiting** to prevent abuse
- **Secure file uploads** with validation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop computers** (1920px and above)
- **Laptops** (1366px - 1919px)
- **Tablets** (768px - 1365px)
- **Mobile phones** (320px - 767px)

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Configure MongoDB Atlas or production database
3. Set up SSL certificates
4. Deploy to platforms like Heroku, AWS, or DigitalOcean

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support



**Built with ❤️ by Tech Hustlers** 
