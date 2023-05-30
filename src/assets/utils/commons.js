export const isLocationAuth = (pathname) => {
  if (pathname.startsWith("/auth")) return true;
  return false;
};

export const isUATEnvironment = () => {
  if (process.env.REACT_APP_NODE_ENV === "uat") return true;
  return false;
};

export const PrintInUATEnvironment = (data) => {
  if (isUATEnvironment()) console.log(data);
};

export const userRoleCheck = (user, role) => {
  if (user?.roles?.includes(role)) return true;
  return false;
};

export const trimText = (text, maxLength) => {
  return text.length >= maxLength ? text.substr(0, maxLength) + "..." : text;
};
