// @flow
import SpotifyBaseService from './base-service'
import _debug from 'debug'
var debug = _debug('spotify-playlist-service')

export default class PlaylistService extends SpotifyBaseService {
  async create (name: string, 
    description: string
    public: boolean, 
    collaborative: boolean) {
      try {
        const result = await this.spotify.createPlaylist(name, description, { public }, { collaborative })
        return this.parseResponse(result)
      } catch (err) {
        debug(`Error creating playlist ${err}`)
        return err
      }
      
  }

  async update (name: string, 
    description: string
    public: boolean, 
    collaborative: boolean) {

  }

  async addTracks (trackIds: string[]) {

  }
  
  async removeTracks (trackIds: string[]) {

  }

  async getAll () {

  }

  async get (username: string, id: string) {
    return await this.spotify
      .getPlaylist(username, id)
  }
}
