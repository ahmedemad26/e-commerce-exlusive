import { getProducts } from "@/services/products";
import Title from "../shared/title";
import { IProduct } from "@/interface/products.interface";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsItem from "../products/ProductsItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);
  return (
    <section className="py-10 px-20">
      <div className="container mx-auto">
        <Title tittle="Our Products" subTittle="Explore Our Products" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-8 gap-y-16 mb-15">
          {products &&
            products.map((product) => <ProductsItem key={product._id} product={product} />)}
        </div>

        <div className="flex justify-center">
          <Button variant="destructive" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
