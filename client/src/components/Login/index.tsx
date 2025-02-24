import Logo from '@/components/Logo'
import { LoginState } from '@/enums'
import { useState } from 'react'
import useStore from '@/store/global'

function Login() {
    const setLoginState = useStore(state => state.setLoginState)
    const [waitingForOtp, setWaitingForOtp] = useState<boolean>(false)
    const [mobile, setMobile] = useState<string>('')
    const [error, setError] = useState<string>('')
    const handleLogin = async () => {
        try {
            setWaitingForOtp(true)
            if (mobile.length !== 10) {
                setError('Mobile number should be 10 digits')
                return
            }
            const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + '/api/v1/login', {
                method: 'POST',
                body: JSON.stringify({ mobile }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if(data.success) {
                setLoginState(LoginState.VERIFY_OTP)
                sessionStorage.setItem('mobile', mobile)
            } else {
                setError(data.error.message)
            }
        } catch (error) {
            setError("Unexpected error occured")
        } finally {
            setWaitingForOtp(false)
        }
    }
    return (
        <>
            <span className="text-center text-2xl font-bold"><Logo /></span>
            <p className="text-lg font-semibold my-4 text-center">Login or Sign Up</p>
            <div className="flex items-center border rounded-xl px-4">
                <span>+91</span>
                <input onChange={(e) => { setMobile(e.target.value); setError('') }} className="border-none focus:border-transparent focus:ring-0" maxLength={10} type="text" placeholder="Enter your mobile number" />
            </div>
            { error && <p className="text-sm text-center text-red-500">{error}</p> }
            <button onClick={() => handleLogin()} className={ ` ${mobile.length == 10 ? 'bg-sm-green' : 'bg-gray-500' } text-white rounded-xl py-2 px-4 mt-4 mx-16` } disabled={mobile.length != 10}>
                { waitingForOtp ? '...' : 'Continue' } 
            </button>
        </>
    )
}

export default Login
