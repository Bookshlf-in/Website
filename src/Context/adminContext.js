import { React, createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const CurrentAdminProvider = (props) => {
  const localAdmin = JSON.parse(localStorage.getItem("bookshlf_admin"));

  const [admin, setAdmin] = useState({
    bookVerification: {
      data: [],
      totalPages: 0,
      isApproved: false,
      page: 1,
      noOfBooksInOnePage: 24,
    },
    orderDetails: { data: [], page: 1, totalPages: 0 },
  });

  useEffect(() => {
    if (localAdmin) {
      setAdmin(localAdmin);
    }
  }, []);

  return (
    <AdminContext.Provider value={[admin, setAdmin]}>
      {props.children}
    </AdminContext.Provider>
  );
};
