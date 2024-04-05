import { faker } from "@faker-js/faker";
import { build, perBuild, sequence } from "@jackfranklin/test-data-bot";

export const userBuilder = build({
	fields: {
		id: sequence(),
		name: perBuild(() => faker.person.firstName()),
		email: perBuild(() => faker.internet.email()),
		password: perBuild(() => faker.string.alphanumeric(8)),
	},
});
