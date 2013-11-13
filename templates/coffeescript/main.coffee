# global require
'use strict'

require.config(
  shim:
    underscore:
      exports: '_'
    backbone:
      deps: [
        'underscore'
        'jquery'
      ]
      exports: 'Backbone'
    bootstrap:
      deps: ['jquery']
      exports: 'jquery'<% if (templateFramework === 'handlebars') { %>
    handlebars:
      exports: 'Handlebars'<% } %>
  paths:
    async: '../bower_components/async/lib/async'
    jquery: '../bower_components/jquery/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'
    human_view: '../bower_components/human_view/human-view'
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'<% if (templateFramework === 'handlebars') { %>
    handlebars: '../bower_components/handlebars/handlebars'<% } %>

)

require.onError = console.error.bind(console)

define("app", ["lib/application"], (Application) -> new Application())

require [
    'backbone'
    'jquery'
    'app'
    'routers'
    'models'
    'views'
    'bootstrap'
  ], (Backbone, $, app, Routers, Models, Views) ->

    window.app = app

    app.addInitializer( (options, callback) ->
      $(-> callback())
      return
    )

    app.addInitializer( ->
      app.routers = Routers
      app.views = Views
      app.models = Models
    )

    app.on("start", ->

      # app.router = new Routers.MainRouter()

      # app.view = new app.views.MainView()
      # app.view.render()
      # $("body").append(app.view.el)

      Backbone.history.start()

      return
    )

    app.start()
