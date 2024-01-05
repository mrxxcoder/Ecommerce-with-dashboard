import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import CookieService from "./services/CookieService";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

function App() {
  const token = CookieService.get("jwt");
  console.log(token);
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<h1>Categories</h1>} />
        </Route>

        <Route path="login" element={<Login isAuthenticated={token} />} />
      </Routes>
    </>
  );
}

export default App;
