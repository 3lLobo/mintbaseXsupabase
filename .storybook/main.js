// .storybook/main.js

const path = require('path')

module.exports = {
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    /** Expose public folder to storybook as static */
    staticDirs: ['../public'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chakra-ui/storybook-addon',
        {
            /**
             * Fix Storybook issue with PostCSS@8
             * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
             */
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: (config) => {
        /**
         * Add support for alias-imports
         * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
         */
        config.resolve.alias = {
            ...config.resolve?.alias,
            '@': [path.resolve(__dirname, '../'), path.resolve(__dirname, '../')],
        }

        /**
         * Fixes font import with /
         * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
         */
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../styles'),
        })

        config.resolve.roots = [path.resolve(__dirname, '../public'), 'node_modules']

        return config
    },
    framework: '@storybook/react',
}
