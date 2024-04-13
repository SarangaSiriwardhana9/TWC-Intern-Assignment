import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import WelcomePage from "./pages/WelcomePage";
import NewContact from "./pages/NewContact";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home />} />
       
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/welcome' element={<WelcomePage />} />
        <Route path='/newcontact' element={<NewContact />} />
        <Route element={<PrivateRoute />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
