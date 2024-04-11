import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home />} />
       
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
