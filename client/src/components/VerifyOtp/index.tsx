import { LoginState } from "@/enums"
import React, { useEffect, useRef, useState } from "react"
import useStore from '@/store/global'

function VerifyOtp() {
    const setLoginState = useStore(state => state.setLoginState)
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', ''])
    const [waitingForVerificaton, setWaitingForVerificaton] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement[]>([])
    const [error, setError] = useState<string>('')
    const RESEND_OTP_SECONDS = 30
    const [resendOtpSeconds, setResendOtpSeconds] = useState<number>(RESEND_OTP_SECONDS)
    const handleVerifyOtp = async () => {
        try {
            setWaitingForVerificaton(true)
            console.log(sessionStorage.getItem('mobile'))
            const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + '/api/v1/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ 
                    otp: otpValues.join(''),
                    mobile: sessionStorage.getItem('mobile') 
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                if (data.data.intent === 'LOGIN') {
                    window.location.reload()
                } else if (data.data.intent === 'SIGNUP') {
                    setLoginState(LoginState.SIGNUP)
                }
            } else {
                setError(data.error.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setWaitingForVerificaton(false)
        }
    }
    const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setError('')
        const value = e.currentTarget.value
        const newOtpValues = [...otpValues]
        newOtpValues[index] = value
        setOtpValues(newOtpValues)
    }
    useEffect(() => {
        if (otpValues.every(value => value !== '')) {
            handleVerifyOtp()
        }
    }, [otpValues])
    useEffect(() => {
        const interval = setInterval(() => {
            setResendOtpSeconds(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval)
    }, [])
    return (
        <div className="relative">
            <span onClick={() => setLoginState(LoginState.LOGIN)} className="cursor-pointer absolute"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></span>
            <p className="text-lg font-semibold my-4 text-center">Verify OTP</p>
            <div className="flex gap-4">
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        ref={el => inputRef.current[index] = el!}
                        value={value}
                        onChange={e => handleOtpChange(e, index)}
                        className={`${error && 'border-red-500'} w-12 text-center rounded-xl aspect-square`}
                        maxLength={1}
                        type="text"
                    />
                ))}
            </div>
            {resendOtpSeconds === 0 ? <p className="text-center m-4 text-sm-green hover:underline cursor-pointer">Resend OTP</p> : <p className="text-center m-4 text-gray-500">{waitingForVerificaton ? '...' : `Resend OTP (in ${resendOtpSeconds} seconds)`}</p>}
            {error && <p className="absolute text-sm text-center text-red-500 bg-red-100 w-full rounded-xl">{error}</p>}
        </div>
    )
}

export default VerifyOtp
