export async function getCategories(){
    try {
        const res= await fetch (
            `https://ecommerce.routemisr.com/api/v1/categories`,
         );

if(!res.ok) throw new Error (res.statusText || 'Failed to fetch categories');

    const data = await res.json();
    return data;
    } catch (error) {
        console.log(error);
        return {error: error as string };
    }
 }


export async function getCategoryDetailsById(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (!res.ok) throw new Error(res.statusText || 'Failed to fetch category details');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
