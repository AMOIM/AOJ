module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../backend/public',
}