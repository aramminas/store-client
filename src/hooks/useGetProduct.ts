import { useCallback, useEffect, useState } from "react";
import apiHandler from "../constants/api";

export const useGetData = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    const response = await apiHandler<T>(path);

    if (response.data) {
      setData(response.data);
    } else {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, error, loading, refetch };
};
