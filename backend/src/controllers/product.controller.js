import Product from "../models/product.model.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      sort,
      page = 1,
    } = req.query;

    const query = {
      user: req.user.id,
    };

    if (search) {
      query.productName = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort({
        price: sort === "desc" ? -1 : 1,
      })
      .skip(skip)
      .limit(limit);

    const totalProducts =
      await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(
        totalProducts / limit
      ),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (
  req,
  res
) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};