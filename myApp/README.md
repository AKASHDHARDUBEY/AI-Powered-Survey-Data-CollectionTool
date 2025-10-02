# SV Traders Smart App

A cross-platform mobile application for SV Traders that supports both B2B and B2C operations.

## Features

### 🔐 Authentication & Role-based Access
- **B2B Wholesale Buyers**: Access to bulk pricing and wholesale features
- **B2C Retail Customers**: Standard retail shopping experience  
- **Admin Users**: Inventory management and order tracking

### 🛍️ Product Management
- Browse products with real-time stock updates...
- Search functionality across product names and categories
- Product categorization (Food, Home, etc.)
- Stock level indicators (Low stock warnings)

### 🛒 Shopping Cart & Orders
- Add/remove products with quantity management
- Real-time cart updates
- Customer information collection
- Order placement with order ID generation
- B2B bulk discount (10% off)

### 👤 User Profiles
- Editable profile information
- Role-specific information (Business name, GST for B2B)
- Account statistics and order history
- Secure logout functionality

### 🏢 Admin Dashboard
- Inventory management with stock updates
- Order tracking and status management
- Add new products to inventory
- Real-time statistics and analytics

## Technical Features Implemented

### ✅ Navigation
- **Stack Navigation**: Login → Main App flow
- **Bottom Tab Navigation**: Products, Cart, Profile, Admin
- **Conditional Navigation**: Admin tab only visible for admin users

### ✅ Styling
- Consistent design system with color scheme
- Modern UI with shadows and rounded corners
- Role-based color coding (B2B: Orange, B2C: Blue, Admin: Red)
- Responsive layouts and proper spacing

### ✅ ScrollView & FlatList
- **ScrollView**: Login form, Profile screen, Cart screen, Admin forms
- **FlatList**: Product listing with optimized rendering
- Smooth scrolling with proper content insets

### ✅ User Input Handling
- Text input validation and formatting
- Numeric inputs for prices and quantities
- Search functionality with real-time filtering
- Form submission with error handling

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Simulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS  
   npm run ios
   
   # For Web
   npm run web
   ```

## App Structure

```
myApp/
├── App.js                 # Main app with navigation setup
├── screens/
│   ├── LoginScreen.js     # Authentication with role selection
│   ├── ProductListScreen.js # Product browsing with FlatList
│   ├── CartScreen.js      # Shopping cart with ScrollView
│   ├── ProfileScreen.js   # User profile management
│   └── AdminScreen.js     # Admin dashboard
└── package.json
```

## Sample Data

The app includes sample data for demonstration:
- 5 sample products across Food and Home categories
- 4 sample orders with different statuses
- Role-specific user profiles

## Key Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library for routing
- **React Hooks**: State management (useState)
- **StyleSheet**: Styling and theming

## Future Enhancements

- Backend API integration
- Real-time inventory synchronization
- Payment gateway integration
- Push notifications
- Barcode/QR code scanning
- Chatbot integration
- Image-based product search

---

**Developer**: Akash Dhar Dubey  
**Project**: SV Traders Smart B2B & B2C Retail App  
**Version**: 1.0.0 (Basic Implementation - 20% of full idea)
