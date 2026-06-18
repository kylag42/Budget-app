import { useState } from "react"
import { registerUser, signInWithGoogle } from "@/api/auth"
import bg from "@/assets/beige-bg.png"
import cow_mascot from "@/assets/cow_mascot.png"
import cash_cow from "@/assets/cash_cow_logo.png"
import FloatingIcons from "@/components/FloatingIcons"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (
        e: React.FormEvent
    ) => {
        e.preventDefault()

        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }
        try {
            await registerUser(
                name,
                email,
                password
            )

            navigate("/")
        } catch (err) {
            console.error(err)

            setError("Failed to register.")
        }
    }

    const handleGoogleRegister =
        async () => {
            try {
                await signInWithGoogle()

                navigate("/")
            } catch (err) {
                console.error(err)
            }
        }



    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center overflow-hidden pointer-events-none z-0"
                style={{ backgroundImage: `url(${bg})` }}
            />

            <FloatingIcons />

            <div className="relative z-10 flex-col items-center mb-2">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4 -mb-10">
                        <img
                            src={cow_mascot}
                            alt="cow mascot"
                            className="h-20 -mr-10 object-contain"
                        />
                        <img
                            src={cash_cow}
                            alt="cash cow title"
                            className="h-45 object-contain"
                        />
                    </div>


                    <form
                        onSubmit={handleRegister}
                        className="bg-base-brown p-6 rounded-2xl border border-6 border-accent-brown shadow-xl w-full max-w-md space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center">

                            Create Account
                        </h1>

                        <input
                            type="name"
                            placeholder="First name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        {error && (
                            <p className="text-red-500 text-sm">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-accent-brown text-white p-2 rounded"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="w-full bg-white border border-gray-300 p-2 rounded flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="google"
                                className="w-5 h-5"
                            />

                            Sign up with Google
                        </button>
                        <p className="text-center text-xs">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-600 underline">Login.</a></p>

                    </form>

                </div>
            </div>
        </div>
    )
}
