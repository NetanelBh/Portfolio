const logoutProcess = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  return '/';
};

export default logoutProcess;