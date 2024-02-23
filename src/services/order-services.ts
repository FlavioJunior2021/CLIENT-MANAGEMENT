import { prisma } from "../config/prisma";
import { Order } from "../types/Order";

export async function createOrder(orderData: Order): Promise<Order> {
	const { description, clientId } = orderData;

	if (!description) throw new Error("De uma descrição ao pedido");

	if (!clientId) throw new Error("Indique o ID do cliente");

	return await prisma.order.create({ data: orderData });
}

export async function getOrderById(id: string): Promise<Order> {
	const order = await prisma.order.findUnique({ where: { id } });

	if (!order) throw new Error("Pedido não existe no banco de dados");

	return order;
}

export async function getAllOrders(): Promise<Order[]> {
	return await prisma.order.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function getOrderByStatus(
	data: "RESOLVED" | "PENDING"
): Promise<Order[]> {
	return await prisma.order.findMany({
		where: {
			status: data,
		},
	});
}

export async function updateOrder(
	id: string,
	orderData: Partial<Order>
): Promise<Order> {
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
