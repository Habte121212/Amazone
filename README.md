# 🛒 Amazone – Modern Amazon-like E-commerce App

Welcome to **Amazone**, a full-stack, Amazon-inspired e-commerce platform built with React, Vite, Firebase, Stripe, and modern UI/UX best practices. This project demonstrates a robust shopping experience with authentication, cart, payment, and order management.

---

## 🚀 Features

- **Modern UI/UX**: Responsive, clean, and intuitive design inspired by Amazon.
- **Authentication**: Secure sign-in/register with Firebase Auth.
- FakeStoreAPI Integration: Products are fetched dynamically for display and detail view.
- **Product Catalog**: Browse, search, and view product details.
- **Cart & Checkout**: Add/remove items, adjust quantities, and view cart summary.
- **Stripe Payments**: Secure payment processing via Stripe.
- **Order Management**: View past orders, order details, and status.
- **Protected Routes**: Only authenticated users can access payment and order pages.
- **Global State**: Context API + useReducer for cart and user state.
- **Notifications**: Toast messages for feedback and errors.
- **Loading Spinners**: Smooth loading experience across pages.

---

## 🏗️ Tech Stack

- **Frontend**: React, Vite, SCSS, React Router, Context API
- **Backend**: Firebase Firestore, Firebase Functions
- **Payments**: Stripe.js, @stripe/react-stripe-js
- **UI Components**: Material UI, custom SCSS modules
- **Other**: react-toastify, react-spinners

---

## 📦 Project Structure

```
Amazone/
  clients/
    public/           # Static assets & images
    src/
      api/            # Axios & endpoints
      assets/         # SVGs and icons
      components/
        DataProvider/ # Context & reducer
        header/       # Header, logo, navigation
        products/     # Product cards, loader
        pages/
          auth/       # Auth page & styles
          cart/       # Cart page & styles
          orders/     # Orders page & styles
          payment/    # Payment page & styles
          landing/    # Landing page
          results/    # Search results
          peoductDetail/ # Product detail page
        LayOut/       # Layout wrapper
        protectRoutes/# Route protection
      style.scss      # Global mixins
      App.jsx         # App entry
      main.jsx        # React root
    package.json      # Client dependencies
    vite.config.js    # Vite config
    README.md         # This file!
  server/
    index.js          # Server entry
    package.json      # Server dependencies
    firebase.json     # Firebase config
```

---

## ⚡ Quick Start

1. **Clone the repo**

   ```bash
   git clone https://github.com/Habte121212/Amazone.git
   cd Amazone/Amazone/clients
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit `http://localhost:5173`

---

## 🔑 Authentication

- Sign in or register with a Gmail address.
- Auth state is synced with Firebase and persisted in localStorage.
- Protected routes for `/order` and `/payment`.

---

## 💳 Payments

- Stripe integration for secure checkout.
- Orders are saved to Firestore after successful payment.

---

## 📚 Code Highlights

- **Context API** for global state (cart, user).
- **Reducer** for cart actions (add, remove, increment, decrement).
- **Modular Firebase** usage for Auth and Firestore.
- **SCSS modules** for maintainable, responsive styles.
- **Custom loaders** for products and orders.

---

## 🖼️ Screenshots

### Landing Page

![Landing Page]<img width="960" height="482" alt="image" src="https://github.com/user-attachments/assets/f02538b6-2b43-49d0-963f-89f78940d4ff" />




---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT

---

## ✨ Credits

- Inspired by Amazon.com
- Built by Habte121212 and contributors

---

Let me know if you want to add more sections, badges, or visuals!
