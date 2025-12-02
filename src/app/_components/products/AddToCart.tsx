'use client'

import { Button } from '@/components/ui/button'
import { addToCart } from '@/services/cart.services';
import React from 'react'
import { toast } from 'sonner';
import type { ComponentProps } from "react";
import { useCart } from '@/context/CartContext';

type AddToCartProps = {
    productId: string;
} & ComponentProps<typeof Button>;

export default function AddToCart({ productId, ...props }: AddToCartProps) {
    const { getCartDetails } = useCart()
    async function addProductToCart(productId: string) {
        const res = await addToCart(productId);
        if (res?.message) {
            toast.success('Product added to cart successfully', { position: 'top-center' });
            getCartDetails();
        } else {
            toast.error(res?.message || 'Failed to add product to cart', { position: 'top-center' });
        }
    }
    return (
        <Button onClick={() => addProductToCart(productId)} {...props}>
            Add To Cart
        </Button>
    )
}
