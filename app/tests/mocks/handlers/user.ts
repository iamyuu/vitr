import { env } from "~/constants/env";
import { db } from "~/tests/mocks/db";

const namespace = `${env.VITE_API_URL}/user`;

/**
 * This will generate handlers for user entity based on the db schema
 * It will generate handlers for all CRUD operations
 *
 * @see https://github.com/mswjs/data?tab=readme-ov-file#generate-request-handlers
 *
 * @example
 * ```md
 * `GET /users` - Returns a list of users (supports pagination)
 * `GET /users/:id` - Returns a single user by ID
 * `POST /users` - Creates a new user
 * `PUT /users/:id` - Updates a user by ID
 * `DELETE /users/:id` - Deletes a user by ID
 * ```
 */
export const userHandlers = db.user.toHandlers("rest", namespace);
