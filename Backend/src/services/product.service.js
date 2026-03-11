import { productRepository } from "../repositories/index.repository.js";
import { cacheService } from "../cache/cache.service.js";
import { CACHE_KEYS } from "../cache/cache.keys.js";

const getProducts = async () => {
  const cacheKey = CACHE_KEYS.PRODUCTS_LIST
  const cached = await cacheService.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const products = await productRepository.getProducts()
  await cacheService.set(
    cacheKey,
    JSON.stringify(products),
    300
  )
  return products
}

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  return product;
};

const createProduct = async (data) => {
  const product = await productRepository.createProduct(data);
  return product;
};

const updateProduct = async (id, data) => {
  const product = await productRepository.updateProduct(id, data);
  return product;
};

const deleteProduct = async (id) => {
  await productRepository.deleteProduct(id);
  return true;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};