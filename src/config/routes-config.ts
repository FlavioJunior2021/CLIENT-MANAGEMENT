import { clientRoutes } from "../routes/client-route";
import { orderRoutes } from "../routes/order-route";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [orderRoutes, clientRoutes];
	routes.forEach((route) => {
		app.register(route);
	});
}
