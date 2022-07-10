export const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const setJwt = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeJwt = () => {
  localStorage.removeItem("token");
};

export const getJwt = () => {
  return localStorage.getItem("token") as string;
};
