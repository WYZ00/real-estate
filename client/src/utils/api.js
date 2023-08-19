import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residencies");
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went Wrong getAllProperties");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residencies/${id}`);
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went Wrong getProperty");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/users/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong,Please try again createUser");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/users/bookvisits/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong,Please try again bookVisit");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/users/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong,Please try again remove");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/users/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong,please try again fav");
    throw error;
  }
};
