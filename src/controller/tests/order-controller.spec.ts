import { FastifyReply, FastifyRequest } from "fastify";
import { orderController } from "../order-controller";
import {
	createOrder,
	getAllOrders,
	getOrderById,
	getOrderByStatus,
	deleteOrder,
	updateOrder,
} from "../../services/order-services";

jest.mock("../../services/order-services.ts");

//Get All Orders
describe("Orders Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Get orders Successful", async () => {
		const ordersMock = [
			{
				id: "123",
				description: "Order Description",
				status: "PENDING",
				clientId: "123-456",
			},
		];

		(getAllOrders as jest.Mock).mockResolvedValue(ordersMock).mockResolvedValue;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		const request = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyRequest;

		await orderController.getAll(request, reply);

		expect(reply.send).toHaveBeenCalledWith(ordersMock);
		expect(reply.code).toHaveBeenCalledWith(201);
	});
});

//should be error
describe("Orders Controller", () => {
	it("Get Orders error", async () => {
		const mockError = new Error("Internal Server Error");

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		const request = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyRequest;

		(getAllOrders as jest.Mock).mockRejectedValue(mockError);
		await orderController.getAll(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(404);
	});
});

//Get orders by status
describe("Orders Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Get Orders by status", async () => {
		const request = {
			params: {
				status: "PENDING",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await orderController.getByStatus(request, reply);
		expect(getOrderByStatus).toHaveBeenCalledTimes(1);
		expect(getOrderByStatus).toHaveBeenCalledWith("PENDING");
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be get orders by status error
describe("Orders Controller", () => {
	it("Should handle errors and return 404 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			params: {
				status: "PENDING",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(getOrderByStatus as jest.Mock).mockRejectedValue(mockError);
		await orderController.getByStatus(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(404);
	});
});

//Get orders by id
describe("Orders Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Get Orders by id", async () => {
		const request = {
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await orderController.getById(request, reply);
		expect(getOrderById).toHaveBeenCalledTimes(1);
		expect(getOrderById).toHaveBeenCalledWith("123-456-789");
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be get orders by id error
describe("Orders Controller", () => {
	it("Should handle errors and return 404 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(getOrderById as jest.Mock).mockRejectedValue(mockError);
		await orderController.getById(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(404);
	});
});

//Create order
describe("Order Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Order created successfully and returning 201", async () => {
		const request = {
			body: {
				clientId: "123-456-789",
				status: "PENDING",
				description: "Order Description",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await orderController.create(request, reply);

		expect(createOrder).toHaveBeenCalledTimes(1);
		expect(createOrder).toHaveBeenCalledWith({
			clientId: "123-456-789",
			status: "PENDING",
			description: "Order Description",
		});
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be create order error
describe("Order Controller", () => {
	it("Should handle errors and return 400 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			body: {
				clientId: "123-456-789",
				status: "PENDING",
				description: "Order Description",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(createOrder as jest.Mock).mockRejectedValue(mockError);
		await orderController.create(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(400);
	});
});

//Update Order
describe("Order Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Order updated successfully and returning 201", async () => {
		const request = {
			body: {
				status: "RESOLVED",
			},
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await orderController.update(request, reply);

		expect(updateOrder).toHaveBeenCalledTimes(1);
		expect(updateOrder).toHaveBeenCalledWith("123-456-789", {
			status: "RESOLVED",
		});
		expect(reply.code).toHaveBeenCalledWith(201);
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be update orders error
describe("Order Controller", () => {
	it("Should handle errors and return 400 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			body: {
				status: "RESOLVED",
			},
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(updateOrder as jest.Mock).mockRejectedValue(mockError);
		await orderController.update(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(400);
	});
});

//Delete Order
describe("Order Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Order deleted successfully and returning Deleted", async () => {
		const request = {
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		await orderController.delete(request, reply);

		expect(deleteOrder).toHaveBeenCalledTimes(1);
		expect(deleteOrder).toHaveBeenCalledWith("123-456-789");
		expect(reply.send).toHaveBeenCalledWith("Deleted;");
		expect(reply.send).toHaveBeenCalledTimes(1);
	});
});

//Should be deleted orders error
describe("Order Controller", () => {
	it("Should handle errors and return 400 status code", async () => {
		const mockError = new Error("Internal Server Error");
		const request = {
			params: {
				id: "123-456-789",
			},
		} as FastifyRequest;

		const reply = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as FastifyReply;

		(deleteOrder as jest.Mock).mockRejectedValue(mockError);
		await orderController.delete(request, reply);

		expect(reply.send).toHaveBeenCalledWith(mockError);
		expect(reply.code).toHaveBeenCalledWith(404);
	});
});
