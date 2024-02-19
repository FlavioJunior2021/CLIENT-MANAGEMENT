import { FastifyReply, FastifyRequest } from "fastify";
import { ClientSchema, updateClientSchema } from "../types/Client";
import { z } from "zod";

import {
	createClient,
	deleteClient,
	getAllClient,
	getClientById,
	getClientByName,
	updateClient,
} from "../services/client-services";

const paramsSchema = z.object({
	id: z.string(),
});

const nameSchema = z.object({
	name: z.string(),
})

export const ClientController = {
	create: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = ClientSchema.parse(request.body);
			const client = await createClient(data);
			reply.code(201).send(client);
		} catch (err) {
			reply.code(400).send(err);
		}
	},

	getById: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			const client = await getClientById(params.id);
			reply.code(201).send(client);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	getByName: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = nameSchema.parse(request.params);
			const client = await getClientByName(params.name);
			reply.code(201).send(client);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	getAll: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const clients = await getAllClient();
			reply.code(201).send(clients);
		} catch (err) {
			reply.code(404).send(err);
		}
	},

	update: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			const data = updateClientSchema.parse(request.body);
			const client = await updateClient(params.id, data);
			reply.code(201).send(client);
		} catch (err) {
			reply.code(400).send(err);
		}
	},

	delete: async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const params = paramsSchema.parse(request.params);
			await deleteClient(params.id);
			reply.send("Deleted;");
		} catch (err) {
			reply.code(404).send(err);
		}
	},
};
