import { useState } from "react"
import { loginUser, signInWithGoogle } from "@/api/auth"
import bg from "@/assets/beige-bg.png"
import cow_mascot from "@/assets/cow_mascot.png"
import cash_cow from "@/assets/cash_cow_logo.png"
import  FloatingIcons from "@/components/FloatingIcons"
import { useNavigate } from "react-router-dom"
import{ auth} from "@/firebase/firebase"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault()

        try {
            await loginUser(email, password)

            alert("Logged in")
            console.log(auth.currentUser)
            navigate("/")
        } catch (err) {
            console.error(err)
            alert("Login Failed")
        }
    }

    const handleGoogleLogin =
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

                <FloatingIcons/>
        
            <div className="relative z-10 flex-col items-center">
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
                        onSubmit={handleLogin}
                        className="bg-base-brown p-6 rounded-2xl border border-6 border-accent-brown shadow-xl w-full max-w-md space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center">

                            Sign In
                        </h1>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border border-accent-brown p-2 rounded"
                        />

                        <button
                            type="submit"
                            className="w-full bg-accent-brown text-white p-2 rounded"
                        >
                            Login
                        </button>
                        <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-gray-300 p-2 rounded flex items-center justify-center gap-2 -mt-2"
                        >
                            <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="google"
                            className="w-5 h-5"
                            />
                            Sign in with Google
                       </button>
                        <p className="text-center text-xs">Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600 underline">Sign up.</a></p> 
                        
                    </form>
                    
                </div>
            </div>
        </div>
    )
}