import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Categorydetails from './Pages/Categorydetails'
import Blogdetails from './Pages/Blogdetails'
import Allcourse from './Pages/Allcourse'
import Contact from './Pages/Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { check_token } from './Auth/authslice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'



const App = () => {

  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const private_routing = [

    {
      path: '/blog',
      component: <Blog />
    },
    {
      path: '/categorydetails/:id',
      component: <Categorydetails />
    },
    {
      path: '/blogdetails/:id',
      component: <Blogdetails />
    },
    {
      path: '/course',
      component: <Allcourse />
    },
    {
      path: '/contact',
      component: <Contact />
    }
  ]

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ]

  // This step is required for to stop page refreshing problem in logout button
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>

          {/*Area of private routing*/}
          {public_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={routing?.component} />
              </>
            )
          })}


          {/*Area of public routing*/}
          {private_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
              </>
            )
          })}

        </Routes>
      </Router>
    </>
  )
}

export default App
