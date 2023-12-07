import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/shared/header'
import Homepage from './components/homepage/homepage';
import NoPage from './components/nopage/nopage';
import SignIn from './components/signin/signin'
import axios from 'axios'
import SignUp from './components/signup/signup';
import Order from './components/order/order_';
import ViewHistoryBook from './components/viewHistoryBook/viewHistoryBook'


function App() {
  return (
    <Routes>
      
        <Route index element={<Homepage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='viewhistory' element={<ViewHistoryBook/>} />
        <Route path="*" element={<NoPage />} />
        <Route path="order" element={<Order />} />

    </Routes>
  );
}

export default App;

