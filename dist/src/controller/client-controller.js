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
exports.ClientController = void 0;
const Client_1 = require("../types/Client");
const zod_1 = require("zod");
const client_services_1 = require("../services/client-services");
const paramsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const nameSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.ClientController = {
    create: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = Client_1.ClientSchema.parse(request.body);
            const client = yield (0, client_services_1.createClient)(data);
            reply.code(201).send(client);
        }
        catch (err) {
            reply.code(400).send(err);
        }
    }),
    getById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            const client = yield (0, client_services_1.getClientById)(params.id);
            reply.code(201).send(client);
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
    getByName: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = nameSchema.parse(request.params);
            const client = yield (0, client_services_1.getClientByName)(params.name);
            reply.code(201).send(client);
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
    getAll: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clients = yield (0, client_services_1.getAllClient)();
            reply.code(201).send(clients);
        }
        catch (err) {
            reply.code(500).send(err);
        }
    }),
    update: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            const data = Client_1.updateClientSchema.parse(request.body);
            const client = yield (0, client_services_1.updateClient)(params.id, data);
            reply.code(201).send(client);
        }
        catch (err) {
            reply.code(400).send(err);
        }
    }),
    delete: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            yield (0, client_services_1.deleteClient)(params.id);
            reply.send("Deleted;");
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
};
