// @flow
import SpotifyBaseService from './base-service'
import _debug from 'debug'
var debug = _debug('spotify-feature-service')

export default class AnalysisService extends SpotifyBaseService {
  async analyze (id: string) {
      debug(`Getting analysis for ${id}`)
      const result = 
        await this.spotify
          .getAudioAnalysisForTrack(id)
      debug('Result: ', result)
      return result.body
  }
}
