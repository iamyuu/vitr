// https://www.oreilly.com/library/view/hands-on-functional-programming/9781788831437/d3234c19-df94-49e3-ab09-f0da9fbb71f7.xhtml
export const pipe =
	<T>(...fns: Array<(arg?: T) => T>) =>
	(value: T) =>
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		fns.reduce((acc, fn) => fn?.(acc), value);
