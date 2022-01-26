import { React, createContext, useState } from "react";

export const AdminContext = createContext();

export const CurrentAdminProvider = (props) => {
  const [admin, setAdmin] = useState({
    bookVerification: { data: [], totalPages: 0, isApproved: false, page: 1 },
    orderDetails: { data: [], page: 1, totalPages: 0 },
  });
  return (
    <AdminContext.Provider value={[admin, setAdmin]}>
      {props.children}
    </AdminContext.Provider>
  );
};
