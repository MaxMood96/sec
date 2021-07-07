import fetch from "axios";
// @ts-ignore
import BUILD_ID from "../BUILD_ID.txt";

const origin = "https://layer0-docs-layer0-examples-api-default.layer0.link";

function cleanPath(path: string) {
  return path.replace(/^\//, "");
}

function getApiUrl(path: string) {
  if (typeof window === "undefined") {
    return `${origin}/${cleanPath(path)}`;
  }

  return location.protocol + "//" + location.host + getApiPath(path);
}

export function getOptimizedImageUrl(path: string) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    origin + path
  )}`;
}

export function getApiPath(path: string) {
  return `/api/${BUILD_ID}/${cleanPath(path)}`;
}

/**
 * Gets all categories
 *
 * @return {Object}
 */
export async function getCategories() {
  const res = await fetch(getApiUrl("/category"));
  return res.data;
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getProductsByCategory(categoryName: any) {
  const res = await fetch(getApiUrl(`/category/${categoryName}`));

  const products = res.data;
  products.forEach(
    (item: any) => (item.picture = getOptimizedImageUrl(item.picture))
  );

  return products;
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(productId: any) {
  const res = await fetch(getApiUrl(`/product/${productId}`));
  const product = res.data;
  product.picture = getOptimizedImageUrl(product.picture);

  return product;
}
