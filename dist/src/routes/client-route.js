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
exports.clientRoutes = void 0;
const client_controller_1 = require("../controller/client-controller");
function clientRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "post",
            url: "/client",
            handler: client_controller_1.ClientController.create,
        });
        fastify.route({
            method: "get",
            url: "/client/:id",
            handler: client_controller_1.ClientController.getById,
        });
        fastify.route({
            method: "get",
            url: "/client/name/:name",
            handler: client_controller_1.ClientController.getByName
        });
        fastify.route({
            method: "get",
            url: "/clients",
            handler: client_controller_1.ClientController.getAll,
        });
        fastify.route({
            method: "put",
            url: "/client/:id",
            handler: client_controller_1.ClientController.update,
        });
        fastify.route({
            method: "delete",
            url: "/client/:id",
            handler: client_controller_1.ClientController.delete,
        });
    });
}
exports.clientRoutes = clientRoutes;
