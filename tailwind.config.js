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
          "aurore" : ["'La Belle Aurore'", "cursive"],
          "madimi": ["'Madimi One'"]
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
    ]
}