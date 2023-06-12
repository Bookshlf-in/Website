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

export const StringtoObject = (string, splitter = "&", delimiter = "=") => {
  if (string === undefined || string === "default") return {};
  const params = string.split(splitter);
  let result = {};
  params.map((param) => {
    const key = param.split(delimiter)[0];
    const value = param.split(delimiter)[1];
    result = {
      ...result,
      [key]: value,
    };
    return param;
  });
  return result;
};

export const StringtoArray = (string, splitter = "&") => {
  if (string === undefined || string === "default") return ["default"];
  return string.split(splitter);
};
