import {HashRouter, Routes, Route} from 'react-router-dom';
import { Home, ProductsDetails, Purchases } from "./pages";
import { LoadingScreen, NavBar } from './components';
import './App.css';
import { useSelector } from 'react-redux';
import './style/style.css'

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
          <Route path="/purchases" element={<Purchases/>}/>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
