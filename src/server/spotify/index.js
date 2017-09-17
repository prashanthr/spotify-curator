// @flow
// import SpotifyWebApi from 'spotify-web-api-node'
import SpotifyBaseService from './services/base-service'
import SearchService from './services/search-service'
import FeatureService from './services/feature-service'
import AnalysisService from './services/analysis-service'
import { keyBy } from 'lodash'
import _debug from 'debug'
var debug = _debug('spotify')

class Spotify {
  constructor () {
    this.service = new SpotifyBaseService()
    this.searchService = new SearchService()
    this.featureService = new FeatureService()
    this.analysisService = new AnalysisService()
    debug('Spotify', this.service.spotify)
  }

  async initialize () {
    await this.service.initialize()
  }
  async refresh () {
    await this.service.refreshToken()
  }

  async flow () {
    if (this.service.isInitialized) {
      await this.refresh()
    } else {
      await this.initialize()
    }
  }

  async search (params) {
    await this.flow()
    return await this.searchService
        .search(params.query, params.types, params.options)
  }

  async getFeatures (trackIds) {
    await this.flow()
    const data = await this.featureService
      .getFeatures(trackIds)
    return keyBy(data.audio_features, 'id')
  }

  async analyze (trackId) {
    await this.flow()
    return await this.analysisService.analyze(trackId)
  }
}

export default new Spotify()
