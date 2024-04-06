export function hash(txt: string) {
	let hash = 5381;
	let i = txt.length;

	while (i) {
		hash = (hash * 33) ^ txt.charCodeAt(--i);
	}

	return String(hash >>> 0);
}
