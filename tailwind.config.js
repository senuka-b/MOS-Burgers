// USING STANDALONE TAILWIND CLI 

module.exports = {
    content: [
      './**/*.{html,css,js}',
    ],
    theme: {
      extend: {
        colors: {
          clifford: "#23FACB"
        },
        fontFamily : {
          "aurore" : ["'La Belle Aurore'", "cursive"],
          "madimi": ["'Madimi One'"],
          "itim": ["Itim"]
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
    ]
}