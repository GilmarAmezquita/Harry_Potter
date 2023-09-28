import { Navigate, Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import Dashboard from "./views/home/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { userProps } from "./store/reducers/auth";

const routerDefiner = (user:userProps) => {
  if (user.uid) {
    return createHashRouter([
      {
        path: '/',
        element: <Navigate to={"/home/"} />
      },
      {
        path: '/home',
        element: (
          <>
            <h1>Home</h1>
            <Outlet />
          </>
        ),
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
        path: '*',
        element: <Navigate to={"/home/"} />
      }
    ]);
  }
  return createHashRouter([
    {
      path: '/',
      element: <LoginView />
    },
    {
      path: '/register',
      element: <RegisterView />
    },
    {
      path: '*',
      element: <Navigate to={"/"} />
    }
  ]);
}

function App() {
  const user:userProps = useSelector((state: RootState) => state.value);
  
  return (
    <RouterProvider router={routerDefiner(user)} />
  ); 
}

export default App