module.exports = {
    extends: ['@nick-mazuk/semantic-release-config'],
    plugins: [
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'README.md'],
            },
        ],
    ]
}