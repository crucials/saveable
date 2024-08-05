// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsdoc from 'eslint-plugin-jsdoc'

export default withNuxt([
    eslintConfigPrettier,
    { plugins: { jsdoc }, rules: { 'jsdoc/no-undefined-types': 1 } },
])
