import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"


const App = () => {
  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}
export default App