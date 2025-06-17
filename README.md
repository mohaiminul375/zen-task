# Zen Task

- A Full Stack Kanban Dashboard

## Overview:

- Zen Task is a full-featured, full-stack Kanban-style task management application designed to streamline productivity and keep users focused. Built with modern technologies, Zen Task allows users to create, update, and organize tasks across multiple stages such as To Do, In Progress, and Completed using an intuitive **drag-and-drop interface**.

## 🌐 Live Site: https://zentask-eight.vercel.app

# 🔧 Run the Project Locally

1️⃣ **Clone the Repository**:

```sh
  https://github.com/mohaiminul375/zen-task
  cd zen-task
```

2️⃣ **Install Dependencies**:

```sh
npm install
```

4️⃣ **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. (**Important!**)

5️⃣ **Run the Application**:

```sh
npm run dev -- --host
```

6️⃣ **Access the Site**: Open your browser and go to http://localhost:3000.

## 🚀 Features

## 👤 For Default User

### 1. Custom Authentication

- User must log in using custom JWT authentication

### 2. Dashboard

- After login, user is redirected to the Kanban Dashboard
- Displays a summary of the user's tasks (total, today, upcoming)

### 3. Create a Task

- User can create a new task with required details (title, description, due date..etc)

### 4.All Tasks & Update Task

- User can view all tasks in 3 Kanban columns (To Do, In Progress, Completed)
- Tasks can be updated in real-time via drag and drop between columns
- v
### 5.Drag and Drop

- Users can seamlessly drag and drop tasks between the three columns To Do, In Progress, and Completed to visually update the task status in real-time.

# 🔐 Access Info

- Default Email: mohaiminul375@gmail.com
- Password: 246123

## 🛠️ Technologies Used

- **Frontend**: Next.js, Typescript, HTML, Tailwind CSS, Shadcn UI.
- **Backend**: Node.js, Express.js, Mongoose.
- **Authentication**: Custom Auth with Jwt.
- **Hosting**: Vercel (frontend and backend both).

# 🛠️ npm and Packages

- `Next.js(15.3.3)`
- `React(18.2.0)`
- `Typescript`
- `Shadcn UI`
- `React hook form`
- `tanstack query`
- `axios`
- `lottie files`
- `react hot toast`
- `sweet alert 2`
- `react-beautiful-dnd`
- `react-image-uploading`
- `react-icon`

# 🖥️ Server Side

- [Zen Task Server Repository](https://github.com/mohaiminul375/zen-task-server)
