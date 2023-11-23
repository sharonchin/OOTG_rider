import {
  FilteredRider,
  RiderLoginResponse,
  RiderResponse,
  DeliveryMode,
} from "./validations/types";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(JSON.stringify(data.errors));
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

export async function apiRegisterRider(
  credentials: string
): Promise<FilteredRider> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
    body: credentials,
  });

  return handleResponse<RiderResponse>(response).then(
    (data) => data.data.rider
  );
}

export async function apiLoginRider(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
    body: credentials,
  });

  return handleResponse<RiderLoginResponse>(response).then(
    (data) => data.token
  );
}

export async function apiLogoutRider(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthRider(token?: string): Promise<FilteredRider> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3002",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/riders/me`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<RiderResponse>(response).then(
    (data) => data.data.rider
  );
}
