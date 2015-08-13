(function() {

        // Var declarations
        var $bookingForm = $('#bookingData');
        var $calendar = $('#calendar');
        var lastView;
        var i = 0;

        // Init calendar
        $calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
            selectable: true,
            selectHelper: true,
            // Triger function when event clicked
            select: function(start, end) {
                var view = ($calendar.fullCalendar('getView'));
                if(view.name == 'agendaDay'){
                    i++;
                    $calendar.fullCalendar('clientEvents', function(existingEvents){
                        console.log('Existing event ' + i + ' start: ' + existingEvents.start);
                        console.log('Existing event ' + i + ' end: ' + existingEvents.end);
                    })
                    if(i > 1){
                        var eventData;
                        if (title) {
                            eventData = {
                                title: title,
                                start: start,
                                end: end
                            };
                            $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                        }
                        $calendar.fullCalendar('unselect');   
                    }
                    
                }
            },
            // Change the view to agenda when day clicked
            dayClick: function(date, jsEvent, view){
                if(view.name == 'month' || view.name == 'basicWeek'){
                    $calendar.fullCalendar('changeView', 'agendaDay');
                    $calendar.fullCalendar('gotoDate', date);
                }
            },
            // Watch the actual and last view
            viewRender: function(view, element){
                if (lastView == undefined) { lastView = 'firstRun';  }
                if (view.name != lastView ){
                    if(view.name == 'agendaDay'){
                        console.log('Vista: ' + view.name);
                    }
                    if(view.name == 'month'){
                        i =0;
                        console.log('Vista: ' + view.name);
                    }
                    lastView = view.name;
                }
            },
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            minTime: "6:00:00",// agenda settings
            maxTime: "22:00:00",
            snapDuration: "01:00:00",
            slotEventOverlap: false,
            events: [
                {
                    title: 'Meeting',
                    start: '2015-08-14T10:00:00',
                    end: '2015-08-14T12:00:00'
                }
                
            ]
        });
        
})();


