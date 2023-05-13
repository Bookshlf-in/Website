import { useRoutes } from "react-router-dom";

// Components
import Login from "../components/auth/login/login";
import Recovery from "../components/auth/recovery/recovery";
import Signup from "../components/auth/signup/signup";
import Verify from "../components/auth/signup/verify";

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
          path: "verify",
          element: <Verify />,
          children: [
            {
              path: ":email",
              element: <Verify />,
            },
          ],
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
  ]);
  return routes;
};

export default Router;
