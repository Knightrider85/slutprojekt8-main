import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer/Footer";
import { Admin } from "./pages/Admin";
import { CartPage } from "./pages/Checkout";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import { FAQ } from "./pages/FAQ";
import { Home } from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            minHeight: "100vh",
          }}
          className="mb-4"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:productid" element={<ProductPage />} />
            <Route path="/checkout" element={<CartPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/users" element={<CreateUserPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}
