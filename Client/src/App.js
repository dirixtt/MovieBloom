import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NoPage from './Pages/NoPage.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import Home from './Home.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
