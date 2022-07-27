/**
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
	extends: ['@commitlint/config-conventional'],
	'scope-case': [2, 'always', 'kebab-case'],
};
