// const swaggerJsdoc = require("swagger-jsdoc")
// const swaggerUi = require("swagger-ui-express")

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'FreshCart Api',
//             description: "API endpoints for a mini ecommerce application documented on swagger",
//             contact: {
//             name: "Hart",
//             email: "hartongit@gmail.com",
//             url: ""
//             },
//             version: '1.0.0',
//         },
//         servers: [
//             // {
//             // url: "http://localhost:5000/",
//             // description: "Local server"
//             // },
//             {
//                 url: "https://freshcart-api-6ivr.onrender.com/",
//                 description: "Live server"
//             },
//         ]
//     },
//     // looks for configuration in specified directories
//     apis: ['./routes/*.js'],
// }

// const swaggerSpec = swaggerJsdoc(options)
// function swaggerDocs(app, port) {
//     // Swagger Page
//     app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//     // Documentation in JSON format
//     app.get('/docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(swaggerSpec)
//     })
// }

// module.exports = { swaggerDocs }