import { useCallback, useEffect, useState } from "react";
import {
  fetchProducts,
  setProductData,
} from "../../store/slices/products.slice";
import { ProductT } from "../../types";
import apiHandler from "../../constants/api";
import { useDebounce } from "../../hooks/useDebounce";
import { Alert } from "../../components/common/alert";
import { Loader } from "../../components/common/loader";
import { useAppDispatch, useAppSelector } from "../../store";
import { DataNotFound } from "../../components/data-not-found";
import { ContentFilters } from "../../components/pages/dashboard/dashboard-content/content-filters";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";
import { ContentListView } from "../../components/pages/dashboard/dashboard-content/content-list-view";
import "./styles.scss";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [isOwnerId, setOvnerId] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const { data, status, loading, error } = useAppSelector(
    (state) => state.products
  );
  const debouncedChange = useDebounce((inputValue: string | null) => {
    setSearch(inputValue);
  });
  const user = useAppSelector((state) => state.user.data);

  const [isCardView, setCardView] = useState(false);

  const getProductsFilter = useCallback(
    async (ovnerId: boolean, name: string | null) => {
      let path = "products";

      if (ovnerId) {
        path += `/?ovnerId=${user?.id}`;
        if (name) {
          path += `&q=${name}`;
        }
      }

      if (!ovnerId && name) {
        path += `/?q=${name}`;
      }

      const response = await apiHandler<ProductT[]>(path);

      if (response.data) {
        dispatch(setProductData(response.data));
      }
    },
    [dispatch, user?.id]
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
    getProductsFilter(isOwnerId, search);
  }, [isOwnerId, search, getProductsFilter]);

  return (
    <>
      <ContentHeader
        title="Products"
        btnText="Add Product"
        path="/create-product"
      />
      <ContentFilters
        isCardView={isCardView}
        setCardView={setCardView}
        setOvnerId={setOvnerId}
        debouncedChange={debouncedChange}
      />

      {!data || (!data.length && <DataNotFound />)}
      {status === "failed" && <Alert type="error">{error}</Alert>}
      {loading && <Loader />}

      {data && (
        <ContentListView
          isCardView={isCardView}
          userId={user?.id || 0}
          products={data || []}
        />
      )}
    </>
  );
};
