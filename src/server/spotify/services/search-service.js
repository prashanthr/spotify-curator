import SpotifyBaseService from './base-service'
import _debug from 'debug'
var debug = _debug('spotify-search-service')

export default class SearchService extends SpotifyBaseService {
  async search (
    query: string,
    types?: string[] = ['track', 'artist', 'album', 'playlist'], 
    options?: Object = { limit : 5, offset : 1 }) {
      debug(`Searching for ${query}`)
      const result = 
        await this.spotify
        .search(query, types, options)
      debug('Result: ', result)
      return result
  }
}
