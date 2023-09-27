import { RouterProvider, createHashRouter } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/auth/LoginView";

const router = createHashRouter([
  {
    path: '/',
    element: <LoginView />
  },
  {
    path: '/register',
    element: <RegisterView />
  },
  {
    path: '/home',
    element: <div>Home</div>
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
  
}

export default App