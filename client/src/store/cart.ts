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
    addItem: (item: ProductItem) => void
    removeItem: (itemUnitId: number) => void
    getTotalItems: () => number
}

const useCartStore = create<CartStore>()((set, get) => ({
    items: [],
    addItem: (item: ProductItem) => set((state) => {
        if(state.items.findIndex(i => i.product_unit_id === item.product_unit_id) === -1) {
            return { items: [...state.items, item] }
        }
        return { items: state.items.map(i => i.product_unit_id === item.product_unit_id ? { ...i, cart_qty: i.cart_qty + 1 } : i) }
    }),
    removeItem: (itemUnitId: number) => set((state) => {
        if(state.items.findIndex(i => i.product_unit_id === itemUnitId) === -1) {
            return { items: state.items }
        }
        if(state.items.find(i => i.product_unit_id === itemUnitId)?.cart_qty === 1) {
            return { items: state.items.filter(i => i.product_unit_id !== itemUnitId) }
        }
        return { items: state.items.map(i => i.product_unit_id === itemUnitId ? { ...i, cart_qty: i.cart_qty - 1 } : i) }
    }),
    getTotalItems: () => get().items.reduce((acc, item) => acc + item.cart_qty, 0)
}))

export default useCartStore
