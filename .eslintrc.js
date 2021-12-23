module.exports = {
    parser: 'babel-eslint',
    extends: ['@tophat', 'plugin:react-hooks/recommended'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'sort-imports': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
}
