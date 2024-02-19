import cors from "@fastify/cors";
import { app } from "./config/fastify";
import { registerRoutes } from "./config/routes-config";

app.register(cors, {
	origin: true,
});

registerRoutes();

app
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("🚀 HTTP server running on port http://localhost:3333");
	});