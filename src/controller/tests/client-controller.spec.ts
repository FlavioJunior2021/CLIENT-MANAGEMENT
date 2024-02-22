import {
	createClient,
	getAllClient,
	getClientById,
} from "../../services/client-services";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClientController } from "../client-controller";

jest.mock("../../services/client-services");

//Get All Clients
describe("Client Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Get Clients Successful", async () => {
		const mockClients = [
			{ id: "1", name: "Client 1", phone: "(84) 23344-2244" },
		];

		(getAllClient as jest.Mock).mockResolvedValue(mockClients);

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		const request = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyRequest;

		await ClientController.getAll(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockClients);
		expect(reply.code).toHaveBeenCalledWith(201);
	});
});

//Should be error
describe("Client Controller", () => {
	it("Get Clients error", async () => {
		const mockError = new Error("Internal Server Error");

		const reply = {
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

//Create Client 
describe("Client Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Client created successfully and returning 201", async () => {
		const request = {
			body: {
				name: "Jhon Do",
				phone: "(84) 865830-9627",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await ClientController.create(request, reply);

		expect(createClient).toHaveBeenCalledTimes(1);
		expect(createClient).toHaveBeenCalledWith({
			name: "Jhon Do",
			phone: "(84) 865830-9627",
		});
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be create client error
describe("Client Controller", () => {
	it("Should handle errors and return 400 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			body: {
				name: "Jhon Do",
				phone: "(84) 865830-9627",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(createClient as jest.Mock).mockRejectedValue(mockError);
		await ClientController.create(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(400);
	});
});

//Get Clients by id
describe("Client Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Get clients by id", async () => {
		const request = {
			params: {
				id: "123-456-789-101123",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await ClientController.getById(request, reply);
		expect(getClientById).toHaveBeenCalledTimes(1);
		expect(getClientById).toHaveBeenCalledWith("123-456-789-101123");
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be get clients by id error 
describe("Client Controller", () => {
	it("Should handle errors and return 404 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			params: {
				id: "123-456-789-101112",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(getClientById as jest.Mock).mockRejectedValue(mockError);
		await ClientController.getById(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(404);
	})
})