import { PostItem } from "@/type";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const fetchItems = async (headers = {}) => {
  const { data } = await api.get("/items", { headers });
  return data;
};

export const createItem = async (item: PostItem, headers = {}) => {
  const { data } = await api.post("/items", item, { headers });
  return data;
};

export const deleteItem = async (itemId: number, headers = {}) => {
  const { data } = await api.delete(`/items/${itemId}`, { headers });
  return data;
};
