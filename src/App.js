
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Rootlayout from './Rootlayout';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Forgotpassword from './components/login/Forgotpassword';
import About from './components/home/About';
import Profile from './components/profile/Profile';
import Businessperson from './components/dashboard/Businessperson';
import Lorryowner from './components/dashboard/Lorryowner';
import Admin from './components/dashboard/Admin';



function App() {

  const router=createBrowserRouter([
      {
        path:"/",
        element:<Rootlayout/>,
        children:[
          {
            path:"/",
            element:<Home />,
            
          },
          {
            path:"/login",
            element:<Login />,
          },
          {
            path:"/signup",
            element:<Signup />
          },
          {
            path:"/forgot-password",
            element:<Forgotpassword />
          },
          {
            path:"/about",
            element:<About />
          },
          {
            path:"/profile",
            element:<Profile />
          },
          {
            path:"/business",
            element:<Businessperson />
          },
          {
            path:"/lorryowner",
            element:<Lorryowner />
          },
          {
            path:"/admin",
            element:<Admin />
          },
          

          
        ]
      }
    
  ])

  return (
    <div >
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
