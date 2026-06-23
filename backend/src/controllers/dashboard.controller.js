import Product from "../models/product.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const categories =
      await Product.distinct("category");

    console.log("Categories:", categories);

    const totalCategories =
      categories.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const productsAddedToday =
      await Product.countDocuments({
        createdAt: { $gte: today },
      });

    console.log(
      "Products Added Today:",
      productsAddedToday
    );

    res.json({
      totalProducts,
      totalCategories,
      productsAddedToday,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};