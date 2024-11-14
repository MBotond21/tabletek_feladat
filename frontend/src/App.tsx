import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Listazas from './components/Tabletek/Listazas';
import Felvetel from './components/Tabletek/Felvetel';
import Torles from './components/Tabletek/Torles';
import { Navi } from './components/Navi';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home</h1>,
    },
    {
      path: "/tabletlista",
      element: <Listazas />,
    },
    {
      path: "/tabletfelvetel",
      element: <Felvetel />,
    },
    {
      path: "/tablettorles",
      element: <Torles/>,
    }
  ]);

  return (
    <>
      <h1>Tabletek</h1>
      <Navi />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
