class Listener {
  constructor (playlistsService, songsService, mailSender) {
    this._playlistsService = playlistsService
    this._songsService = songsService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen (message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString())

      const playlist = await this._playlistsService.getPlaylistById(playlistId)
      const songs = await this._songsService.getSongsOnPlaylist(playlistId)
      const data = {
        playlist: { ...playlist, songs }
      }

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data))
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
