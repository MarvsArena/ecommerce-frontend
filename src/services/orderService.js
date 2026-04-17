import api from "./api";

export const createOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const getUserOrders = async () => {
  const { data } = await api.get("/orders/user");
  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const updateOrderStatus = async (id, payload) => {
  const { data } = await api.put(`/orders/${id}`, payload);
  return data;
};
