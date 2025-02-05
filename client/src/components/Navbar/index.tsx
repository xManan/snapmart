import Logo from '@/components/Logo'
import { Link } from 'react-router-dom'
import OverlayContainer from '@/components/OverlayContainer'
import Login from '@/components/Login'
import VerifyOtp from '@/components/VerifyOtp'
import { LoginState } from '@/enums'
import { useState } from 'react'

function Navbar() {
    const [waitingForOtp, setWaitingForOtp] = useState<boolean>(false)
    const [loginState, setLoginState] = useState<LoginState>(LoginState.HIDDEN)
    const handleLogin = async () => {
        try {
            setWaitingForOtp(true)
            const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + '/api/v1/login')
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoginState(LoginState.VERIFY_OTP)
            setWaitingForOtp(false)
        }
    }
    const handleVerifyOtp = async () => {
    }
    return (
        <div className="sticky top-0 w-full bg-white flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center p-4 border-b z-10">
            <Link to="/">
                <div className="text-4xl font-bold hidden md:block">
                    <Logo />
                </div>
            </Link>
            <div className="relative flex justify-between items-center w-full md:w-auto">
                <div className="flex flex-col">
                    <p className="text-md font-semibold whitespace-nowrap">Delivery in 13 minutes</p>
                    <p className="text-sm whitespace-nowrap">Sonipat, Haryana, India</p>
                </div>
                <div onClick={() => setLoginState(LoginState.LOGIN)} className="md:hidden cursor-pointer">
                    Login
                </div>
            </div>
            <div className="flex-grow w-full md:w-auto">
                <input type="text" placeholder="Search" className="w-full border rounded-lg px-4 py-2 outline-none" />
            </div>
            <div onClick={() => setLoginState(LoginState.LOGIN)} className="hidden md:block cursor-pointer">
                Login
            </div>
            <OverlayContainer show={loginState !== LoginState.HIDDEN}>
                <div onClick={() => setLoginState(LoginState.HIDDEN)} className="w-full h-full bg-black bg-opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white px-8 py-8 rounded-xl">
                    {(() => {
                        switch(loginState) {
                            case LoginState.LOGIN:
                                return <Login handleLogin={handleLogin} waitingForOtp={waitingForOtp} />
                            case LoginState.VERIFY_OTP:
                                return <VerifyOtp handleVerifyOtp={handleVerifyOtp} setLoginState={setLoginState} />
                            case LoginState.SIGNUP:
                                return <div>Sign Up</div>
                            default:
                                return <div>Error</div>
                        }
                    })()}
                </div>
            </OverlayContainer>
            <button className="bg-sm-green text-white rounded py-2 px-4 hidden md:block">
                Cart
            </button>
            <div className="md:hidden fixed left-1/2 bottom-0 w-[95%] px-4 py-2 rounded-xl shadow-lg -translate-y-4 -translate-x-1/2 bg-sm-green text-white">
                View Cart
            </div>
        </div>
    )
}

export default Navbar
