# FELX-LMS

A comprehensive Learning Management System featuring a robust backend, a mobile application, and a modern web interface.

---

## 🛠 Tech Stack

### Backend

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Frontend Mobile

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Frontend Web

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## 🚀 Development Setup

### 1. Backend Setup

The backend is powered by **Bun** and **Express**.

#### Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/felx-lms
```

#### Installation & Run

```bash
cd Backend

# Install dependencies
bun install

# Start the development server
bun run dev
```

### 2. Frontend Mobile Setup

The mobile app is built with **React Native** and **Expo**.

```bash
cd Frontend-mobile

# Install dependencies
bun install

# Start the Expo development server
bun run expo
```

### 3. Frontend Web Setup

The web application uses **React**, **Vite**, and **TanStack Router**.

```bash
cd Frontend-web

# Install dependencies
bun install

# Start the development server
bun run dev
```
