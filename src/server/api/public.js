import { publicRouter } from '../router'
import _debug from 'debug'
var debug = _debug('api-public')

export default (app) => {
  publicRouter.get('/api/health', (req, res) => {
    debug('Health Checked')
    res.send({
      apiStatus: 'Healthy!'
    })
  })
  return app
}
