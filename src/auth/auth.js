export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  return !!token;
};

export const isAdminAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");
  console.log(token);
  return !!token && userRole === "admin";
};
