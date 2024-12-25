import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { MyProfile } from "./pages/my-profile";
import { ProductDetails } from "./pages/product-details";

import { NotFound } from "./pages/not-found";
import { CreateProduct } from "./pages/create-product";
import { EditProduct } from "./pages/edit-product";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
