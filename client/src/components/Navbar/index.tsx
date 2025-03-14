import Logo from '@/components/Logo'
import { Link } from 'react-router-dom'
import OverlayContainer from '@/components/OverlayContainer'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import VerifyOtp from '@/components/VerifyOtp'
import { LoginState } from '@/enums'
import useStore from '@/store/global'
import useCartStore from '@/store/cart'
import { useState } from 'react'
import { logoutService } from '@/lib/services'

function Navbar() {
    const userLoggedIn = useStore(state => state.userLoggedIn)
    const loginState = useStore(state => state.loginState)
    const setLoginState = useStore(state => state.setLoginState)
    const cartItems = useCartStore(state => state.items)
    const getTotalItems = useCartStore(state => state.getTotalItems)
    const [showAccountDropdown, setShowAccountDropdown] = useState(false)
    const ViewAccountBtn = () => {
        return ( <button onClick={() => setShowAccountDropdown(!showAccountDropdown)} className='flex'>Account <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg></button> )
    }
    const handleLogout = async () => {
        try {
            await logoutService()
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
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
                <div className="md:hidden cursor-pointer">
                    { userLoggedIn ? <ViewAccountBtn /> : <span onClick={() => setLoginState(LoginState.LOGIN)}>Login</span> }
                </div>
            </div>
            <div className="flex-grow w-full md:w-auto">
                <input type="text" placeholder="Search" className="w-full border rounded-lg px-4 py-2 outline-none" />
            </div>
            <div className="hidden md:block cursor-pointer">
                { userLoggedIn ? <ViewAccountBtn /> : <span onClick={() => setLoginState(LoginState.LOGIN)}>Login</span> }
            </div>
            <OverlayContainer show={loginState !== LoginState.HIDDEN}>
                <div onClick={() => setLoginState(LoginState.HIDDEN)} className="w-full h-full bg-black bg-opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white px-8 py-8 rounded-xl">
                    {(() => {
                        switch(loginState) {
                            case LoginState.LOGIN:
                                return <Login />
                            case LoginState.VERIFY_OTP:
                                return <VerifyOtp />
                            case LoginState.SIGNUP:
                                return <Signup />
                            default:
                                return <div>Error</div>
                        }
                    })()}
                </div>
            </OverlayContainer>
            <div className={ (showAccountDropdown ? 'scale-100 ' : 'scale-0 ') + `absolute top-20 right-8 w-48 origin-top transition-transform duration-200 bg-white shadow-lg rounded-lg` }>
                <button className="w-full py-2 px-4 text-left hover:text-sm-green">Orders</button>
                <button className="w-full py-2 px-4 text-left hover:text-sm-green">Profile</button>
                <button onClick={handleLogout} className="w-full py-2 px-4 text-left hover:text-sm-green">Logout</button>
             </div>
            <button onClick={() => !userLoggedIn && setLoginState(LoginState.LOGIN) } className="bg-sm-green text-white rounded py-2 px-4 hidden md:block">
                { cartItems.length > 0 ? getTotalItems() + (getTotalItems() == 1 ? ' item' : ' items') : 'Cart' }
            </button>
            {cartItems.length > 0 && <div className="md:hidden fixed left-1/2 bottom-0 w-[95%] px-4 py-2 rounded-xl shadow-lg -translate-y-4 -translate-x-1/2 bg-sm-green text-white cursor-pointer flex justify-between">
                <div>{getTotalItems() + (getTotalItems() == 1 ? ' item' : ' items') }</div>
                <div>View Cart</div>
            </div>}
        </div>
    )
}

export default Navbar
