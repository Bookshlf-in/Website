import { useRoutes } from "react-router-dom";

// Components
import Login from "../components/auth/login";
import Recovery from "../components/auth/recovery/recovery";
import Signup from "../components/auth/signup/signup";
import Verify from "../components/auth/signup/verify";
import Home from "../components/home/home";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/auth/login",
      element: <Login />,
      children: [
        {
          path: ":email",
          element: <Login />,
        },
      ],
    },
    {
      path: "/auth/signup",
      element: <Signup />,
      children: [
        {
          path: ":email",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/auth/verify",
      element: <Verify />,
      children: [
        {
          path: ":email",
          element: <Verify />,
        },
      ],
    },
    {
      path: "/auth/recovery",
      element: <Recovery />,
      children: [
        {
          path: ":email",
          element: <Recovery />,
        },
      ],
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return routes;
};

export default Router;
