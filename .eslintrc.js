module.exports = {
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	extends: [
		'@n0bodysec',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	rules: {
		'import/no-cycle': 'off',
		'import/prefer-default-export': 'off',
	},
	ignorePatterns: ['node_modules', 'lib'],
};
