// import {
//   createContext,
//   useState,
//   ReactNode,
//   SetStateAction,
//   Dispatch,
//   useEffect,
// } from "react";
//
// export interface IUser {
//   email: string;
//   firstName: string | undefined;
//   userName: string | undefined;
//   password: "";
// }
//
// export const UserContext = createContext<{
//   users: IUser[];
//   setUsers: Dispatch<SetStateAction<IUser[]>>;
// } | null>(null);
//
// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<IUser[]>([
//     {
//       firstName: "",
//       userName: "",
//       email: "",
//       password: "",
//     },
//   ]);
//
//   useEffect(() => {
//     async function updateUsersAfterFetching() {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/users",
//       );
//       const data = await response.json();
//       console.log(data);
//       const names = data.map(
//         (obj: { name: string; email: string; username: string }) => {
//           return {
//             firstName: obj.name,
//             userName: obj.username,
//             email: obj.email,
//           };
//         },
//       );
//       setUsers(names);
//     }
//
//     updateUsersAfterFetching();
//   }, []);
//
//   return (
//     <UserContext.Provider value={{ users, setUsers }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
