import path from 'path'
import webpack, { DefinePlugin, RuleSetRule } from 'webpack'
import {BuildPaths} from '../build/types/config'
import {buildCssLoader} from '../build/loaders/buildCssLoader'
import { buildFileLoader } from './loaders/buildFileLoader'

export default ({config}: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build:'',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..','..','src'),
        buildLocales:'',
        locales: ''
    }
    config.resolve?.modules?.unshift(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')

    //@ts-ignore
    config.module?.rules = config.module?.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.(png|svg|jpe?g|gif)$/i };
        }

        return rule;
    });

    config.module?.rules?.push(buildFileLoader)

    //@ts-ignore
    config.module?.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module?.rules?.push(buildCssLoader(true))

    config.plugins?.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook')
    }))

    return config
} 