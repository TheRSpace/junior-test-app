import { Outlet } from "react-router-dom";
import "./assets/App.scss";
import Home from "./pages/Home.js";
import ProductAdd from "./pages/ProductAdd";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const AppLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/junior-test-app/",
          element: <Home />,
        },
        {
          path: "/junior-test-app/add/products",
          element: <ProductAdd />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="App-header">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
// {/* <BrowserRouter>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/add/product">Add</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/add/product" element={<ProductAdd />} />
//         </Routes>
//       </BrowserRouter> */}
