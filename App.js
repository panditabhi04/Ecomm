import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Compontes/Nav';
import Footer from './Compontes/Footer';
import SingUp from './Compontes/SingUp';
import PrivetComponet from './Compontes/PrivetComponet';
import Login from './Compontes/Login';
import AddProduct from './Compontes/AddProduct';
import ProductList from './Compontes/ProductList';
import UpdateProduct from './Compontes/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route element={<PrivetComponet/>} >
        <Route path='/' element={<ProductList/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>This is LogOut page</h1>} />
        <Route path='/profile' element={<h1>This is Profile page</h1>} />
      
        </Route>
        <Route path='/singup' element={<SingUp/>} />
        <Route path='/login' element={<Login/>} />

        </Routes>

      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
