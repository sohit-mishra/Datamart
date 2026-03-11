import productService from "../services/product.service.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

export const getProducts = asyncHandler(async (req, res) => {

  const products = await productService.getProducts()

  return res
    .status(HTTP_STATUS.OK)
    .json(
      apiResponse.success(
        products,
        "Products fetched successfully"
      )
    )

})

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
   
    const product = await productService.getProductById(id);

    return res
        .status(HTTP_STATUS.OK)
        .json(apiResponse.success(product, "Product fetched successfully"));
});



export const createProduct = asyncHandler(async (req, res) => {
    const productData = {
      ...req.body,
      owner_id: req.user.id
    }
    const product = await productService.createProduct(productData);

    return res
        .status(HTTP_STATUS.CREATED)
        .json(apiResponse.success(product, "Product created"));
});



export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await productService.updateProduct(id, req.body);

    return res
        .status(HTTP_STATUS.OK)
        .json(apiResponse.success(product, "Product updated"));
});



export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await productService.deleteProduct(id);

    return res
        .status(HTTP_STATUS.OK)
        .json(apiResponse.success(null, "Product deleted"));
});