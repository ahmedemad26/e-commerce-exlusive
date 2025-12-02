"use client";

import { ICartResponse } from "@/interface/cart.interface";
import { getUserCart } from "@/services/cart.services";
import { createContext, useContext, useEffect, useState } from "react";

// 1) Interface (في الأول فوق)
interface ICartContext {
    cartDetails: ICartResponse | null;
    setCartDetails: (data: ICartResponse | null) => void;
    getCartDetails: () => Promise<void>;
}

// 2) إنشاء الكونتكست (تاني حاجة)
const CartContext = createContext<ICartContext | null>(null);

// 3) Provider (ثالث حاجة وبداخله كل المنطق)
export function CartContextProvider({ children }: { children: React.ReactNode }) {
    // State دايمًا أول حاجة جوه component
    const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);

    // الدوال بعد ال state
    async function getCartDetails() {
        const { data }: { data: ICartResponse } = await getUserCart();
        setCartDetails(data);
    }

    // useEffect بعد الدوال
    useEffect(() => {
        getCartDetails();
    }, []);

    // return آخر حاجة
    return (
        <CartContext.Provider value={{ cartDetails, setCartDetails, getCartDetails }}>
            {children}
        </CartContext.Provider>
    );
}

// 4) hook آخر الملف
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}
