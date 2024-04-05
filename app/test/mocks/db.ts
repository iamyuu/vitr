import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";
import type { ENTITY_TYPE, PRIMARY_KEY } from "@mswjs/data/lib/glossary";
import { hash } from "./utils";

export const db = factory({
	user: {
		id: primaryKey(Number),
		name: String,
		email: String,
		password: String,
	},
});

// https://github.com/mswjs/data/issues/185#issuecomment-1059022389
export type Model<Key extends keyof typeof db> = Omit<
	ReturnType<(typeof db)[Key]["create"]>,
	typeof ENTITY_TYPE | typeof PRIMARY_KEY
>;

function initDb() {
	db.user.create({
		id: 1,
		name: faker.person.firstName(),
		email: "admin@example.mock",
		password: hash("secret"),
	});
}

initDb();
