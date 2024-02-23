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
exports.orderController = void 0;
const Order_1 = require("../types/Order");
const zod_1 = require("zod");
const order_services_1 = require("../services/order-services");
const paramsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(["RESOLVED", "PENDING"]),
});
exports.orderController = {
    create: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = Order_1.OrderSchema.parse(request.body);
            const order = yield (0, order_services_1.createOrder)(data);
            reply.code(201).send(order);
        }
        catch (err) {
            reply.code(400).send(err);
        }
    }),
    getById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            const order = yield (0, order_services_1.getOrderById)(params.id);
            reply.code(201).send(order);
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
    getByStatus: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = statusSchema.parse(request.params);
            const orders = yield (0, order_services_1.getOrderByStatus)(params.status);
            reply.code(201).send(orders);
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
    getAll: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield (0, order_services_1.getAllOrders)();
            reply.code(201).send(orders);
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
    update: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            const data = Order_1.OrderUpdateSchema.parse(request.body);
            const order = yield (0, order_services_1.updateOrder)(params.id, data);
            reply.code(201).send(order);
        }
        catch (err) {
            reply.code(400).send(err);
        }
    }),
    delete: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = paramsSchema.parse(request.params);
            yield (0, order_services_1.deleteOrder)(params.id);
            reply.send("Deleted;");
        }
        catch (err) {
            reply.code(404).send(err);
        }
    }),
};
