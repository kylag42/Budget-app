import { NavLink } from "react-router-dom"
import logo from "@/assets/cash_cow_logo.png"
import { useAuth } from "@/context/AuthContext"
import cow_mascot from "@/assets/cow_mascot.png"

export default function Navbar() {
    const { user } = useAuth()
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
                </div>


            </div>
        </nav>
    )
}