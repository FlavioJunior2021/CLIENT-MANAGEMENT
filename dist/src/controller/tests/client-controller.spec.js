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
const client_services_1 = require("../../services/client-services");
const client_controller_1 = require("../client-controller");
jest.mock("../../services/client-services");
//Get All Clients
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get Clients Successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockClients = [
            { id: "1", name: "Client 1", phone: "(84) 23344-2244" },
        ];
        client_services_1.getAllClient.mockResolvedValue(mockClients);
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const request = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.getAll(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockClients);
        expect(reply.code).toHaveBeenCalledWith(201);
    }));
});
//Should be error
describe("Client Controller", () => {
    it("Get Clients error", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const request = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.getAllClient.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.getAll(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(500);
    }));
});
//Create Client
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Client created successfully and returning 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            body: {
                name: "Jhon Do",
                phone: "(84) 865830-9627",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.create(request, reply);
        expect(client_services_1.createClient).toHaveBeenCalledTimes(1);
        expect(client_services_1.createClient).toHaveBeenCalledWith({
            name: "Jhon Do",
            phone: "(84) 865830-9627",
        });
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be create client error
describe("Client Controller", () => {
    it("Should handle errors and return 400 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            body: {
                name: "Jhon Do",
                phone: "(84) 865830-9627",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.createClient.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.create(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(400);
    }));
});
//Get Clients by id
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get clients by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                id: "123-456-789-101123",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.getById(request, reply);
        expect(client_services_1.getClientById).toHaveBeenCalledTimes(1);
        expect(client_services_1.getClientById).toHaveBeenCalledWith("123-456-789-101123");
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be get clients by id error
describe("Client Controller", () => {
    it("Should handle errors and return 404 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                id: "123-456-789-101112",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.getClientById.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.getById(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
//Get Clients by name
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get clients by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                name: "Jhon Do",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.getByName(request, reply);
        expect(client_services_1.getClientByName).toHaveBeenCalledTimes(1);
        expect(client_services_1.getClientByName).toHaveBeenCalledWith("Jhon Do");
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
////Should be get clients by name error
describe("Client Controller", () => {
    it("Should handle errors and return 404 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                name: "Jhon Do",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.getClientByName.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.getByName(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
//Update Client
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Client updated successfully and returning 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            body: {
                name: "Jhon Do",
                phone: "(84) 865830-9627",
            },
            params: {
                id: "123-456-789-101112",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.update(request, reply);
        expect(client_services_1.updateClient).toHaveBeenCalledTimes(1);
        expect(client_services_1.updateClient).toHaveBeenCalledWith("123-456-789-101112", {
            name: "Jhon Do",
            phone: "(84) 865830-9627",
        });
        expect(reply.code).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be update clients error
describe("Client Controller", () => {
    it("Should handle errors and return 400 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            body: {
                name: "Jhon Do",
                phone: "(84) 865830-9627",
            },
            params: {
                id: "123-456-789-101112",
            }
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.updateClient.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.update(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(400);
    }));
});
//Delete Client
describe("Client Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Client deleted successfully and returning Deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            params: {
                id: "123-456-789-101112",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        yield client_controller_1.ClientController.delete(request, reply);
        expect(client_services_1.deleteClient).toHaveBeenCalledTimes(1);
        expect(client_services_1.deleteClient).toHaveBeenCalledWith("123-456-789-101112");
        expect(reply.send).toHaveBeenCalledWith("Deleted;");
        expect(reply.send).toHaveBeenCalledTimes(1);
    }));
});
//Should be delete clients error
describe("Client Controller", () => {
    it("Should handle errors and return 404 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Internal Server Error");
        const request = {
            params: {
                id: "123-456-789-101112",
            },
        };
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        client_services_1.deleteClient.mockRejectedValue(mockError);
        yield client_controller_1.ClientController.delete(request, reply);
        expect(reply.send).toHaveBeenCalledWith(mockError);
        expect(reply.code).toHaveBeenCalledWith(404);
    }));
});
