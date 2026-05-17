import { Routes, Route } from "react-router-dom";
import './App.css';
import BestChef from './components/BestChef';
import BestFood from './components/BestFood';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import OurMenu from './components/OurMenu';
import SpecialDish from './components/SpecialDish';
import CartPage from './components/cart/components/Cart';
import SignInPage from "./pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/checkout/components/Checkout";
function HomePage() {
  return (
    <>
      <Hero />
      <SpecialDish />
      <BestFood />
      <BestChef />
      <OurMenu />
      <Gallery />
    </>
  );
}

function App() {
  return (
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route
            path="/checkout/:id"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
