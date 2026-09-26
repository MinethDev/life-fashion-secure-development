import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Components/Home/Home";
import React from "react";
import AddDelivery from "./Components/AddDelivery/AddDelivery"
import Deliverys from "./Components/Deliverydetails/Deliverys"
import UpdateDelivery from './Components/UpdateDelivery/UpdateDelivery';


function App() {
  return (
    <div>
      
        <React.Fragment>
          <Routes>
          <Route path="/" element={<Home/>}/>
            <Route path="/mainhome" element={<Home/>}/>
            <Route path="/adddelivery" element={<AddDelivery/>}/>
            <Route path="/deliverydetails" element={<Deliverys/>}/>
            <Route path="/deliverydetails/:id" element={<UpdateDelivery/>}/>
          </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
