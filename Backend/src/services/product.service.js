import { productRepository } from "../repositories/index.repository.js";

const getProducts = async () => {
  const products = await productRepository.getProducts()
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