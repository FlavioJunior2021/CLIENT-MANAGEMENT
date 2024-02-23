"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = require("./config/fastify");
const routes_config_1 = require("./config/routes-config");
fastify_1.app.register(cors_1.default, {
    origin: true,
});
(0, routes_config_1.registerRoutes)();
fastify_1.app
    .listen({
    port: 3333,
    host: "0.0.0.0",
})
    .then(() => {
    console.log("🚀 HTTP server running on port http://localhost:3333");
});
