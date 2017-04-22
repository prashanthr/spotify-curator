/* Server */
import express from  'express'
import http from 'http'
import path from 'path'
import config from 'config'
import cors from 'cors'
import bodyParser from 'body-parser'
import _debug from 'debug'
var debug = _debug('server')
var publicRouter = express.Router()

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: config.bodyParserLimit}))
app.use(express.static(path.join(__dirname, '/../../build')))

publicRouter.get('/api/health', (req, res) => {
    res.send({
        apiStatus: "Healthy!"
    })
})
app.use('/', publicRouter)

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../../build', 'index.html'))
  })
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
  })
}
server()
