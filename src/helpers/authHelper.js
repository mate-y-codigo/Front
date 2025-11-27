// authHelper.js
class AuthHelper {
  constructor() {
    this.accessKey = "access_token";
    this.refreshKey = "refresh_token";
  }

  setTokens(accessToken) {
    sessionStorage.setItem(this.accessKey, accessToken);
  }

  getAccessToken() {
    return sessionStorage.getItem(this.accessKey);
  }

  clearTokens() {
    sessionStorage.removeItem(this.accessKey);
  }

  // Verificar expiración del JWT
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // exp viene en segundos
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  async fetchWithAuth(url, options = {}) {
    let token = this.getAccessToken();

    /* if (!token || this.isTokenExpired(token)) {
       token = await this.refreshAccessToken();
     }*/

    const headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      this.clearTokens();
      throw new Error("Unauthorized");
    }

    return response.json();
  }
}

export const authHelper = new AuthHelper();