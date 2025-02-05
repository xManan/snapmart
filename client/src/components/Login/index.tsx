import Logo from '@/components/Logo'

export interface LoginProps {
    waitingForOtp: boolean
    handleLogin: () => void
}

function Login({waitingForOtp, handleLogin}: LoginProps) {
    return (
        <>
            <p className="text-center text-2xl font-bold"><Logo /></p>
            <p className="text-lg font-semibold my-4 text-center">Login or Sign Up</p>
            <div className="flex items-center border rounded-xl px-4">
                <span>+91</span>
                <input className="border-none focus:border-transparent focus:ring-0" type="text" placeholder="Enter your mobile number" />
            </div>
            <button onClick={() => handleLogin()} className="bg-sm-green text-white rounded-xl py-2 px-4 mt-4 mx-16">
                { waitingForOtp ? '...' : 'Continue' } 
            </button>
        </>
    )
}

export default Login
