Store = require('../framework/store')

class NoticeStore extends Store
    limit: 20

    constructor: ->
        super
        @skip = 0
        @on('fetched notices', @increment.bind(this))

    url: ->
        return "/api/notices/?limit=#{@limit}&skip=#{@skip}"

    parse: (response) ->
        return response.notices

    increment: ->
        @skip += @limit

    mark: (id) ->
        @ajax({
            method: 'PUT'
            url: "/api/notices/#{id}/read/"
            done: =>
                @trigger('marked notice read', id)
        })

module.exports = NoticeStore
