export const buildFileLoader = {
        test:  /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        }, 
    }