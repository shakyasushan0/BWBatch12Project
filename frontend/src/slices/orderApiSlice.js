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
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetEsewaPaymentDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
