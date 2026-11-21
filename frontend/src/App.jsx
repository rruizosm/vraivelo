import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Home, Workshop, Mechanics, Suspensions, RearShock, Shop, ProductDetail, OtherProducts,
  Checkout, Success, Contact, Vraivelo, StoryDetail,
} from './lib/pages';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { BIKE_CATEGORIES } from './lib/categories';
import { basenameFor, langFromPath } from './lib/lang';

// /ca/... and /en/... are the same app under a prefix: every <Link to="/shop"> keeps the
// visitor in their language. Switching language is a full page load (LanguageSwitcher).
const BASENAME = basenameFor(langFromPath(window.location.pathname));

function App() {
  return (
    <CartProvider>
      <Router basename={BASENAME}>
        <ScrollToTop />
        <div className="app flex flex-col min-h-screen">
          <Navbar />
          <Cart />
          <main className="flex-grow">
            {/* pages load on demand; the current one is preloaded in entry.jsx */}
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/workshop/mechanics" element={<Mechanics />} />
                <Route path="/workshop/suspensions" element={<Suspensions />} />
                <Route path="/workshop/rear-shock" element={<RearShock />} />
                <Route path="/shop" element={<Shop />} />
                {BIKE_CATEGORIES.map((c) => (
                  <Route key={c.key} path={`/shop/${c.slug}`} element={<Shop category={c.key} />} />
                ))}
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route path="/other-products" element={<OtherProducts />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/vraivelo" element={<Vraivelo />} />
                <Route path="/vraivelo/:id" element={<StoryDetail />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
