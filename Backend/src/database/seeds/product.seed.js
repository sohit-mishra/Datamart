import supabase from "../../config/supabase.config.js";
import logger from "../../utils/logger.js";

const products = [
  {
    name: "Laptop",
    description: "High performance laptop",
    price: 900
  },
  {
    name: "Smartphone",
    description: "Latest smartphone",
    price: 600
  }
];

export const seedProducts = async () => {
  const { error } = await supabase
    .from("products")
    .insert(products);

  if (error) {
    logger.error("Seed failed", error);
    return;
  }

  logger.info("Products seeded successfully");
};