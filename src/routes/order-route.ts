// routes/orderRoutes.ts

import { FastifyInstance } from "fastify";
import { orderController } from "../controller/order-controller";

export async function orderRoutes(fastify: FastifyInstance) {
	fastify.route({
		method: "post",
		url: "/orders",
		handler: orderController.create,
	});

	fastify.route({
		method: "get",
		url: "/orders/:id",
		handler: orderController.getById,
	});

	fastify.route({
		method: "get",
		url: "/orders/status/:status",
		handler: orderController.getByStatus,
	});

	fastify.route({
		method: "get",
		url: "/orders",
		handler: orderController.getAll,
	});

	fastify.route({
		method: "delete",
		url: "/orders/resolved",
		handler: orderController.deleteResolvedOrders,
	});

	fastify.route({
		method: "put",
		url: "/orders/:id",
		handler: orderController.update,
	});

	fastify.route({
		method: "delete",
		url: "/orders/:id",
		handler: orderController.delete,
	});
}
