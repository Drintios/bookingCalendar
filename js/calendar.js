(function() {

        // Var declarations
        var $bookingForm = $('#bookingData');
        var $calendar = $('#calendar');
        var lastView;
        var i = 0;
        var create = true;
        var now = moment();

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
                // Get the current view of the calendar
                var view = ($calendar.fullCalendar('getView'));
                // if view is agendaDay evaluate if counter of selects inside the calendar is > than 1, as the calendar as soon as you click a day switch to agenda day and we are trying to get the time selection event and not navigation one
                if(view.name == 'agendaDay'){
                    i++;
                    if(i > 1){
                        var validForm = $('#bookData').isValid();
                        var title = $('#nombre').val() + ' ' + $('#apellido').val();
                        var eventData;
                        // Store the new event data
                        if (title) {
                            eventData = {
                                title: title,
                                start: start,
                                end: end
                            };
                            $calendar.fullCalendar('clientEvents', function(existingEvents){
    
                                // Existing events data
                                var existingEventDateStart = existingEvents.start.date();
                                var existingEventDateEnd = existingEvents.end.date();
                                var existingEventTimeStart = existingEvents.start.hour();
                                var existingEventTimeEnd = existingEvents.end.hour();
                                var existingEventDuration = parseInt(existingEventTimeEnd) - parseInt(existingEventTimeStart);

                                // New event Data
                                var newEventDateStart = eventData.start.date();
                                var newEventDateEnd = eventData.end.date();
                                var newEventTimeStart = eventData.start.hour();
                                var newEventTimeEnd = eventData.end.hour();
                                var newEventDuration = parseInt(newEventTimeEnd) - parseInt(newEventTimeStart);

                                if(existingEventDateStart == newEventDateStart){
                                    
                                    // calculate the diference betwen the time start of the existing and the new event
                                    var collapseCalcForEarlyNew = parseInt(existingEventTimeStart) - parseInt(newEventTimeStart);
                                    var collapseCalcForLaterNew = parseInt(newEventTimeStart) - parseInt(existingEventTimeStart);

                                    // if the start of the new event is earlier than the existing one evaluate the diference which if less than diference is a collapse, then if the start of the new event is later than the existing one evaluate the diference which if les than the existing event duration is a collapse, then evaluate if events start and end at same time which is obviusly a collapse =D, if there is a collapse var create turns into false.                                   
                                    if( ( parseInt(newEventTimeStart) < parseInt(existingEventTimeStart) && parseInt(newEventDuration) > parseInt(collapseCalcForEarlyNew) ) || ( parseInt(newEventTimeStart) > parseInt(existingEventTimeStart) && parseInt(existingEventDuration) > parseInt(collapseCalcForLaterNew) ) || ( parseInt(newEventTimeStart) === parseInt(existingEventTimeStart) && parseInt(newEventTimeEnd) === parseInt(existingEventTimeEnd) ) ){

                                        create = false;

                                    }
                                }
                            });
                            
                            // if create false dont create the event a throws a message to ask for new time.
                            if(create && validForm && now.date() == eventData.start.date() && now.hour() < eventData.start.hour()){
                                $('#fecha').val(eventData.start.date() + "/" + eventData.start.month() + "/" + eventData.start.year());
                                $('#hora').val(eventData.start.hour() + ':00 - ' + eventData.end.hour() + ':00');
                                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                            }

                            else{
                                if (now.date() > eventData.start.date()) {
                                    alert('Por favor seleccione un dia mayor o igual al actual');
                                }
                                else if(now.hour() >= eventData.start.hour() && now.date() > eventData.start.date()){
                                    alert('Por favor seleccione un nuevo horario mayor al actual');
                                }
                            }
                            
                        }
                        // Clear selection
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
                },
                {
                    title: 'Hiking',
                    start: '2015-08-14T13:00:00',
                    end: '2015-08-14T15:00:00'
                }
                
            ]
        });
        
})();


