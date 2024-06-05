import { Route, Routes, useNavigate } from "react-router-dom";
import Countries from "./Countries/Countries.tsx";
import Users from "./Users/Users.tsx";
import UsersForm from "./UsersForm/UsersForm.tsx";
import TodoList from "./TodoList/TodoList.tsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <div className="flex justify-around items-center bg-blue-300 h-20 shadow-2xl">
        <button
          onClick={() => navigate("/countries")}
          className="text-2xl text-white font-bold"
        >
          Countries
        </button>
        <button
          onClick={() => navigate("/users")}
          className="text-2xl text-white font-bold"
        >
          Users
        </button>
        <button
          onClick={() => navigate("/users-form")}
          className="text-2xl text-white font-bold"
        >
          Users Form
        </button>
        <button
          onClick={() => navigate("/todo-list")}
          className="text-2xl text-white font-bold"
        >
          Todo List
        </button>
      </div>
      <Routes>
        <Route index element={<Countries />} />
        <Route path="countries" element={<Countries />} />
        <Route path="users" element={<Users />} />
        <Route path="users-form" element={<UsersForm />} />
        <Route path="todo-list" element={<TodoList />} />
      </Routes>
    </div>
  );
}
