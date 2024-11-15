import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Listazas from './components/Tabletek/Listazas';
import Felvetel from './components/Tabletek/Felvetel';
import Torles from './components/Tabletek/Torles';
import Kezdo from './components/Tabletek/Kezdo';
import { Navi } from './components/Navi';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Kezdo/>,
    },
    {
      path: "/tablet-lista",
      element: <Listazas />,
    },
    {
      path: "/tablet-felvetel",
      element: <Felvetel />,
    },
    {
      path: "/tablet-torles",
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
