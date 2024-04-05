import { render } from "~/test/test-utils";
import { App } from "./app";

test("should be able renders without crashing", () => {
	render(<App />);
});
