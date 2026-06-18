import { NavLink } from "react-router-dom"
import logo from "@/assets/cash_cow_logo.png"
import { useAuth } from "@/context/AuthContext"
import cow_mascot from "@/assets/cow_mascot.png"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const { user } = useAuth()

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }
    return (
        <nav
            className="
        w-full
        backdrop-blur-md
        bg-accent-brown/60
        border-b border-white/10
      "
        >
            <div className="flex items-center justify-between px-6 -my-2">

                {/* LOGO */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-15 w-20 object-contain"
                    />
                </div>

                {/* LINKS */}
                <div className="flex gap-5 text-sm text-white">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "opacity-80 hover:opacity-100"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "opacity-80 hover:opacity-100"
                        }
                    >
                        Transactions
                    </NavLink>

                    <NavLink
                        to="/budget"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "opacity-80 hover:opacity-100"
                        }
                    >
                        Budget
                    </NavLink>
                </div>

                {/* user greeting */}
                <div className="flex items-center gap-2 text-white text-sm opacity-90">
                    {user ? (
                        <>
                            <span>Hi, {user.displayName || user.email}</span>

                            <img
                                src={cow_mascot}
                                alt="cow mascot"
                                className="h-6 w-6 object-contain"
                            />
                        </>
                    ) : (
                        <span>Not signed in</span>
                    )}
                    <button
                    onClick={logout}
                    className="bg-accent-brown px-2 rounded text-white text-sm"
                >
                    Log out
                </button>
                </div>

                


            </div>
        </nav>
    )
}