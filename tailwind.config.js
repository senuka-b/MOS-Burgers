// USING STANDALONE TAILWIND CLI 

module.exports = {
    content: [
      './**/*.{html,js,css}',
    ],
    theme: {
      extend: {
        colors: {
          clifford: "#23FACB"
        },
        fontFamily : {
          "aurore" : ["'La Belle Aurore'", "cursive"]
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
    ]
}