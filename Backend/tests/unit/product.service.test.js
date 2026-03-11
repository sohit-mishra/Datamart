import productService from "../../src/services/product.service.js";

describe("Product Service", () => {
    test("should fetch products", async () => {
        const products = await productService.getProducts(1);
        expect(products).toBeDefined();
    });

});