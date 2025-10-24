export async function fetchProducts() {
  const res = await fetch("http://localhost:3000/products");
  if (!res.ok) throw new Error("Error al obtener productos");
  const data = await res.json();
  return data.payload;
}

export async function fetchProductById(id) {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  const data = await res.json();
  return data.payload;
}
