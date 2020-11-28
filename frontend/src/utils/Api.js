import qs from "querystring";

class Api {
  constructor({ baseUrl, headers }) {
    //options
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeRequest(endpoint, httpMethod, payload) {
    let url = `${this.baseUrl}/${endpoint}`;

    const options = {
      method: `${httpMethod}`,
      headers: this.headers,
    };

    if (
      payload !== undefined &&
      ["POST", "PUT", "PATCH"].includes(httpMethod)
    ) {
      options.body = JSON.stringify(payload);
    } else if (payload !== undefined) {
      url = `${url}?${qs.encode(payload)}`;
    }

    return fetch(url, options).then((res) => {
      if (res.ok) {
        // status code check
        return res.json(); // process response
      }

      // server respond with error 4xx
      if (res.status >= 400 && res.status < 500) {
        return res.json().then((body) => {
          return Promise.reject(`Что-то пошло не так: ${body.message}`);
        });
      }

      // server didn't reply 5xx
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  getInitialCards() {
    const endpoint = "cards";
    const httpMethod = "GET";

    return this.makeRequest(endpoint, httpMethod);
  }

  postCard(cardPayload) {
    const endpoint = "cards";
    const httpMethod = "POST";

    return this.makeRequest(endpoint, httpMethod, cardPayload);
  }

  deleteCard(cardId) {
    const endpoint = `cards/${cardId}`;
    const httpMethod = "DELETE";

    return this.makeRequest(endpoint, httpMethod);
  }

  likeCard(cardId) {
    const endpoint = `cards/${cardId}/likes`;
    const httpMethod = "PUT";

    return this.makeRequest(endpoint, httpMethod);
  }

  deleteLikeCard(cardId) {
    const endpoint = `cards/${cardId}/likes`;
    const httpMethod = "DELETE";

    return this.makeRequest(endpoint, httpMethod);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.deleteLikeCard(cardId);
    }
  }

  // другие методы работы с API

  getUserInfo() {
    const endpoint = "users/me";
    const httpMethod = "GET";

    return this.makeRequest(endpoint, httpMethod);
  }

  updateUserInfo(userInfoPayload) {
    const endpoint = "users/me";
    const httpMethod = "PATCH";

    return this.makeRequest(endpoint, httpMethod, userInfoPayload);
  }

  updateAvatar(avatarPayload) {
    const endpoint = "users/me/avatar";
    const httpMethod = "PATCH";

    return this.makeRequest(endpoint, httpMethod, avatarPayload);
  }
}

export { Api };
