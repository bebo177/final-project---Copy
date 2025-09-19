export async function getProducts(Limit = 40 ) {
    try {
        const res= await fetch (
            `https://ecommerce.routemisr.com/api/v1/products?limit=${Limit}`,
            {
              cache:"no-cache"
            }
         );

if(!res.ok) throw new Error (res.statusText || 'Failed to fetch products');

    const data = await res.json();
    return data;
    } catch (error) {
        console.log(error);
        return {error: error as string };
    }
 }




 export async function getProductDetails(id: string) {
    try {
        const res= await fetch (
            `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            {
              cache:"no-cache"
            }
         );

if(!res.ok) throw new Error (res.statusText || 'Failed to fetch products');

    const data = await res.json();
    return data;
    } catch (error) {
        console.log(error);
        return {error: error as string };
    }
 }
