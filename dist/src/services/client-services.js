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
exports.deleteClient = exports.updateClient = exports.getClientByName = exports.getAllClient = exports.getClientById = exports.createClient = void 0;
const prisma_1 = require("../config/prisma");
function createClient(clientData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, phone } = clientData;
        if (!name)
            throw new Error("Indique o nome do cliente");
        if (!phone)
            throw new Error("Indique o telefone do cliente");
        validateContactNumber(phone);
        const client = yield findClientByName(name);
        if (client)
            throw new Error("Cliente já cadastrado");
        return yield prisma_1.prisma.client.create({ data: clientData });
    });
}
exports.createClient = createClient;
function getClientById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield prisma_1.prisma.client.findUnique({ where: { id } });
        if (!client)
            throw new Error("Cliente não existe no banco de dados");
        return client;
    });
}
exports.getClientById = getClientById;
function getAllClient() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.client.findMany();
    });
}
exports.getAllClient = getAllClient;
function getClientByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield findClientByName(name);
        if (!client)
            throw new Error("Cliente não existe no banco de dados");
        return client;
    });
}
exports.getClientByName = getClientByName;
function updateClient(id, clientData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.client.update({
            where: { id },
            data: Object.assign({}, clientData),
        });
    });
}
exports.updateClient = updateClient;
function deleteClient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.client.delete({ where: { id } });
    });
}
exports.deleteClient = deleteClient;
function validateContactNumber(contact) {
    const contactRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!contactRegex.test(contact)) {
        throw new Error("Número invalido");
    }
}
function findClientByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.client.findFirst({
            where: {
                name: { contains: name }
            },
        });
    });
}
