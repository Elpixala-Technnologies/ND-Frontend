import { basedUrl } from "../Network/Network";

export const getOrderUrl = basedUrl + 'orders/get-orders'

export const addOrderUrl = basedUrl + 'orders/create-order'

export const deleteOrderUrl = (id) => basedUrl + `orders/delete/${id}`

export const updateOrderUrl = (id) => basedUrl + `orders/update/${id}`

export const getOrderByIdUrl = (id) => basedUrl + `orders/get-singel/${id}`

export const getOrderByEmailUrl = (email) => basedUrl + `orders/get-orders/${email}`



