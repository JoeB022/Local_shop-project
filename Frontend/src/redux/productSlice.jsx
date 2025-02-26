import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 Fetch products from Flask backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://127.0.0.1:5000/api/products"); // Update this URL if needed
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
