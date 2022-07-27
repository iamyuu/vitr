/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	extends: ['kentcdodds', 'kentcdodds/react', 'kentcdodds/jsx-a11y', 'kentcdodds/jest'],
	settings: {
		'import/resolver': {
			alias: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				map: [['~', './src']],
			},
		},
		jest: {
			version: 27,
		},
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['off'],
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'import/prefer-default-export': 'off',
		'no-console': 'warn',
		'no-restricted-imports': ['error', { patterns: ['~/features/*/*'] }],
		'no-warning-comments': 'off',
		radix: ['error', 'as-needed'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
		'react/jsx-sort-props': ['warn', { reservedFirst: ['key'] }],
	},
};
