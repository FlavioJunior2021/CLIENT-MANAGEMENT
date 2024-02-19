import { prisma } from "../config/prisma";
import { Order } from "../types/Order";

export async function createOrder(orderData: Order): Promise<Order> {
  return await prisma.order.create({ data: orderData });
}

export async function getOrderById(id: string): Promise<Order> {
  return await prisma.order.findUniqueOrThrow({ where: { id } });
}

export async function getAllOrders(): Promise<Order[]> {
  return await prisma.order.findMany();
}

export async function getOrderByStatus(data: "RESOLVED" | "PENDING"): Promise<Order[]> {
	return await prisma.order.findMany({
		where: {
			status: data
		}
	})
}

export async function updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
  return await prisma.order.update({
    where: { id },
    data: {
      ...orderData,
    },
  });
}

export async function deleteOrder(id: string): Promise<Order> {
  return await prisma.order.delete({ where: { id } });
}
