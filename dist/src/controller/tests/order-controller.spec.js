"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("../order-controller");
const order_services_1 = require("../../services/order-services");
jest.mock("../../services/order-services.ts");
//Get All Orders
describe("Orders Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get orders Successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const ordersMock = [
            {
                id: "123",
                description: "Order Description",
                status: "PENDING",
                clientId: "123-456",
            },
        ];
        order_services_1.getAllOrders.mockResolvedValue(ordersMock).mockResolvedValue;
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const request = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.getAll(request, reply);
        expect(reply.send).toHaveBeenCalledWith(ordersMock);
        expect(reply.code).toHaveBeenCalledWith(201);
    }));
});
//should be error
describe("Orders Controller", () => {
    it("Get Orders error", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const request = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.getAllOrders.mockRejectedValue(mockError);
        yield order_controller_1.orderController.getAll(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
//Get orders by status
describe("Orders Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get Orders by status", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                status: "PENDING",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.getByStatus(request, reply);
        expect(order_services_1.getOrderByStatus).toHaveBeenCalledTimes(1);
        expect(order_services_1.getOrderByStatus).toHaveBeenCalledWith("PENDING");
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be get orders by status error
describe("Orders Controller", () => {
    it("Should handle errors and return 404 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                status: "PENDING",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.getOrderByStatus.mockRejectedValue(mockError);
        yield order_controller_1.orderController.getByStatus(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
//Get orders by id
describe("Orders Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get Orders by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.getById(request, reply);
        expect(order_services_1.getOrderById).toHaveBeenCalledTimes(1);
        expect(order_services_1.getOrderById).toHaveBeenCalledWith("123-456-789");
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be get orders by id error
describe("Orders Controller", () => {
    it("Should handle errors and return 404 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.getOrderById.mockRejectedValue(mockError);
        yield order_controller_1.orderController.getById(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
//Create order
describe("Order Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Order created successfully and returning 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            body: {
                clientId: "123-456-789",
                status: "PENDING",
                description: "Order Description",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.create(request, reply);
        expect(order_services_1.createOrder).toHaveBeenCalledTimes(1);
        expect(order_services_1.createOrder).toHaveBeenCalledWith({
            clientId: "123-456-789",
            status: "PENDING",
            description: "Order Description",
        });
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be create order error
describe("Order Controller", () => {
    it("Should handle errors and return 400 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            body: {
                clientId: "123-456-789",
                status: "PENDING",
                description: "Order Description",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.createOrder.mockRejectedValue(mockError);
        yield order_controller_1.orderController.create(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(400);
    }));
});
//Update Order
describe("Order Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Order updated successfully and returning 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            body: {
                status: "RESOLVED",
            },
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.update(request, reply);
        expect(order_services_1.updateOrder).toHaveBeenCalledTimes(1);
        expect(order_services_1.updateOrder).toHaveBeenCalledWith("123-456-789", {
            status: "RESOLVED",
        });
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be update orders error
describe("Order Controller", () => {
    it("Should handle errors and return 400 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            body: {
                status: "RESOLVED",
            },
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.updateOrder.mockRejectedValue(mockError);
        yield order_controller_1.orderController.update(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(400);
    }));
});
//Delete Order
describe("Order Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Order deleted successfully and returning Deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield order_controller_1.orderController.delete(request, reply);
        expect(order_services_1.deleteOrder).toHaveBeenCalledTimes(1);
        expect(order_services_1.deleteOrder).toHaveBeenCalledWith("123-456-789");
        expect(reply.send).toHaveBeenCalledWith("Deleted;");
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be deleted orders error
describe("Order Controller", () => {
    it("Should handle errors and return 400 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                id: "123-456-789",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        order_services_1.deleteOrder.mockRejectedValue(mockError);
        yield order_controller_1.orderController.delete(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
