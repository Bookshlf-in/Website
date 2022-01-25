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
      axios.get("/countWishlistItems").then((wishlist) => {
        axios.get("/countCartItems").then((cart) => {
          axios
            .get("/getCurrentBalance")
            .then((balance) => {
              setUser({
                ...user,
                cartitems: cart.data.count,
                wishlist: wishlist.data.count,
                balance: Math.round(balance.data.walletBalance * 10) / 10,
              });
              // console.log(wishlist.data, cart.data, balance.data);
            })
            .catch((error) => {
              setUser({
                ...user,
                cartitems: cart.data.count,
                wishlist: wishlist.data.count,
              });
            });
        });
      });
      axios
        .get("/getUserProfile")
        .then((response) => {
          setUser({ ...user, roles: response.data.roles });
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
