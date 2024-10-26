import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ProductsPage from "./Pages/ProductsPage";
import AddProductPage from "./Pages/AddProductPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyCartPage from "./Pages/MyCartPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: "/",//replace with error page
      element: (
        <>
          <Navbar />
          <ToastContainer position="bottom-right" autoClose={2000} />
          <Outlet />   {/*  //This will render child routes */}
        </>
      ),
      children: [
        {
          path: "/", element: <ProductsPage />
        },
        {
          path: "/addPage", element: <AddProductPage />
        },
        {
          path: "/myCart", element: <MyCartPage />
        }
      ]

    }
  ])


  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
