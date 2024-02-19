import { FastifyReply, FastifyRequest } from "fastify";
import { OrderSchema, OrderUpdateSchema } from "../types/Order";
import { z } from "zod";

import {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrder,
	deleteOrder,
	getOrderByStatus,
} from "../services/order-services";

const paramsSchema = z.object({
	id: z.string(),
});

const statusSchema = z.object({
	status: z.enum(["RESOLVED", "PENDING"]),
})

export const orderController = {
	create: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = OrderSchema.parse(request.body);
			const order = await createOrder(data);
			reply.code(201).send(order);
		} catch (err) {
			reply.code(400).send(err);
		}
	},

	getById: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			const order = await getOrderById(params.id);
			reply.code(201).send(order);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	getByStatus: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = statusSchema.parse(request.params);
			const orders = await getOrderByStatus(params.status);
			reply.code(201).send(orders);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	getAll: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const orders = await getAllOrders();
			reply.code(201).send(orders);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	update: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			const data = OrderUpdateSchema.parse(request.body);
			const order = await updateOrder(params.id, data);
			reply.code(201).send(order);
		} catch (err) {
			reply.code(400).send(err);
		}
	},

	delete: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			await deleteOrder(params.id);
			reply.send("Deleted;");
		} catch (err) {
			reply.code(404).send(err);
		}
	},
};
