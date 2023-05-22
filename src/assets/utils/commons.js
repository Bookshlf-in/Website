export const isLocationAuth = (pathname) => {
  if (pathname.startsWith("/auth")) return true;
  return false;
};

export const isUATEnvironment = () => {
  if (process.env.REACT_APP_NODE_ENV === "uat") return true;
  return false;
};

export const userRoleCheck = (user, role) => {
  if (user?.roles?.includes(role)) return true;
  return false;
};
