import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CodeExplainer from './pages/CodeExplainer';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explainer" element={<CodeExplainer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
