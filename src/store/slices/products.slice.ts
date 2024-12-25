import { ProductT } from "../../types";
import apiHandler from "../../constants/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductsState {
  data: ProductT[] | null;
  loading: boolean;
  status: "idle" | "loading" | "failed" | "succeeded";
  error?: string | null;
}

const initialState: ProductsState = {
  data: null,
  loading: false,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductData(state: ProductsState, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload || null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "posts/fetchProducts",
  async (signal?: AbortSignal) => {
    const response = await apiHandler<ProductT[]>("products", { signal });

    return response.data;
  }
);

export const { setProductData } = productsSlice.actions;

export default productsSlice.reducer;
