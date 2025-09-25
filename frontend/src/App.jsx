import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import Footer from "./components/Footer.jsx"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"


function App() {

  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log("auth user is here:", user);

  useEffect(() => {
    authCheck();
  }, []);

  if(isCheckingAuth){
    return <div>Loading... <Loader /></div>
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
      <Toaster/>
    </>

  )
}

export default App
