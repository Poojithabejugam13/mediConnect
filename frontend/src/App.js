import  'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Root from './Root';
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<Root></Root>,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
