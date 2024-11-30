// USING STANDALONE TAILWIND CLI 

module.exports = {
    content: [
      './**/*.{html,js,css}',
    ],
    theme: {
      extend: {
        colors: {
          clifford: "#23FACB"
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
    ]
}