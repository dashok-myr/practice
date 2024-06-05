import { ChangeEvent, useState } from "react";

export default function Countries() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [list, setList] = useState([]);

  async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    const promise = await fetch(
      `https://algochurn-server.onrender.com/practice/countries/${e.target.value}`,
    );
    const data = await promise.json();
    setCountries(data.countries);
  }

  return (
    <div className="flex h-screen justify-center m-24">
      <div className="flex gap-16">
        <div className="flex flex-col min-w-96">
          <input
            type="text"
            value={value}
            onChange={(e) => handleOnChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {value &&
            countries.map((country, index) => {
              return (
                <button
                  className="flex justify-start hover:bg-amber-100"
                  onClick={() => {
                    setList([...list, country]);
                  }}
                  key={index}
                >
                  {country}
                </button>
              );
            })}
        </div>
        <div className="flex flex-col gap-3 ">
          <label>My List of countries</label>
          <div className="bg-blue-100">
            {list.map((item, index) => {
              return (
                <div className="flex justify-between gap-4 hover:bg-blue-300 p-2">
                  <div>{item}</div>
                  <button
                    onClick={() => {
                      const newList = list.filter((_, i) => {
                        return i !== index;
                      });
                      setList(newList);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
