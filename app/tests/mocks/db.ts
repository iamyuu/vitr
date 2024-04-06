import { factory, primaryKey } from "@mswjs/data";
import type { ENTITY_TYPE, PRIMARY_KEY } from "@mswjs/data/lib/glossary";
import { userBuilder } from "~/tests/mocks/generate";
import { hash } from "~/tests/mocks/utils";

// https://github.com/mswjs/data/issues/185#issuecomment-1059022389
export type Model<TKey extends keyof typeof db> = Omit<
	ReturnType<(typeof db)[TKey]["create"]>,
	typeof ENTITY_TYPE | typeof PRIMARY_KEY
>;

export const db = factory({
	user: {
		id: primaryKey(Number),
		name: String,
		email: String,
		password: String,
	},
});

function initDb() {
	db.user.create(
		userBuilder.one({
			overrides: {
				email: "admin@backend.mock",
				password: hash("secret"),
			},
		}),
	);
}

initDb();
