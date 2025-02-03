# React Frontend

This is the frontend of the application, built with React and TypeScript. It interacts with the backend API and provides the user interface.

## 🚀 Features

- React with TypeScript
- Tailwind CSS for styling
- API integration with a Node.js backend
- Responsive UI
- Docker Support

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended) - 22.13.0 Version
- [npm](https://www.npmjs.com/)

### 01. Clone the Repository


git clone https://github.com/Adithaabenayaka/library_frontend
cd library_frontend

### 02. Environment Variables
Create a .env file in the project root and variable according to .env_sample

### 03. Install and Run (Without Docker - If you use docker go to step 04)

npm install
npm run dev 

### Docker for build
docker build -t library-frontend .  
docker run -d -p <Port for FE>:80 --name library-frontend-container library-frontend

### Enjoy!!!
###