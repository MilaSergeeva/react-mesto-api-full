const TOKEN_KEY = "jwt";
const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { setToken, getToken, removeToken };
