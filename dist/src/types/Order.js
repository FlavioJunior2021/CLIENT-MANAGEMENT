"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdateSchema = exports.OrderSchema = void 0;
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    description: zod_1.z.string(),
    status: zod_1.z.enum(["RESOLVED", "PENDING"]),
    clientId: zod_1.z.string(),
});
exports.OrderUpdateSchema = zod_1.z.object({
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["RESOLVED", "PENDING"]).optional(),
    createdAt: zod_1.z.date().optional(),
    clientId: zod_1.z.string().optional(),
});
