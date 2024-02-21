import { getAllClient } from "../../services/client-services";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClientController } from "../client-controller";

jest.mock("../../services/client-services");

describe("Client Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test("Get Clients Successful", async () => {
		const mockClients = [
			{ id: "1", name: "Client 1", phone: "(84) 23344-2244" },
		];

		(getAllClient as jest.Mock).mockResolvedValue(mockClients);

		const reply: FastifyReply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		const request: FastifyRequest = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyRequest;

		await ClientController.getAll(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockClients);
		expect(reply.code).toHaveBeenCalledWith(201);
	});
});

describe("Client Controller", () => {
	test("Get Clients error", async () => {
		const mockError = new Error("Internal Server Error");

		const reply: FastifyReply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		const request = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyRequest;

		(getAllClient as jest.Mock).mockRejectedValue(mockError);
		await ClientController.getAll(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(500);
	});
});
