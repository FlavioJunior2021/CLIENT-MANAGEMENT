"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const client_route_1 = require("../routes/client-route");
const order_route_1 = require("../routes/order-route");
const fastify_1 = require("./fastify");
function registerRoutes() {
    const routes = [order_route_1.orderRoutes, client_route_1.clientRoutes];
    routes.forEach((route) => {
        fastify_1.app.register(route);
    });
}
exports.registerRoutes = registerRoutes;
