Template.timeline.onRendered ->
  # Session.set 'limits', {
  #   start: moment('2016-04-10 00:00').valueOf()
  #   stop: moment('2016-04-12 1:00').valueOf()
  # }

  # instance = @
  # instance.autorun ->
  limits = Session.get 'limits'

  Meteor.call 'getOneDayActivity', limits, (err, res)->
    if err or !res? then return

    # console.log 'getOneDayActivity', res

    # res.rows.map (each)->
    #   if !each.data? then return each
    #   return each.data.map (eacheach)->
    #     eacheach.type = TimelineChart.TYPE.INTERVAL
    #     return eacheach

    element = document.getElementById('timeline')
    # timeline = new TimelineChart(element, res.rows, {
    #   height: window.innerHeight
    #   # tip: (d)->
    #   #   return d.at || d.from+'<br>'+d.to
    # })

    # d3.select("body").append("p").text("New paragraph!");

    # res.rows.forEach (row)->
    #   if !row.data? then return row
    #   # <rect class="interval" width="0.4788766597469589" height="8.256" y="1.032" x="224.9499056362853"></rect>
    #   row.data.forEach (each)->

    scaledBy = 1
    data = res.rows
    barWidth = window.innerWidth / data.length
    width = barWidth * data.length
    scale = (time)-> (-1) * (res.min - time) / (1000 * 60) # 1px is 1 minute
    height = scale(res.max)

    svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height * scaledBy)
      .append('g')
      .attr('transform', ()-> "scale(1,"+scaledBy+")")

    people = svg.selectAll('.person')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'person')
      .attr('transform', (d, i)-> "translate(" + barWidth*i + ", 0)")


    people
      .append('rect')
      .attr('class', 'box')
      .attr('height', height)
      .attr('width', barWidth)
      .attr('x', barWidth)
      .attr('y', 0)

    people
      .on('mouseover', (d)->
        # console.log('mouseover', d)
        $('input').val(d.label)
      )
      .on('mouseout', (d)->
        # console.log('mouseout', d)
      );

    # title = people.attr('clip-path', 'url(#chart-content)')
    #   # .attr('class', 'item')
    #   .append('text')
    #   # .append('svg:title')
    #   .text((d)-> return d.label)
    #   # .attr('font-size', '20px')
    #   .attr('fill', 'white')

    # getClass = (d,i) ->
    #   diff = scale(d.to) - scale(d.from)
    #   c = 'interval '
    #   if diff < 10
    #     c += 'small'
    #   else if diff < 40
    #     c += 'middle'
    #   else if diff < 100
    #     c += 'long'
    #   else
    #     c += 'extra'
    #   return c

    interval = people.selectAll('.interval')
      .data((d)-> return d.data)
      .enter()
      .append('rect')
      # .attr('class', getClass)
      .attr('height', (d)->
        if d.to < d.from then return 0
        scale(d.to) - scale(d.from)
      )
      .attr('width', barWidth)
      .attr('x', barWidth)
      .attr('y', (d)-> height - scale(d.to))
      # .classed(getClass(d,i), true)



