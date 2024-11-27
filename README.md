# QuickOptimize

QuickOptimize is a tool designed to download and optimize CSS and JS files from a specified website. It uses various libraries to minimize the size of these files, helping to improve website performance.

## Features

- Download CSS and JS files from a specified website.
- Minimize the size of CSS and JS files.
- Log the size reduction of the files.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/QuickOptimize.git
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

To start the optimization process, run the following command:
```sh
node source/index.js --website <website_url> --css=<true|false> --js=<true|false>

node source/index.js --website https://www.lipsum.com --css=true --js=true
```
Replace `<website_url>` with the URL of the website you want to optimize, and set `--css` and `--js` to `true` or `false` depending on whether you want to optimize CSS and/or JS files.

## Dependencies

- [@fullhuman/postcss-purgecss](https://www.npmjs.com/package/@fullhuman/postcss-purgecss)
- [axios](https://www.npmjs.com/package/axios)
- [jsdom](https://www.npmjs.com/package/jsdom)
- [purgecss](https://www.npmjs.com/package/purgecss)
- [terser](https://www.npmjs.com/package/terser)
- [yargs](https://www.npmjs.com/package/yargs)

## License

This project is licensed under the ISC License.