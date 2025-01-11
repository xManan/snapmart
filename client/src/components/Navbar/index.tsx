import Logo from '@/components/Logo'

function Navbar() {
    return (
        <div className="sticky top-0 w-full bg-white flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center p-4 border-b z-10">
            <div className="text-4xl font-bold hidden md:block">
                <Logo />
            </div>
            <div className="relative flex justify-between items-center w-full md:w-auto">
                <div className="flex flex-col">
                    <p className="text-md font-semibold whitespace-nowrap">Delivery in 13 minutes</p>
                    <p className="text-sm whitespace-nowrap">Sonipat, Haryana, India</p>
                </div>
                <div className="md:hidden">
                    Login
                </div>
            </div>
            <div className="flex-grow w-full md:w-auto">
                <input type="text" placeholder="Search" className="w-full border rounded-lg px-4 py-2" />
            </div>
            <div className="hidden md:block">
                Login
            </div>
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
