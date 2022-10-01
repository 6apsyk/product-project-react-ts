import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

function buildPlagins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plagins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ];
    if (isDev) {
        plagins.push(new ReactRefreshWebpackPlugin());
        // plagins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plagins;
}
export default buildPlagins;
