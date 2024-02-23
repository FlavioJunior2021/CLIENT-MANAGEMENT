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
exports.deleteOrder = exports.updateOrder = exports.getOrderByStatus = exports.getAllOrders = exports.getOrderById = exports.createOrder = void 0;
const prisma_1 = require("../config/prisma");
function createOrder(orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { description, clientId } = orderData;
        if (!description)
            throw new Error("De uma descrição ao pedido");
        if (!clientId)
            throw new Error("Indique o ID do cliente");
        return yield prisma_1.prisma.order.create({ data: orderData });
    });
}
exports.createOrder = createOrder;
function getOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new Error("Pedido não existe no banco de dados");
        return order;
    });
}
exports.getOrderById = getOrderById;
function getAllOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.order.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
    });
}
exports.getAllOrders = getAllOrders;
function getOrderByStatus(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.order.findMany({
            where: {
                status: data,
            },
        });
    });
}
exports.getOrderByStatus = getOrderByStatus;
function updateOrder(id, orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.order.update({
            where: { id },
            data: Object.assign({}, orderData),
        });
    });
}
exports.updateOrder = updateOrder;
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.order.delete({ where: { id } });
    });
}
exports.deleteOrder = deleteOrder;
