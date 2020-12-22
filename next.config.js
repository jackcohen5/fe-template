module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:splat*',
                destination: 'http://localhost:8080/development/api/:splat*',
            },
        ]
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin(/.*\.test\.js$/)) // Ignore tests
        return config
    },
}
