"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSchema = exports.ClientSchema = void 0;
const zod_1 = require("zod");
exports.ClientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    phone: zod_1.z.string(),
});
exports.updateClientSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
});
