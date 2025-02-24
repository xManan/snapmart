import { useState } from 'react'
import InputWithErr from '../InputWithErr'


function Signup() {
    const [waitingForRes, setWaitingForRes] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const handleLogin = async () => {
        try {
            setWaitingForRes(true)
            setError('')
            const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + '/api/v1/signup', {
                method: 'POST',
                body: JSON.stringify({ 
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "mobile": sessionStorage.getItem('mobile')
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })
            const data = await res.json()
            if(data.success) {
                window.location.reload()
            } else {
                setError(data.error.message)
            }
        } catch (error) {
            setError("Unexpected error occured")
        } finally {
            setWaitingForRes(false)
        }
    }
    return (
        <>
            <p className="text-lg font-semibold mb-4 text-center">Enter your details</p>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col gap-6 md:flex-row">
                    <InputWithErr error={""} onChange={(e) => { setFirstName(e.target.value); setError('') }} placeholder="First Name" />
                    <InputWithErr error={""} onChange={(e) => { setLastName(e.target.value); setError }} placeholder="Last Name" />
                </div>
                <input onChange={(e) => { setEmail(e.target.value); setError('') }} className="rounded-xl" maxLength={50} type="email" placeholder="Email (optional)" />
            </div>
            <button onClick={() => handleLogin()} className={ ` ${firstName.length > 1 && lastName.length > 1 ? 'bg-sm-green' : 'bg-gray-500' } text-white rounded-xl py-2 px-4 mt-4 mx-16` } disabled={!(firstName.length > 1 && lastName.length > 1)}>
                { waitingForRes ? '...' : 'Sign Up' } 
            </button>
            {error && <p className="absolute bottom-0 left-0 text-sm text-center text-red-500 bg-red-100 w-full rounded-xl">{error}</p>}
        </>
    )
}

export default Signup
