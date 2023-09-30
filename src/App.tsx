import { Navigate, Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import Dashboard from "./views/home/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { userProps } from "./store/reducers/auth";
import Navbar from "./components/Navbar";

const routerDefiner = (user:userProps) => {
  return createHashRouter([
    {
      path: '',
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/home',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Dashboard />
            },
            {
              path: 'list',
              element: <h1>List</h1>
            }
          ]
        },
        {
          path: '/login',
          element: user.uid ? <Navigate to={"/home/"} /> : <LoginView />
        },
        {
          path: '/register',
          element: user.uid ? <Navigate to={"/home/"} /> : <RegisterView />
        },
        {
          path: '*',
          element: <Navigate to={"/home/"} />
        }
      ]
    }
  ]);
}

function App() {
  const user:userProps = useSelector((state: RootState) => state.value);
  
  return (
    <>
      <RouterProvider router={routerDefiner(user)} />
    </>
  ); 
}

export default App