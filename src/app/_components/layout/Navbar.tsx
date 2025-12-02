"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const { data: session, status } = useSession();

  const { cartDetails } = useCart();
  console.log('cartDetails', cartDetails)
  return (
    <section className="py-4">
      <div className="container mx-auto px-20">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathName === link.path && "underline"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <span>Loading</span>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login"> Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/">{session?.user?.name}</Link>
                <Link className="relative" href={'/wishlist'}>
                  <Badge
                    className="absolute -top-2 -end-2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
                    variant="destructive"
                  >
                    99
                  </Badge>
                  <Heart className="size-8" />
                </Link>


                <Link className="relative" href={'/cart'}>
                  {cartDetails && <Badge
                    className="absolute -top-2 -end-2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
                    variant="destructive"
                  >
                    {cartDetails?.numOfCartItems}
                  </Badge>}
                  <ShoppingCart className="size-8" />
                </Link>


                <DropdownMenu>
                  <DropdownMenuTrigger><User className="size-8 cursor-pointer" /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={'profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })} className="cursor-pointer">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      FreshCart
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-5">
                {links.map((link, index) => (
                  <Link
                    href={link.path}
                    key={index}
                    className={`font-medium ${pathName === link.path ? "text-red-500" : ""
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <span>Loading</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login"> Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/">{session?.user?.name}</Link>
                      <div className="flex items-center gap-4">

                        <Link className="relative" href={'wishlist'}>
                          <Badge
                            className="absolute -top-2 -end-2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            99
                          </Badge>
                          <Heart className="size-8" />
                        </Link>


                        <Link className="relative" href={'cart'}>
                          {cartDetails && <Badge
                            className="absolute -top-2 -end-2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            {cartDetails?.numOfCartItems}
                          </Badge>}
                          <ShoppingCart className="size-8" />
                        </Link>


                        <DropdownMenu>
                          <DropdownMenuTrigger><User className="size-8" /></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={'profile'}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })} className="cursor-pointer">Logout</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                      </div>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
