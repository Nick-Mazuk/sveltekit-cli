const config = require('@nick-mazuk/semantic-release-config')

module.exports = {
    extends: ['@nick-mazuk/semantic-release-config'],
    plugins: [
        ...config.plugins,
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'README.md'],
            },
        ],
    ]
}