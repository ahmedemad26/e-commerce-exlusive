'use server'
export async function getProducts(limit = 40) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_UEL}/api/v1/products?limit=${limit}`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText || "Failed To Fetch Products Data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}

export async function getProductsDetails(productId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    if (!response.ok) {
      throw new Error(response.statusText || "Failed To Fetch Products Data");
    }
    const payload = await response.json();
    return payload;
  } catch (error) {
    return { error: error as string };
  }
}
