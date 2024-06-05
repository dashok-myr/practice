import { useState } from "react";

interface ITodo {
  todo: string;
  isChecked: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [value, setValue] = useState<string>("");

  function addTodo() {
    setTodos([
      ...todos,
      {
        todo: value,
        isChecked: false,
      },
    ]);
    setValue("");
  }

  function removeTodo(index: number) {
    const filtered = [...todos];
    filtered.splice(index, 1);
    setTodos(filtered);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col border border-gray-200 rounded-2xl shadow-2xl p-10 bg-gray-900 gap-5 w-1/3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type todo
            </label>
            <input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="TODO..."
            />
          </div>
          <button
            onClick={addTodo}
            type="button"
            className="py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
          >
            Add todo
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {todos.map((todo, index) => {
            return (
              <div
                key={todo.todo}
                className="flex flex-col gap-3 bg-gray-800 p-3 rounded-xl"
              >
                <div className="flex justify-between text-white">
                  <div className="flex gap-3 items-center">
                    <input
                      onClick={() => {
                        const todosCopy = [...todos];
                        todosCopy[index].isChecked = !todos[index].isChecked;
                        setTodos(todosCopy);
                      }}
                      type="checkbox"
                      checked={todo.isChecked}
                      className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                      required
                    />
                    <div className={todo.isChecked ? "line-through" : ""}>
                      {todo.todo}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeTodo(index);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
