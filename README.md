# Sveltekit CLI

Blast through your Sveltekit development and stop writing all boilerplate code. Works best if starting with my [sveltekit-template](https://github.com/Nick-Mazuk/sveltekit-template).

- Create new pages with cypress tests
- Create new endpoints complete with type definitions
- Create new layouts and resets (with all the right CSS)
- …and more!

This project is still in the early stages. See [Usage](#usage) for complete feature-set.

## Install

This CLI can either be installed locally or globally. If you started with my [sveltekit-template](https://github.com/Nick-Mazuk/sveltekit-template), this CLI is already installed.

### Local installation

```bash
pnpm i -D @nick-mazuk/sveltekit-cli
```

Then create script aliases in the package.json. For instance,

```json
{
    "scripts": {
        "create-page": "kit create-page",
        "create-layout": "kit create-layout",
        "create-endpoint": "kit create-endpoint"
    },
}
```

### Global installation

```bash
pnpm i -g @nick-mazuk/sveltekit-cli
```

The CLI can then be run using

```bash
kit <cmd> [args]
```

## Usage

```bash
kit <cmd> [args]

Commands:
  kit create-page      Creates a new page
  kit create-layout    Creates a new layout
  kit create-endpoint  Creates a new endpoint

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```

## License

This project is open sourced with the [MIT](LICENSE) license.
