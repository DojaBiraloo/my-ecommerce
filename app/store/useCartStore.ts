import {create} from 'zustand';
import {Product} from '../lib/types'

export type CartItem= Product & {quantity: number} // Cart item ma product ko sabai detail ra quantity hunxa

type CartState ={
    items: CartItem[]  //One piece of data
    addToCart: (product:Product) => void  // product added to cart
    removeFromCart: (id: number) => void // remove from cart
    clearCart: () => void  // clear the cart
}

// Create bhaneko create a store
// useCartStore function banayo, ani zustand le chai aafai euta set bhanera state provide garxa
// items bhaneko chao initial state ho jata chai kei xaina
// aba useCartStore is a hook , jun lie chai different components haru le read garxan from the store


export const useCartStore = create<CartState>((set) => ({
    items: [],

    // Aba add to cart functionality
    // Overall, addToCart bhaneko function that receives clicked products, set(state) bhaneko let me update the store and show me what's in it now, state.items.find bhaneko search the products, existing bhaneko found item, if(existing) bhaneko chai if exist xa bhane quantity badhaune
    addToCart: (product) =>
        set((state) =>{  //state is everyting currently in your store
            const existing = state.items.find((i) => i.id === product.id)  // existing bhaneko euta box, state.items bhaneko chai list of items in a cart ani find bhaneko searches a list and returns first item that matches if not matched then undefined

            if(existing){
                return{
                    items : state.items.map((item) =>
                    item.id === product.id ? {...item, quantity: item.quantity +1} :item
                    )
                }
            }
             // This line is used if the item is not in the cart
                // ...state.items bhaneko aile cart ma bhako sabbai items ani ...product bhaneko product ko sabai details ra increase the quantity by 1
                return {items: [...state.items, {...product, quantity:1}]}
        }),

        removeFromCart: (id) =>
            set((state) => (
                {items: state.items.filter((item) => item.id !== id)} //filter le chai keeps only the items whose id doesnot match, id match bhaeko chai udaidinxa, so returns brand new array
            )),

            clearCart: () => set({
                items:[]
            })
}))

