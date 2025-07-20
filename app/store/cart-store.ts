import { create } from "zustand"
// import { PRODUCTS } from "../../assets/products"  //comment for admin use

type CartItemType = {
    id: number
    title: string
    // image: any   //comment for admin use
    heroImage:string
    price: number
    quantity: number
    maxQuantity: number//added for admin use
}
type CartState = {
    items: CartItemType[]
    addItem: (item: CartItemType) => void
    removeItem: (id: number) => void
    incrementItem: (id: number) => void
    decrementItem: (id: number) => void
    getTotalPrice: () => string
    getItemCount: () => number
    resetCart: () => void
}

const initialCartItems: CartItemType[] = []

export const useCartStore = create<CartState>((set, get) => ({
    items: initialCartItems,
    addItem: (item: CartItemType) => {
        const existingItem = get().items.find(i => i.id === item.id)
        if (existingItem) {
            set(state => ({
                items: state.items.map(i => (i.id === item.id ? {
                    ...i,
                    quantity: Math.min(
                        i.quantity + item.quantity + i.maxQuantity,   // i.maxQuantity added for admin use
                        // PRODUCTS.find(p => p.id === item.id)?.maxQuantity || i.quantity  //comment for admin use
                    )
                } : i))
            }))
        } else {
            set(state => ({ items: [...state.items, item] }))
        }
    },
    removeItem: (id: number) => set(state => ({ items: state.items.filter(item => item.id !== id) })),

    incrementItem: (id: number) => set(state => {
        // const product = PRODUCTS.find(p => p.id === id) //comment for admin use
        // if (!product) return state  //comment for admin use
        return {
            items: state.items.map(item => 
                item.id === id && item.quantity < item.maxQuantity  // product.maxQuantity replace to item.maxQuantity for admin use
                 ? { ...item, quantity: item.quantity + 1 } : item)
        }
    }),

    decrementItem: (id: number) => set(state => ({
        items: state.items.map(item => item.id === id && item.quantity>1 ? { ...item, quantity: item.quantity - 1 } : item),
    })),

    getTotalPrice: () => {
        const {items } =get()
        return items.reduce((total,item)=>total+item.price*item.quantity,0).toFixed(2)
    },
    getItemCount: () => {
        const { items } =get()
        return items.reduce((count,item)=>count+item.quantity,0)
    },
    resetCart: () => set({ items: initialCartItems })  // added for admin use
}))
