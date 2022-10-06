import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import buildLoader from './buildLoader'
import buildPlagins from './buildPlagins'
import buildResolves from './buildResolves'

import { BuildOptions } from './types/config'

export function buildWebpackConfig (options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        plugins: buildPlagins(options),
        module: {
            rules: buildLoader(options)
        },
        resolve: buildResolves(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined
    }
}
