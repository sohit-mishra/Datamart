import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"

export default function PageNotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setShowButton(true)
    })

    tl.from(".error-404", {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    tl.from(".error-text", {
      y: 40,
      opacity: 0,
      duration: 0.6
    })

  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-6"
    >
      <div className="text-center">
        <h1 className="error-404 text-[120px] font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="error-text text-gray-600 text-lg mb-8">
          Sorry, the page you are looking for could not be found.
        </p>
        {showButton && (
          <Link
            to="/"
            className="inline-block bg-black text-white px-7 py-3 rounded-lg shadow-lg hover:bg-gray-800 hover:scale-105 transition"
          >
            Go Back Home
          </Link>
        )}
      </div>
    </div>
  )
}