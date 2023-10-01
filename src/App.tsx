import { Navigate, Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { userProps } from "./store/reducers/auth";
import Navbar from "./components/Navbar";
import Characters from "./views/characters/Characters";
import Movies from "./views/movies/Movies";
import Potions from "./views/potions/Potions";
import CharacterDetail from "./views/characters/CharacterDetail";

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
          path: '',
          element: <h1>Home</h1>
        },
        {
          path: '/characters',
          element: <Characters />
        },
        {
          path: '/characters/:id',
          element: <CharacterDetail /> 
        },
        {
          path: '/movies',
          element: <Movies />
        },
        {
          path: '/potions',
          element: <Potions />
        },
        {
          path: '/login',
          element: user.uid ? <Navigate to={"/"} /> : <LoginView />
        },
        {
          path: '/register',
          element: user.uid ? <Navigate to={"/"} /> : <RegisterView />
        },
        {
          path: '*',
          element: <Navigate to={"/"} />
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