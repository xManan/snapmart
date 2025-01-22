import { Product } from '@/types/product'
import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
interface ProductCardProps {
    product: Product
}
function ProductCard({ product }: ProductCardProps) {
    const [unitIdx, setUnitIdx] = useState<number>(0)
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
                    <button className="border border-sm-green text-sm-green bg-green-100 px-4 py-1 rounded-lg">Add</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
