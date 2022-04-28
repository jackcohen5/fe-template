/* eslint-disable no-console */

const fs = require("fs")
fs.readFile("netlify.toml", "utf8", function (err, data) {
    if (err) {
        return console.error(err)
    }
    const result = data.replace(
        /API_REDIRECT/g,
        `${process.env.API_LOCATION}/api/:splat`
    )

    fs.writeFile("netlify.toml", result, "utf8", function (err) {
        if (err) return console.error(err)
    })
})
