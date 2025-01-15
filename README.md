# QuickOptimize

QuickOptimize is a tool designed to download and optimize CSS and JS files from a specified website. It uses various libraries to minimize the size of these files, helping to improve website performance.

## Features

- Download CSS and JS files from a specified website.
- Minimize the size of CSS and JS files.
- Log the size reduction of the files.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/h-kod/QuickOptimize.git
    ```
2. Navigate to the project directory:
    ```sh
    cd QuickOptimize
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

You can run the tool using one of these methods:

1. Using npm (recommended):
```sh
npm run compress -- --website <website_url> --css --js
```

Example:
```sh
npm run compress -- --website https://www.lipsum.com --css --js
```

2. Using node directly:
```sh
node index.js --website <website_url> --css=<true|false> --js=<true|false>
```

**Important**: The website URL must start with `https://`. URLs without the protocol will not work.

Example:
```sh
node index.js --website https://www.lipsum.com --css=true --js=true
```

Replace `<website_url>` with the URL of the website you want to optimize, and set `--css` and `--js` to `true` or `false` depending on whether you want to optimize CSS and/or JS files.

**Note**: All optimized and original files will be saved in the `/output` directory.

## Output

The tool will create an `/output` directory in the project root folder. Inside this directory:
- Files are organized by domain name (e.g., `/output/www.lipsum.com/`)
- CSS files are stored in `/css` subdirectory
  - Original files named as `filename.css`
  - Minified files named as `m-filename.css`
- JS files are stored in `/js` subdirectory
  - Original files named as `filename.js`
  - Minified files named as `m-filename.js`

Example structure:
```
output/
└── www.lipsum.com/
    ├── css/
    │   ├── styles.css
    │   └── m-styles.css
    └── js/
        ├── main.js
        └── m-main.js
```

## Dependencies

- [@fullhuman/postcss-purgecss](https://www.npmjs.com/package/@fullhuman/postcss-purgecss)
- [axios](https://www.npmjs.com/package/axios)
- [jsdom](https://www.npmjs.com/package/jsdom)
- [purgecss](https://www.npmjs.com/package/purgecss)
- [terser](https://www.npmjs.com/package/terser)
- [yargs](https://www.npmjs.com/package/yargs)

## License

This project is licensed under the ISC License.