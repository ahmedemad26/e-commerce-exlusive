import AddToCart from "@/app/_components/products/AddToCart";
import ProductSlider from "@/app/_components/products/ProductSlider";
import { getProductsDetails } from "@/services/products";
import { Heart, RotateCcw, Star, Truck } from "lucide-react";

export default async function ProductsDetails({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  console.log(productId)
  const { data: product } = await getProductsDetails(productId);
  console.log('product', product)
  return (
    <section className="py-20">
      <div className="container mx-auto px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="font-semibold text-2xl mb-4">{product.title}</h1>
            <div className="flex items-center gap-x-1 mb-4">
              <Star className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-500">
                {product.ratingsAverage}
              </span>
            </div>
            <span className="text-2xl mb-6 block">{product.price} EGP</span>
            <p className="text-sm border-b border-b-gray-400 pb-6 mb-6 ">
              {product.description}
            </p>
            <div className="flex items-center gap-3">

              <AddToCart productId={productId} variant={"destructive"} className='grow-1' />


              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart className="size-5 text-gray-700 cursor-pointer" />
              </button>
            </div>


            <div className="border border-gray-300 rounded-sm mt-8">

              {/* Free Delivery */}
              <div className="flex items-start gap-4 p-5">
                <Truck className="w-8 h-8 text-black" />
                <div>
                  <h3 className="font-semibold text-lg">Free Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Return Delivery */}
              <div className="flex items-start gap-4 p-5">
                <RotateCcw className="w-8 h-8 text-black" />
                <div>
                  <h3 className="font-semibold text-lg">Return Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
