class AuthHelper {
  constructor() {
    this.accessKey = "access_token";
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

  parseTokens(token) {
    try {
      const base64Url = token.split('.')[1]; // el payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Token inválido", e);
      return null;
    }
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

    const headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await fetch(url, { ...options, headers });

    // Manejo de token vencido
    if (response.status === 401) {
      this.clearTokens();
      throw new Error("Unauthorized");
    }

    // no se parsea la respuesta
    return response;
  }
}

export const authHelper = new AuthHelper();