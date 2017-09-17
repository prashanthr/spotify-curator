// @flow
import SpotifyBaseService from './base-service'
import _debug from 'debug'
var debug = _debug('spotify-feature-service')

export default class FeatureService extends SpotifyBaseService {
  async getFeatures (ids: string[]) {
      debug(`Getting features for ${ids}`)
      const result = 
        await this.spotify
          .getAudioFeaturesForTracks(ids)
      debug('Result: ', result)
      return result.body
  }
}
