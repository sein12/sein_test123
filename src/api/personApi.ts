import axios from "axios";
import type { Person, Filters } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://your-backend-url.com",
  headers: { "Content-Type": "application/json" },
});

export const fetchPersons = async (
  filters: Filters,
  page: number,
  pageSize: number = 10
) => {
  const response = await axiosInstance.get("/persons", {
    params: { page, pageSize, ...filters },
  });
  return response.data as { items: Person[]; totalPages: number };
};

export const createPerson = async (person: Omit<Person, "id">) => {
  const response = await axiosInstance.post("/persons", person);
  return response.data as Person;
};

export const fetchPersonById = async (id: string) => {
  const response = await axiosInstance.get(`/persons/${id}`);
  return response.data as Person;
};

export const updatePerson = async (id: string, updates: Partial<Person>) => {
  const response = await axiosInstance.put(`/persons/${id}`, updates);
  return response.data as Person;
};

export const deletePerson = async (id: string) => {
  await axiosInstance.delete(`/persons/${id}`);
};
