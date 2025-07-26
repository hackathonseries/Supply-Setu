const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    suppliers: [
        {
            supplier: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Supplier",
            },
            stock: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
            },
            images: [
                 {
                    url: {
                        type: String,
                        required: true, // Image URL is required
                    },
                    fileId: {
                        type: String, // ImageKit file ID for easier management
                        required: true,
                    },
                },
            ]
        },
    ],
});

module.exports = mongoose.model("Product", productSchema);