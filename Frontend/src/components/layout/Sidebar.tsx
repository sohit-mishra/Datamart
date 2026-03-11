import { Link } from "react-router-dom"
import { FaTimes, FaHome, FaBoxOpen, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { useAuth } from "../../context/useAuth"

interface Props {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { user, role, logout } = useAuth()
  useEffect(() => {
    if (isOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out"
      })
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.4
      })
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl z-50 px-6 py-6 flex flex-col gap-8 -translate-x-full"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Datamart</h2>
          <FaTimes
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={toggleSidebar}
          />
        </div>
        <nav className="flex flex-col gap-6 text-gray-700 font-medium">

          <Link
            to="/"
            className="flex items-center gap-3 hover:text-blue-600 transition"
            onClick={toggleSidebar}
          >
            <FaHome />
            Home
          </Link>
          {role === "owner" && (
            <Link
              to="/products"
              className="flex items-center gap-3 hover:text-blue-600 transition"
              onClick={toggleSidebar}
            >
              <FaBoxOpen />
              Products
            </Link>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="flex items-center gap-3 hover:text-blue-600 transition"
                onClick={toggleSidebar}
              >
                <FaUser />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-3 hover:text-blue-600 transition"
                onClick={toggleSidebar}
              >
                <FaUser />
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 hover:text-blue-600 transition"
                onClick={toggleSidebar}
              >
                <FaUser />
                {user.name}
              </Link>
              <button
                onClick={() => {
                  logout()
                  toggleSidebar()
                }}
                className="flex items-center gap-3 text-red-500 hover:text-red-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar