"use strict";
// routes/orderRoutes.ts
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
exports.orderRoutes = void 0;
const order_controller_1 = require("../controller/order-controller");
function orderRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "post",
            url: "/orders",
            handler: order_controller_1.orderController.create,
        });
        fastify.route({
            method: "get",
            url: "/orders/:id",
            handler: order_controller_1.orderController.getById,
        });
        fastify.route({
            method: "get",
            url: "/orders/status/:status",
            handler: order_controller_1.orderController.getByStatus
        });
        fastify.route({
            method: "get",
            url: "/orders",
            handler: order_controller_1.orderController.getAll,
        });
        fastify.route({
            method: "put",
            url: "/orders/:id",
            handler: order_controller_1.orderController.update,
        });
        fastify.route({
            method: "delete",
            url: "/orders/:id",
            handler: order_controller_1.orderController.delete,
        });
    });
}
exports.orderRoutes = orderRoutes;
