// services/brands.service.ts
export async function getBrandDetailsById(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (!res.ok) throw new Error(res.statusText || 'Failed to fetch brand details');
    const data = await res.json();
    return data; // { data: {...brand} }
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
