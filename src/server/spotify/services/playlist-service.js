// @flow
import SpotifyBaseService from './base-service'
import _debug from 'debug'
var debug = _debug('spotify-playlist-service')

export default class PlaylistService extends SpotifyBaseService {
  async create (
    username: string,
    name: string,
    publicFlag: boolean, 
    collaborative: boolean = false) {
      try {
        const response = await this.spotify.createPlaylist(
          username, 
          name, 
          { public: publicFlag && true }
        )
        debug('RES', response)
        return this.parseResponse(response)
      } catch (err) {
        debug(`Error creating playlist ${err}`)
        return err
      }
      
  }

  async update (
    username: string, 
    playlistId: string,
    name: string,
    publicFlag: boolean, 
    collaborative: boolean = false) {
      try {
        const response = await this.spotify.changePlaylistDetails(
          username,
          playlistId,
          name,
          { public: publicFlag && false },
          { collaborative }
        )
        return this.parseResponse(response)
      } catch (err) {
        debug(`Error updating playlist ${err}`)
        return err
      }
  }

  async addTracks (
    username: string, 
    playlistId: string, 
    trackUris: string[], 
    position: number) {
    try {
      const response = await this.spotify.addTracksToPlaylist(
        username,
        playlistId,
        trackUris,
        postion ? { postion } : {}
      )
      return this.parseResponse(response)
    } catch (err) {
      debug(`Error adding tracks to playlist ${err}`)
      return err
    }
  }
  
  /**
   * 
   * 
   * @param {string} username 
   * @param {string} playlistId 
   * @param {[]} tracks [{ uri: "spotify:track:902u4lk" }]
   * @memberof PlaylistService
   */
  async removeTracks (username: string, playlistId: string, tracks: [], options = {}) {
    try {
      const response = await this.spotify.removeTracksFromPlaylist(
        username,
        playlistId,
        tracks,
        options
      )
    } catch (err) {
      debug(`Error removing tracks from playlist ${err}`)
      return err
    }
  }

  async getAll (username: string) {
    try {
      const response = await this.spotify.getUserPlaylists(username)
      return this.parseResponse(response)
    } catch (err) {
      debug(`Error getting all playlists for ${username}. ${err}`)
      return err
    }
  }

  async get (username: string, playlistId: string) {
    try {
      const response = await this.spotify.getPlaylist(username, playlistId)
      return this.parseResponse(response)
    } catch (err) {
      debug(`Error getting playlist ${playlistId}. ${err}`)
      return err
    }
  }
}
