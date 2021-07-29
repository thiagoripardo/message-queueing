export default {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        'import/extensions': 'off',
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src/"],
                "extensions": [".js", ".ts"],
            },
        },
    },
};
