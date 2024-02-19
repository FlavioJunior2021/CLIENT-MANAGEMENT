// routes/orderRoutes.ts

import { FastifyInstance } from "fastify";
import { ClientController } from "../controller/client-controller";

export async function clientRoutes(fastify: FastifyInstance) {
	fastify.route({
		method: "post",
		url: "/client",
		handler: ClientController.create,
	});

	fastify.route({
		method: "get",
		url: "/client/:id",
		handler: ClientController.getById,
	});

	fastify.route({
		method: "get",
		url: "/client/name/:name",
		handler: ClientController.getByName
	})

	fastify.route({
		method: "get",
		url: "/clients",
		handler: ClientController.getAll,
	});

	fastify.route({
		method: "put",
		url: "/client/:id",
		handler: ClientController.update,
	});

	fastify.route({
		method: "delete",
		url: "/client/:id",
		handler: ClientController.delete,
	});
}
