'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCart } from "@/context/CartContext";
import { removeFromCart, removeUserCart, updateQuantityCart } from "@/services/cart.services";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
export default function CartPage() {

  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItems() {
    const res = await removeUserCart();
    console.log('res', res)
    if (res?.message === 'success') {
      toast.success('Cart items removed successfully');
      setCartDetails(res.data);
    } else {
      toast.error(res?.message || 'Failed to remove cart items');
    }
  }


  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    console.log(res.data)
    if (res.success) {
      toast.success(res.message, { position: 'top-center' });
      setCartDetails(res.data);
    } else {
      toast.error(res?.message, { position: 'top-center' });
    }
  }


  async function updateQuantityProductInCart(productId: string, count: number) {
    const res = await updateQuantityCart(productId, count);
    if (res.success) {
      toast.success(res.message, { position: 'top-center' });
      setCartDetails(res.data);
    } else {
      toast.error(res?.message, { position: 'top-center' });
    }
  }
  return <section className="py-20">
    <div className="container mx-auto px-20">
      {cartDetails ?

        <>
          <section className="mb-20">

            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">SubTotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  cartDetails.data.products.map((product) =>
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">

                        <div className="flex items-center gap-5 relative">
                          <Badge onClick={() => removeProductFromCart(product.product._id)}
                            className="absolute -top-0.5 -start-0.5 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums bg-red-600 text-white cursor-pointer"
                          >
                            <X className="size-4 cursor-pointer" />
                          </Badge>

                          <Image src={product.product.imageCover} alt={product.product.title} width={54} height={54} />
                          <h2>{product.product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell >
                        <div className="flex items-center justify-center gap-4">
                          <Button size="sm" variant={"outline"} className="cursor-pointer" onClick={() => updateQuantityProductInCart(product.product._id, product.count - 1)}>-</Button>
                          <span>{product.count}</span>
                          <Button size="sm" variant={"outline"} className="cursor-pointer" onClick={() => updateQuantityProductInCart(product.product._id, product.count + 1)}>+</Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.price * product.count}</TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>

            <div className="flex justify-between items-center">
              <Button variant={"outline"}>
                <Link href={'/products'}>Return to Shop</Link>
              </Button>
              <Button onClick={removeCartItems} variant={"destructive"} className="cursor-pointer">
                Remove All
              </Button>
            </div>
          </section>
          <section className="flex justify-between items-center">
            <div className="flex gap-4  items-center w-5/12">
              <Input placeholder="Enter coupon code" />
              <Button variant={"destructive"}>
                Apply Coupon
              </Button>
            </div>

            <div className="w-5/12 py-8 px-6 border border-gray-950">
              <h3 className="font-bold text-xl mb-6">Cart Total</h3>
              <ul className="divide-y divide-gray-950">
                <li className="py-6 flex justify-between ">
                  <span>SubTotal :</span> <span>{cartDetails.data.totalCartPrice}</span>
                </li>
                <li className="py-6 flex justify-between ">
                  <span>Shipping :</span> <span>Free</span>
                </li>
                <li className="py-6 flex justify-between ">
                  <span>Total :</span> <span>{cartDetails.data.totalCartPrice}</span>
                </li>
              </ul>
              <div className="flex justify-center">
                <Button variant={"destructive"} asChild><Link href={'/check-out'}>Proceed to Checkout</Link></Button>
              </div>
            </div>
          </section>
        </>
        :
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-2xl font-bold">No cart items found</h1>
          <Link href={'/products'}>Return to Shop</Link>
        </div>
      }
    </div>
  </section>;
}
