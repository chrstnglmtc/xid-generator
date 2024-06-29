import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckerForm from './components/CheckerForm';
import Footer from './components/Footer';
import GenerateForm from './components/GenerateForm';
import Header from './components/Header';
import Home from './components/Home';
// import ShadowForm from './components/ShadowForm';
import UnderConstruction from './components/UnderConstruction';
import FollowCheck from './components/FollowCheck';
import NotFound from './components/NotFound';  // Import the NotFound component

function App() {
  return (
    <Router>
      <div className="bg-zinc-800 min-h-screen flex flex-col h-screen justify-between">
        <Header>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<GenerateForm />} />
              <Route path="/checker" element={<CheckerForm />} />
              <Route path="/doesfollow" element={<FollowCheck />} />
              <Route path="/shadowban" element={<UnderConstruction />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </div>
        </Header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
