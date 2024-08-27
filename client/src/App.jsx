import './App.css';
import OAuth from './components/OAuth';
import Home from './components/Home';
import { useAuthContext } from './hooks/useAuthContext';
import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <OAuth /> : <Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
