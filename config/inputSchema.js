const ApiPrefix = "/api/user"

function getInputSchema(path, method) {
    if (method === "put" && path === `${ApiPrefix}/register`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                firstname: { type: "string", example: "Tim" },
                                lastname: { type: "string", example: "Brown" },
                                password: { type: "string", example: "SecurePassword123" },
                                email: { type: "string", example: "tim@gmail.com" },
                            },
                            required: ["firstname", "lastname", "password", "email"],
                        },
                    },
                },
            },
        };
    }

    if (method === "post" && path === `${ApiPrefix}/login`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "tim@gmail.com" },
                                password: { type: "string", example: "SecurePassword123!" },
                            },
                            required: ["email", "password"],
                        },
                    },
                },
            },
        };
    }

    // Update Profile
    if (method === "patch" && path === `${ApiPrefix}/update-profile`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                firstname: { type: "string" },
                                lastname: { type: "string" },
                                email: { type: "string" }
                            },
                        }
                    }
                }
            }
        }
    }

    // Create new address
    if (method === "put" && path === `${ApiPrefix}/create-address`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                address_line: { type: "string" },
                                city: { type: "string" },
                                state: { type: "string" },
                                country: { type: "string" },
                                zipcode: { type: "string" },
                                phone: { type: "string" },
                            },
                            required:["address_line", "city", "state", "country", "zipcode", "phone"]
                        }
                    }
                }
            }
        }
     }

      // Create new category
    if (method === "post" && path === `/api/categories/create`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                status: { type: "string" },
                            },
                            required: ["name", "status"],
                        }
                    }
                }
            }
        }
     }

     // Update existing category
     if (method === "post" && path === `/api/categories/edit/:id`) {
        return {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "The ID of the category to edit",
                    schema: {
                        type: "string",
                        example: "63f8c76e4e7f4567890abcd1",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                status: { type: "string" },
                            },
                            required: ["name", "status"],
                        }
                    }
                }
            }
        }
     }

     // Add item to cart
     if (method === "put" && path === `/api/cart/add`) {
        return {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                product_id: { type: "string" },
                                quantity: { type: "string" },
                            },
                            required: ["product_id", "quantity"],
                        }
                    }
                }
            }
        }
     }

     // Create new product
     if (method === "post" && path === `/api/products/create`) {
        return {
            parameters: [],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                files: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary", // Specify that files are binary data
                                    },
                                    description: "An array of image files (JPEG, PNG, JPG)",
                                },
                                name: { type: "string", example: "New Product" },
                                price: { type: "string", example: "1000" },
                                description: { type: "string", example: "A short description of the product" },
                                quantity: { type: "integer", example: 10 },
                                status: { type: "string", example: "available" },
                                category_id: { type: "string", example: "63f8c76e4e7f4567890abcd1" },
                            },
                            required: ["files", "name", "price", "description", "quantity", "status", "category_id"],
                        },
                    },
                },
            },
        };
    }

    // Update product
    if (method === "post" && path === `/api/products/edit/:id`) {
        return {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "The ID of the product to update",
                    schema: { type: "string", example: "63f8c76e4e7f4567890abcd1" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                images: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    description: "An array of image files (JPEG, PNG, JPG)",
                                },
                                replacedImageIds: {
                                    type: "array",
                                    items: { type: "string", example: "oldImageId123" },
                                    description: "IDs of images to be replaced",
                                },
                                name: { type: "string", example: "Updated Product Name" },
                                price: { type: "string", example: "2000" },
                                description: { type: "string", example: "Updated product description" },
                                quantity: { type: "integer", example: 5 },
                                status: { type: "string", example: "available" },
                                category_id: { type: "string", example: "63f8c76e4e7f4567890abcd1" },
                                
                            },
                            required: [
                                "name",
                                "price",
                                "description",
                                "quantity",
                                "status",
                                "category_id",
                                "images",
                                "replacedImageIds",
                            ],
                        },
                    },
                },
            },
        };
    }
    
    

    // Handle paths with parameters dynamically
    const pathMatch = path.match(/\/([^\/]+)$/); // Match the last segment of the path
    if (path.includes("/:id")) {
        const id = pathMatch ? pathMatch[1] : ":id"; // Extract the actual value if available
        return {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "The ID of the resource",
                    schema: { type: "string", example: id },
                },
            ],
        };
    }

    if (path.includes("/:name")) {
        const name = pathMatch ? pathMatch[1] : ":name";
        return {
            parameters: [
                {
                    name: "name",
                    in: "path",
                    required: true,
                    description: "The Name of the resource",
                    schema: { type: "string", example: name },
                },
            ],
        };
    }


    return {};
}

module.exports = { getInputSchema }