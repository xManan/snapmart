import { LoginState } from "@/enums"

interface VerifyOtpProps {
    handleVerifyOtp: () => void
    setLoginState: (state: LoginState) => void
}
function VerifyOtp({handleVerifyOtp, setLoginState}: VerifyOtpProps) {
    return (
        <>
            <span onClick={() => setLoginState(LoginState.LOGIN)} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></span>
            <p className="text-lg font-semibold my-4 text-center">Verify OTP</p>
            <div className="flex gap-4">
                <input className='w-12 text-center rounded-xl aspect-square maxlength="1"' type="text"/>
                <input className="w-12 text-center rounded-xl aspect-square" type="text"/>
                <input className="w-12 text-center rounded-xl aspect-square" type="text"/>
                <input className="w-12 text-center rounded-xl aspect-square" type="text"/>
            </div>
            <p className="text-center mt-4">Resend OTP</p>
        </>
    )
}

export default VerifyOtp
