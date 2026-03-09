import { ORDER_URL } from "../constants";
import apiSlice from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
      }),
    }),
    getEsewaPaymentDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/get-payment-details`,
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetEsewaPaymentDetailsQuery,
} = orderApiSlice;
