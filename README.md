# 🛒 Mini E-Commerce Backend

A backend API project developed with Node.js & Express.js, simulating the core functionalities of an e-commerce platform such as product management, cart operations, order handling, payment processing, authentication, and admin-level access.

## 📑 Table of Contents
- [Introduction](#introduction)
- [Motivation](#motivation)
- [Tech Stack](#tect-stack)
- [Features](#features)
- [Overview](#overview)
- [Setup & Run](#setup-&-run)
- [Usage](#usage)
- [Conclusion](#conclusion)
- [Contributing](#contributing)
- [License](#license)

## 📘 Introduction

The Mini E-Commerce Backend is a portfolio project built for freelance showcase on Upwork.
It demonstrates a secure and scalable backend service, covering the core use cases of an online store.

## 💡 Motivation

The motivation behind this project:
- To build a real-world-like e-commerce backend.
- To demonstrate clean coding, REST API design, and security best practices.

## 🛠️ Tech Stack

- Node.js - Backend runtime
- Express.js - API framework
- Supabase - Database
- JWT - Authentication & Authorization
- Stripe & PayPal - Payment systems
- Docker - Deployment

## 🚀 Features
- 👤 Authentication & Authorization
- 🛒 Product Management
- 🛍️ Cart Management
- 📦 Order Management
- 💳 Payment Processing

## 🗂️ Overview

### 📂 Project Structure

```

mini_e-commerce_backend_service/
│── src/
│   ├── config/
│   ├── db.ts
│   ├── env.ts
│   ├── stripe.ts
│   ├── paypal.ts
|     
│   ├── controllers/
│   ├── authController.ts 
│   ├── cartController.ts 
│   ├── orderController.ts 
│   ├── paymentController.ts
│   ├── productController.ts 
│   ├── webhookController.ts 
   
│   ├── middlewares/
│   ├── authMiddleware.ts 
|           
│   ├── routes/
│   ├── authRoutes.ts 
│   ├── cartRoutes.ts 
│   ├── orderRoutes.ts 
│   ├── paymentRoutes.ts 
│   ├── productRoutes.ts 
│   ├── webhookRoutes.ts 
|        
│   ├── services/
│   ├── authService.ts 
│   ├── cartService.ts 
│   ├── orderService.ts
│   ├── paypalService.ts
│   ├── paypalWebhookService.ts
│   ├── stripeService.ts
│   ├── stripeWebhookService.ts
│   ├── paymentService.ts 
│   ├── productService.ts 
│   ├── webhookService.ts 
|
│   ├── types/
│   ├── cart.d.ts 
│   ├── order.d.ts 
│   ├── payment.d.ts 
│   ├── product.d.ts
│   ├── paypal.d.ts
│   ├── user.d.ts
|
│   ├── utils/
│   ├── jwt.ts 
│   ├── password.ts
|
│   ├── validators/
│   ├── authValidator.ts 
│   ├── cartValidator.ts 
│   ├── orderValidator.ts 
│   ├── paymentValidator.ts
│   ├── productValidator.ts
│   ├── webhookValidator.ts
| 
│   └── app.js         
│
│── .env
│── .gitignore
│── LICENSE
│── package.json
│── pnpm-lock-yaml
│── README.md
│── tsconfig.json


```

### 📡 API Endpoints

#### 🔐 Auth
##### Register
```

http://localhost:3000/api/auth/register

```

##### Login

```

http://localhost:3000/api/auth/login

```
#### 🛒 Product

##### Create Product, Get All Products
```

http://localhost:3000/api/products

```
##### Get Product by ID, Update Product & Delete Product
```

http://localhost:3000/api/products/:id

```
#### 🛍️ Cart
##### Create Cart
```

http://localhost:3000/api/cart

```
##### Add Item to Cart
```

http://localhost:3000/api/cart/:id/items

```
##### Update Cart Item & Delete Cart Item
```

http://localhost:3000/api/cart/:id/items/:productId

```
##### Get Cart
```

http://localhost:3000/api/cart/:cartId

```
#### 📦 Orders
##### Create Order & Get All Orders
```

http://localhost:3000/api/order

```
##### Get Order by ID, Update Order & Delete Order
```

http://localhost:3000/api/order/:orderId

```
#### 💳 Payments
##### Create Payment
```

http://localhost:3000/api/create

```
##### Webhook
```

http://localhost:3000/api/webhook/:provider

```

## ⚙️ Setup & Run
1. Clone the repository:
```

git clone https://github.com/duraanos/mini-e-commerce-backend-service.git

```

2. Create a `.env` file:
```

PORT=3000

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

JWT_SECRET=your_jwt_secret

STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_secret_key

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_WEBHOOK_SECRET=your_paypal_webhook_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_MODE=sandbox

```
3. Install dependencies:
```

pnpm install

```


## ▶️ Usage
### Development
```

pnpm dev

```

## ✅ Conclusion

This project provides a solid foundation for e-commerce backends with modern practices:
- Secure authentication
- Payment integrations
- Scalable structure with Docker

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)