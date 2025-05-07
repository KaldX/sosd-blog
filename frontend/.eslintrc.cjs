// .eslintrc.cjs
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'prettier/prettier': 'warn', // 将 Prettier 问题视为警告
        'vue/multi-word-component-names': 'off', // 不强制多词组件名
    },
};
