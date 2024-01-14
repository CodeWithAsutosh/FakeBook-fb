import './App.css';
import './login-signup.css';
import './style.scss';
import { useContext } from 'react';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from './components/navbar/index.jsx';
import Leftbar from './components/leftbar/index.jsx';
import Rightbar from './components/rightbar/index.jsx';
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <Leftbar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;