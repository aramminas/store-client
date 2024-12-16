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

const apiHandler = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const defaultHeaders: Record<string, string> = {
    Accept: "application/form-data",
  };

  const headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(`${apiUrl}/${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.statusText === "Unauthorized") {
        throw new Error(`Invalid email or password`);
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const responseData: { data: T } = await response.json();

    return { data: responseData.data, status: response.status };
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
};

export default apiHandler;
