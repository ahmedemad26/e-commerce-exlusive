import { getProducts } from "@/services/products";
import { IProduct } from "@/interface/products.interface";
import ProductsItem from "@/app/_components/products/ProductsItem";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  return (
    <section className="py-10 px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-8 gap-y-16 mb-15">
          {products &&
            products.map((product) => (
              <ProductsItem key={product._id} product={product} />
            ))}
        </div>

        {/* Pagination */}
      </div>
    </section>
  );
}
