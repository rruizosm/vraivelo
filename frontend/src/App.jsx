import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './pages/Home/Home';
import Workshop from './pages/Workshop/Workshop';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import OtherProducts from './pages/OtherProducts/OtherProducts';
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/Success/Success';
import Contact from './pages/Contact/Contact';
import Vraivelo from './pages/Vraivelo/Vraivelo';
import StoryDetail from './pages/Vraivelo/StoryDetail';
import EventFormation from './pages/Events/EventFormation';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import EventBanner from './components/EventBanner/EventBanner';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app flex flex-col min-h-screen">
          <Navbar />
          <Cart />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workshop" element={<Workshop />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/other-products" element={<OtherProducts />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vraivelo" element={<Vraivelo />} />
              <Route path="/vraivelo/:id" element={<StoryDetail />} />
              <Route path="/event-formation" element={<EventFormation />} />
            </Routes>
          </main>
          <Footer />
          <EventBanner />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
