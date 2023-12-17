import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/signin" element={<Signin/>}></Route>
  <Route path="/signup" element={<Signup/>}></Route>

 </Routes>
 </BrowserRouter>
  )
}

export default App
