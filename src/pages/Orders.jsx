import React from "react";
import { redirect, useLoaderData } from 'react-router-dom';
import { store } from "../store";
import { customFetch } from "../utilis";
import {toast} from "react-toastify";
import {OrderList, SectionTitle, ComplexPagination } from "../component"

const ordersQuery = (params, user) => {
  return {
    queryKey:['orders', user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () => customFetch.get("/orders", {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  }
}
export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user || !user.token) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await queryClient.ensureQueryData(ordersQuery(params, user));

      console.log("Orders Response:", response.data);

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error fetching orders:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
    }
  };



  const  Orders = () => {
    const { meta } = useLoaderData();
    if (meta.pagination.total < 1) {
      return <SectionTitle text='Please make an order' />;
    }
    return (
      <>
       <SectionTitle text='Your Orders' />
       <OrderList/>
       <ComplexPagination/>
      </>
    );
  };
  export default Orders;
