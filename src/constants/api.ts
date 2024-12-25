import { getJwtData, ss } from "../utils";
import { apiUrl } from "./envs";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  body?: any;
}

const tokenIsExpired = (token: string) => {
  if (!token) return true;
  const payload = getJwtData();

  if (!payload) return true;

  const exp = payload.exp * 1000;
  return Date.now() > exp;
};

const refreshToken = async () => {
  try {
    const response = await fetch(`${apiUrl}/refresh-token`, {
      headers: {
        Accept: "application/form-data",
      },
      credentials: "include",
      method: "POST",
      body: null,
    });

    const responseData = await response.json();

    if (responseData.data) {
      return responseData.data;
    }

    return null;
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
};

export const getToken = async () => {
  const token = ss.get();

  if (tokenIsExpired(token || "")) {
    const responseToken = await refreshToken();
    const accessToken = responseToken?.accessToken;

    if (accessToken) {
      ss.set(accessToken);

      return accessToken;
    }

    return null;
  }
  return token;
};

const apiHandler = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const defaultHeaders: Record<string, string> = {
    Accept: "application/form-data",
  };

  const token = await getToken();

  if (token) {
    defaultHeaders["authorization"] = `Bearer ${token}`;
  }

  const headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(`${apiUrl}/${path}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      if (response.statusText === "Unauthorized") {
        throw new Error(`Invalid email or password`);
      }

      const errorData = await response.json();

      const message = errorData.message
        ? errorData.message
        : `Error ${response.status}: ${response.statusText}`;

      throw new Error(message);
    }

    const responseData: { data: T } = await response.json();

    return { data: responseData.data, status: response.status };
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
};

export default apiHandler;
