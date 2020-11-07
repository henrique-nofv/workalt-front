
import React, { createContext, useState, useContext } from "react";

const UsersContext = createContext();

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers must be used within a UsersProvider");
  const { users, setUsers } = context;
  return { users, setUsers };
}