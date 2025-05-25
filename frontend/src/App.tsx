import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/signup" element={<SignUp/>}/>
        <Route path= "/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App