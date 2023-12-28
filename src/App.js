// import logo from './logo.svg';
// import './App.css';
// import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path='/items' element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path='/bills' element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          } />
          <Route path='/customers' element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
    // <div className="App">
    //   <h1>Loundry</h1>
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
