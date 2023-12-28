// import logo from './logo.svg';
// import './App.css';
// import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/items' element={<ItemPage />} />
          <Route path='/cart' element={<CartPage />} />
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
