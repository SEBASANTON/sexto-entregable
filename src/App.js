import {HashRouter, Routes, Route} from 'react-router-dom';
import { Shopping, Home, ProductsDetails } from "./pages";
import { LoadingScreen, NavBar } from './components';
import './App.css';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector((state) => state.isLoading)
  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen/>}
        <NavBar/>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/products/:id" element={<ProductsDetails/>}/>
          <Route path="/shopping" element={<Shopping/>}/>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
