import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './pages/Home/Home';
import Workshop from './pages/Workshop/Workshop';
import Shop from './pages/Shop/Shop';
import OtherProducts from './pages/OtherProducts/OtherProducts';
import Contact from './pages/Contact/Contact';
import Vraivelo from './pages/Vraivelo/Vraivelo';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/other-products" element={<OtherProducts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vraivelo" element={<Vraivelo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
