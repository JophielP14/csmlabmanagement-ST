import axios from "axios";
import {
  ActivationType,
  LoginType,
  RegisterType,
  ResetPasswordConfirmType,
  TransactionListType,
} from "../Types/Types";

const instance = axios.create({
  baseURL: "https://csm-backend.keannu1.duckdns.org/",
});

// Token Handling
export async function getAccessToken() {
  const accessToken = await localStorage.getItem("access_token");
  return accessToken;
}

export async function getRefreshToken() {
  const refreshToken = await localStorage.getItem("refresh_token");
  return refreshToken;
}

export async function setAccessToken(access: string) {
  await localStorage.setItem("access_token", access);
  return true;
}

export async function setRefreshToken(refresh: string) {
  await localStorage.setItem("refresh_token", refresh);
  return true;
}

// Header Config Template for REST
export async function GetConfig() {
  const accessToken = await getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export function ParseError(error: { response: { data: string } }) {
  if (error.response && error.response.data) {
    if (error.response.data.length > 50) {
      return "Error truncated (too long)";
    }
    return JSON.stringify(error.response.data)
      .replace(/[{}]/g, " ")
      .replace(/\(/g, " ")
      .replace(/\)/g, " ")
      .replace(/"/g, " ")
      .replace(/,/g, " ")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/\./g, "")
      .replace(/non_field_errors/g, "")
      .trim();
  }
  return "Unable to reach server";
}
// User APIs

export function RegisterAPI(info: RegisterType) {
  return instance
    .post("api/v1/accounts/users/", info)
    .then(async (response) => {
      console.log(response.data);
      return [true, 0];
    })
    .catch((error) => {
      console.log("Registration failed");
      return [false, ParseError(error)];
    });
}

export function LoginAPI(user: LoginType) {
  return instance
    .post("api/v1/accounts/jwt/create/", user)
    .then(async (response) => {
      console.log(response.data);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);

      console.log("Login Success");
      return true;
    })
    .catch((error) => {
      console.log("Login Failed", error.response.data);
      return false;
    });
}

export async function JWTRefreshAPI() {
  const refresh = await getRefreshToken();
  return instance
    .post("api/v1/accounts/jwt/refresh/", {
      refresh: refresh,
    })
    .then(async (response) => {
      setAccessToken(response.data.access);
      return true;
    })
    .catch(() => {
      console.log("Error refreshing token");
      return false;
    });
}

export async function UserAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/accounts/users/me/", config)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log("Error retrieving user data");
    });
}

export function ActivationAPI(activation: ActivationType) {
  return instance
    .post("api/v1/accounts/users/activation/", activation)
    .then(() => {
      console.log("Activation Success");
    })
    .catch(() => {
      console.log("Activation failed");
    });
}
export function ResetPasswordAPI(email: string) {
  return instance
    .post("api/v1/accounts/users/reset_password/", { email: email })
    .then(() => {
      console.log("Activation Success");
    })
    .catch(() => {
      console.log("Activation failed");
    });
}

export function ResetPasswordConfirmAPI(info: ResetPasswordConfirmType) {
  return instance
    .post("api/v1/accounts/users/reset_password_confirm/", info)
    .then(() => {
      console.log("Reset Success");
    })
    .catch(() => {
      console.log("Reset failed");
    });
}

// Equipment APIs

export async function TransactionsAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/transactions/", config)
    .then((response) => {
      return response.data as TransactionListType;
    })
    .catch(() => {
      console.log("Error retrieving equipments");
    });
}
