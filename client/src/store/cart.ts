import { create } from 'zustand'

interface ProductItem {
    product_id: number,
    product_name: string,
	product_unit_id: number
	quantity: number
	unit: string
	price: number
    cart_qty: number
}

type CartStore = {
    items: ProductItem[]
    addItem: (state: ProductItem) => void
}

const useCartStore = create<CartStore>()((set) => ({
    items: [],
    addItem: (item: ProductItem) => set((state) => ({ items: [...state.items, item] })),
}))

export default useCartStore
