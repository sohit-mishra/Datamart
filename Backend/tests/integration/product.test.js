import request from "supertest";
import app from "../../src/app.js";

describe("Product API", () => {
  test("GET /products should return products", async () => {
    const res = await request(app)
      .get("/api/v1/products");
    expect(res.statusCode).toBe(200);
  });

});