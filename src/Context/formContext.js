import React, { createContext, useState } from "react";

export const AddFormContext = createContext();

export const CurrentFormProvider = (props) => {
  const [addForm, setAddForm] = useState(
    JSON.parse(localStorage.getItem("bookshlf_user_AddBook"))
  );
  return (
    <AddFormContext.Provider value={[addForm, setAddForm]}>
      {props.children}
    </AddFormContext.Provider>
  );
};
