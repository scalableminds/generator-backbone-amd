### define
app : app
backbone : Backbone
human_view : HumanView
underscore : _
templates : templates
###


class <%= _.classify(name) %>View extends HumanView

  template : templates.<%= _.slugify(name) %>


  render : ->

    @renderAndBind()
