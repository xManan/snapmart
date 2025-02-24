import { Product } from '@/types/product'
import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import useStore from '@/store/global'
import { LoginState } from '@/enums'
interface ProductCardProps {
    product: Product
}
function ProductCard({ product }: ProductCardProps) {
    const userLoggedIn = useStore(state => state.userLoggedIn)
    const setLoginState = useStore(state => state.setLoginState)
    const [unitIdx, setUnitIdx] = useState<number>(0)
    const [qty, setQty] = useState<number>(0)
    const handleAddToCart = () => {
        setQty(prev => prev+1)
    }
    const handleRemoveFromCart = () => {
        setQty(prev => prev-1)
    }
    return (
        <div className="flex flex-col min-w-40 min-h-60 md:min-w-48 md:min-h-72 p-4 rounded-lg shadow-lg border">
            <div className="flex justify-center mb-1">
                <img src="https://placehold.co/200x200" />
            </div>
            <p className="font-bold line-clamp-2">{product.product_name}</p>
            <div className="mt-auto">
                <Dropdown label={product.product_units[unitIdx].quantity + ' ' + product.product_units[unitIdx].unit } inline>
                    {product.product_units.map((unit, idx) => (
                        <Dropdown.Item onClick={() => setUnitIdx(idx)}>{unit.quantity + ' ' + unit.unit}</Dropdown.Item>
                    ))}
                </Dropdown>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 my-2">Rs. {product.product_units[unitIdx].price / 100}</p>
                    { qty > 0
                        ? <div className="border border-sm-green text-sm-green bg-sm-green px-1 py-1 rounded-lg flex">
                            <button onClick={handleRemoveFromCart}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M232-444v-72h496v72H232Z"/></svg></button>
                            <p className='text-white'>{qty}</p>
                            <button onClick={handleAddToCart}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/></svg></button>
                        </div> 
                        : <button onClick={() => userLoggedIn ? handleAddToCart() : setLoginState(LoginState.LOGIN)} className="border border-sm-green text-sm-green bg-green-100 px-4 py-1 rounded-lg cursor-pointer">
                            Add
                        </button> }
                </div>
            </div>
        </div>
    )
}

export default ProductCard
