import { prisma } from "../config/prisma";
import { Client } from "../types/Client";

export async function createClient(clientData: Client): Promise<Client> {
	const { name, phone } = clientData;

	if (!name) throw new Error("Indique o nome do cliente");

	if (!phone) throw new Error("Indique o telefone do cliente");
	validateContactNumber(phone);

	const client = await findClientByName(name);
	if (client) throw new Error("Cliente já cadastrado");

	return await prisma.client.create({ data: clientData });
}

export async function getClientById(id: string): Promise<Client> {
	const client = await prisma.client.findUnique({ where: { id } });

	if (!client) throw new Error("Cliente não existe no banco de dados");

	return client;
}

export async function getAllClient(): Promise<Client[]> {
	return await prisma.client.findMany();
}

export async function getClientByName(name: string): Promise<Client> {
	const client = await findClientByName(name);
	if (!client) throw new Error("Cliente não existe no banco de dados");

	return client;
}

export async function updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
	return await prisma.client.update({
		where: { id },
		data: {
			...clientData,
		},
	});
}

export async function deleteClient(id: string): Promise<Client> {
	return await prisma.client.delete({ where: { id } });
}

function validateContactNumber(contact: string) {
	const contactRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
	if (!contactRegex.test(contact)) {
		throw new Error("Número invalido");
	}
}

async function findClientByName(name: string) {
	return await prisma.client.findFirst({
		where: {
			name: {contains: name}
		},
	});
}
