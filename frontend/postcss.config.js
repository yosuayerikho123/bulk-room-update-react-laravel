const tailwinds = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        tailwinds('./tailwind.config.js'),
        autoprefixer
    ],
}
