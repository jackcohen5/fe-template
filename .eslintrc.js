module.exports = {
    parser: "@babel/eslint-parser",
    plugins: ["react", "jsx-a11y", "prettier"],
    extends: [
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    rules: {
        "prettier/prettier": "error",
    },
    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
        react: {
            version: "detect",
        },
    },
}
