export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_UEL}/api/v1/categories`
    );
    if (!response.ok) {
      throw new Error(response.statusText || "Failed To Fetch Categories Data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
