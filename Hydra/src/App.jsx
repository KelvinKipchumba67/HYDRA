import { Routes, Route, Navigate } from 'react-router-dom';
import ProblemSolution from './components/ProblemSolution';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Login from './components/login';
import SignUp from './components/signup';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Cart from './components/cart';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Hero />
              <ProblemSolution />
            </>
          )}
        />
        <Route path="/problem-solution" element={<Navigate to="/#problem-solution" replace />} />
        <Route path="/ProblemSolution" element={<Navigate to="/#problem-solution" replace />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
