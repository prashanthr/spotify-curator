/* Server */
import express from 'express'
import http from 'http'
import config from 'config'
import cors from 'cors'
import bodyParser from 'body-parser'
import _debug from 'debug'
var debug = _debug('server')
import spotifyApi from './api/spotify'
import publicApi from './api/public'
import { publicRouter } from './router'

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: config.bodyParserLimit}))

app.use('/', publicRouter)
/* API Setup */
publicApi(app)
spotifyApi(app)

let server = async () => {
  let httpServer = http.Server(app)
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
  })
}
server()
