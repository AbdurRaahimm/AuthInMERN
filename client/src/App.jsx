import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { getCookie } from "./lib/cookies";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const token = getCookie('token');

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="signin" element={token ? <Navigate to='/' /> : <SignIn />} />
      <Route path="signup" element={token ? <Navigate to='/' /> : <SignUp />} />
      <Route path="forgotpassword" element={token ? <Navigate to='/' /> : <ForgotPassword />} />
      <Route path="reset-password/:token" element={token ? <Navigate to='/' /> : <ResetPassword />} />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
