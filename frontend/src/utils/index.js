import { Api } from "./Api.js";
import { getToken } from "./token";

const api = new Api({
  baseUrl: "https://mesto-react.herokuapp.com",
  headers: {
    authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

function buildApiClient(token) {
  return new Api({
    baseUrl: "https://mesto-react.herokuapp.com",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export { api, buildApiClient };
