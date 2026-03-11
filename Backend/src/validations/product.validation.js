import { z } from "zod"

const productSchema = z.object({

  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  category: z
    .string()
    .min(2, "Category is required"),

  brand: z
    .string()
    .min(2, "Brand is required"),

  stock: z
    .number()
    .int()
    .nonnegative("Stock must be 0 or greater"),

  images: z
    .array(z.string().url())
    .min(1, "At least one image is required"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  currency: z
    .string()
    .default("$")

})

export default productSchema