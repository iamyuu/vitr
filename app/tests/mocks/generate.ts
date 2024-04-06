import { faker } from "@faker-js/faker";
import { build, perBuild, sequence } from "@jackfranklin/test-data-bot";
import { hash } from "~/tests/mocks/utils";

export const userBuilder = build({
	fields: {
		id: sequence(),
		name: perBuild(() => faker.person.firstName()),
		email: perBuild(() => faker.internet.email()),
		password: perBuild(() => hash(faker.string.alphanumeric(8))),
	},
});
