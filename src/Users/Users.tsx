import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedValue } from "../useDebounce.tsx";

async function getNames() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.map((obj: { name: string }) => obj.name);
}

export default function Users() {
  const [usersData, setUsersData] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const debouncedValue = useDebouncedValue(value, 1000);

  useEffect(() => {
    async function updateNamesAfterFetching() {
      const names = await getNames();
      setUsersData(names);
    }

    updateNamesAfterFetching();
  }, [debouncedValue]);

  const filteredUsers = usersData.filter((name: string) => {
    return name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-80 gap-10">
        <div className="flex justify-between gap-5 text-white text-sm">
          <button
            onClick={() => {
              const sorted = filteredUsers.sort();
              setUsersData(sorted);
            }}
            className="py-2 px-8 bg-blue-300 border-blue-400 hover:bg-blue-100 rounded-2xl"
          >
            Sort by Ascending
          </button>
          <button
            onClick={() => {
              const sorted = filteredUsers.sort((a, b) =>
                b.localeCompare(a, undefined, { sensitivity: "base" }),
              );
              setUsersData(sorted);
            }}
            className="py-2 px-8 bg-blue-300 border-blue-400 hover:bg-blue-100 rounded-2xl"
          >
            Sort by Descending
          </button>
        </div>
        <input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl shadow-2xl"
        />
        <div>
          {filteredUsers.map((name) => {
            return <div className="flex items-start">{name}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
