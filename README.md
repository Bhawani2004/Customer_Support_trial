# Customer_Support
Customer's Issues

URL:  https://customer-support-08u2.onrender.com

# ⚡ Nexus Support Desk

A modern, responsive, role-based Customer Support Ticket System built with Node.js, Express, Vue 3, and Tailwind CSS. 

This project provides a clean, two-role interface allowing customers to easily submit and track support tickets, while providing administrators with a powerful queue management and response system.

---

## ✨ Features

### 👤 Customer View
- **Raise New Tickets**: Simple, beautifully designed form to capture user details and issue descriptions.
- **Ticket Tracking**: Real-time view of past and active tickets.
- **Conversation Thread**: Customers can read admin replies and send responses directly within the ticket interface.

### 🛡️ Admin View
- **Global Ticket Queue**: See all incoming support requests across the organization.
- **Status Management**: Instantly update ticket statuses (`Open`, `In Progress`, `Resolved`, `Closed`).
- **Quick Contact**: Built-in quick links to email (`mailto:`) or call (`tel:`) the customer directly from the dashboard.
- **Integrated Replies**: Send responses directly back to the customer's dashboard.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js (REST API)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Vue 3 (Composition API via CDN)
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Feather Icons
- **Database**: In-Memory JavaScript Data Structures (Easily swappable for MongoDB/PostgreSQL)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
You need to have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nexus-support-desk.git
   cd nexus-support-desk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   npm start
   ```

4. **View the Application**
   Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```text
nexus-support-desk/
├── public/
│   ├── index.html       # The main layout and UI template
│   ├── style.css        # Custom CSS and animations
│   └── app.js           # Vue 3 application logic and state management
├── server.js            # Node.js/Express backend server and API routes
└── package.json         # Project metadata and dependencies
```

---

## ☁️ Deployment

This application is ready to be deployed to any platform that supports Node.js.

### Deploying to Render (Recommended & Free)
1. Push this repository to your GitHub account.
2. Sign in to [Render](https://render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Use the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Create Web Service**. Your app will be live in minutes!

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
