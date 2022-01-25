import { React, createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
export const UserContext = createContext();

export const CurrentUserProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("bookshlf_user"))
  );

  useEffect(() => {
    // getting count of Items
    const FetchCountAPI = () => {
      axios
        .get("/getUserProfile")
        .then((response) => {
          axios.get("/countWishlistItems").then((wishlist) => {
            axios.get("/countCartItems").then((cart) => {
              if (response.data.roles.includes("seller")) {
                axios
                  .get("/getCurrentBalance")
                  .then((balance) => {
                    setUser({
                      ...user,
                      roles: response.data.roles,
                      cartitems: cart.data.count,
                      wishlist: wishlist.data.count,
                      balance: Math.round(balance.data.walletBalance * 10) / 10,
                    });
                  })
                  .catch((error) => {
                    setUser({
                      ...user,
                      roles: response.data.roles,
                      cartitems: cart.data.count,
                      wishlist: wishlist.data.count,
                      balance: 0,
                    });
                  });
              } else {
                setUser({
                  ...user,
                  roles: response.data.roles,
                  cartitems: cart.data.count,
                  wishlist: wishlist.data.count,
                });
              }
            });
          });
        })
        .catch((error) => {
          setUser(null);
          localStorage.removeItem("bookshlf_user");
          delete axios.defaults.headers.common["Authorization"];
          history.go(0);
        });
    };
    if (user) {
      FetchCountAPI();
      // console.log(user);
    }
  }, [user?.authHeader]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
