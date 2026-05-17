import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import BestChef from './components/BestChef';
import BestFood from './components/BestFood';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import OurMenu from './components/OurMenu';
import SpecialDish from './components/SpecialDish';
import CartPage from './components/cart/components/Cart';
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
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart/:id" element={<CartPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
