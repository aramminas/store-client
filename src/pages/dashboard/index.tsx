import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";

import {
  fetchProducts,
  setProductData,
} from "../../store/slices/products.slice";
import apiHandler from "../../constants/api";
import { showPerPage } from "../../constants";
import { useDebounce } from "../../hooks/useDebounce";
import { Alert } from "../../components/common/alert";
import { Loader } from "../../components/common/loader";
import { ProductFilterParams, ProductT } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store";
import { DataNotFound } from "../../components/data-not-found";
import { Pagination } from "../../components/common/pagination";
import { getPageOffset, getPageParam, getParamsValue } from "../../utils";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";
import { ContentFilters } from "../../components/pages/dashboard/dashboard-content/content-filters";
import { ContentListView } from "../../components/pages/dashboard/dashboard-content/content-list-view";
import "./styles.scss";

export const Dashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const [limit] = useState(
    getParamsValue(searchParams, "limit") || showPerPage
  );
  const [offset, setOffset] = useState(getPageOffset(searchParams, limit));

  const [isOwnerId, setOvnerId] = useState(false);
  const [isCardView, setCardView] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user.data);
  const { data, status, loading, error } = useAppSelector(
    (state) => state.products
  );

  const debouncedChange = useDebounce((inputValue: string | null) => {
    setSearch(inputValue);
  });

  const getProductsFilter = useCallback(
    async (filters: ProductFilterParams) => {
      let path = "products";

      for (const [key, value] of Object.entries(filters)) {
        if (value || value === 0) {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      }

      // remove page param (This is an unnecessary parameter,
      // as the limit and offset are sufficient for a request.)
      searchParams.delete("page");
      const params = searchParams.toString();
      path += params ? `/?${params}` : "";

      const response = await apiHandler<ProductT[]>(path);

      if (response.data) {
        dispatch(setProductData(response.data));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (status === "idle") {
      dispatch(fetchProducts(signal));
    }

    return () => {
      controller.abort();
    };
  }, [data, status, dispatch]);

  useEffect(() => {
    const userId = isOwnerId ? user?.id : null;
    getProductsFilter({ userId, name: search, offset, limit });
  }, [isOwnerId, search, offset, limit, user?.id, getProductsFilter]);

  return (
    <>
      <ContentHeader
        title="Products"
        btnText="Add Product"
        path="/create-product"
        icon={<IoMdAdd size={18} />}
      />
      <ContentFilters
        isCardView={isCardView}
        setCardView={setCardView}
        setOvnerId={setOvnerId}
        debouncedChange={debouncedChange}
      />

      {!data || (!data?.products?.length && <DataNotFound />)}
      {status === "failed" && <Alert type="error">{error}</Alert>}
      {loading && <Loader />}

      {!!data?.products?.length && (
        <>
          <ContentListView
            isCardView={isCardView}
            userId={user?.id || 0}
            products={data?.products || []}
            total={data?.total}
          />
          <Pagination
            total={data.total}
            setOffset={setOffset}
            itemsPerPage={limit}
            defaultSelectedPage={getPageParam(searchParams)}
          />
        </>
      )}
    </>
  );
};
