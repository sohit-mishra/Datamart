import { Link } from "react-router-dom"
import { FaUserCircle, FaBars } from "react-icons/fa"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useAuth } from "../../context/useAuth"

interface Props {
  toggleSidebar: () => void
}

const Navbar = ({ toggleSidebar }: Props) => {
  const { logout, user, role } = useAuth()
  const navRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }, { scope: navRef })

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-black tracking-tight hover:text-blue-600 transition"
        >
          Datamart
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link to="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          {role === "owner" && (
            <Link to="/products" className="relative group">
              Products
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="relative group">
                Login
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>

              <Link to="/signup" className="relative group">
                Signup
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <FaUserCircle size={20} />
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-black text-xl"
        >
          <FaBars />
        </button>
      </div>
    </header>
  )
}

export default Navbar