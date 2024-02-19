import { orderRoutes } from "../routes/order-route";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [orderRoutes];
	routes.forEach((route) => {
		app.register(route);
	});
}
