module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-postcss',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-controls',
    "@storybook/addon-actions",
    "@storybook/addon-interactions",
    '@chakra-ui/storybook-addon',
    "@react-theming/storybook-addon",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },

}