import axiosInstance from "../api/axios";

export const foodService = {
  // Get all foods
  getAllFoods: async () => {
    return await axiosInstance.get("/foods");
  },

  // Get food by id
  getFoodById: async (id) => {
    return await axiosInstance.get(`/foods/${id}`);
  },

  // Create food
  createFood: async (food, image) => {
    const formData = new FormData();

    const foodData = {
      foodName: food.foodName,
      description: food.description,
      price: Number(food.price),
      available: food.available,
    };

    formData.append(
      "food",
      new Blob([JSON.stringify(foodData)], {
        type: "application/json",
      }),
    );

    if (image) {
      formData.append("image", image);
    }

    return await axiosInstance.post("/foods/admin", formData);
  },

  // Update food
  updateFood: async (id, food, image) => {
    const formData = new FormData();

    const foodData = {
      foodName: food.foodName,
      description: food.description,
      price: Number(food.price),
      available: food.available,
    };

    formData.append(
      "food",
      new Blob([JSON.stringify(foodData)], {
        type: "application/json",
      }),
    );

    if (image) {
      formData.append("image", image);
    }

    return await axiosInstance.put(`/foods/admin/${id}`, formData);
  },

  // Delete food
  deleteFood: async (id) => {
    return await axiosInstance.delete(`/foods/admin/${id}`);
  },
};
