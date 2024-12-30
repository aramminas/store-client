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

    if (
      (responseData.status === 403 &&
        responseData.message === "Invalid refresh token") ||
      (responseData.status === 401 &&
        responseData.message === "You are not authenticated!")
    ) {
      ss.remove();
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

const apiErrorHandler = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();

    if (
      response.statusText === "Unauthorized" &&
      errorData.message === "Invalid email or password"
    ) {
      throw new Error(errorData.message);
    }

    const message = errorData.message
      ? errorData.message
      : `Error ${response.status}: ${response.statusText}`;

    throw new Error(message);
  }
};

const apiDataHandler = async <T>(response: Response) => {
  const responseData: { data: T } = await response.json();

  return { data: responseData.data, status: response.status };
};

const defaultHeaders: Record<string, string> = {
  Accept: "application/form-data",
};

export const apiPublicHandler = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(`${apiUrl}/${path}`, {
      ...options,
      headers,
      credentials: "include",
    });

    await apiErrorHandler(response);

    return await apiDataHandler<T>(response);
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
};

const apiHandler = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const token = await getToken();

  const apiHeaders = { ...defaultHeaders };

  if (token) {
    apiHeaders["authorization"] = `Bearer ${token}`;
  }

  const headers = { ...apiHeaders, ...options.headers };

  try {
    const response = await fetch(`${apiUrl}/${path}`, {
      ...options,
      headers,
      credentials: "include",
    });

    await apiErrorHandler(response);

    return await apiDataHandler<T>(response);
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
};

export default apiHandler;
