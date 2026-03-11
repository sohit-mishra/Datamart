import { Suspense, lazy, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"
import PrivateRoute from "./components/PrivateRoute"
const Home = lazy(() => import("./pages/Home"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetails = lazy(() => import("./pages/ProductDetail"))
const CreateProduct = lazy(() => import("./pages/CreateProduct"))
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"))
const Profile = lazy(() => import("./pages/Profile"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const SignupPage = lazy(() => import("./pages/SignupPage"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4">
          <Suspense fallback={<div className="p-10 text-center"></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute roles={["user", "owner"]}>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <PrivateRoute roles={["owner"]}>
                    <Products />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/create"
                element={
                  <PrivateRoute roles={["owner"]}>
                    <CreateProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/update/:id"
                element={
                  <PrivateRoute roles={["owner"]}>
                    <UpdateProduct />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default App