import Product from "../models/product.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts =
      await Product.countDocuments({
        user: req.user.id,
      });

    const categories =
      await Product.distinct(
        "category",
        {
          user: req.user.id,
        }
      );

    const totalCategories =
      categories.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const productsAddedToday =
      await Product.countDocuments({
        user: req.user.id,
        createdAt: {
          $gte: today,
        },
      });

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