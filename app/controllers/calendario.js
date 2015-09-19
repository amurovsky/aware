var args = arguments[0] || {};
var moment = require('moment');

moment.locale('es', {
    weekdaysShort : ["D", "L", "M", "M", "J", "V", "S"],
    week : {
        dow : 0 // Monday is the first day of the week.
    }
});

function init() {
	$.vCalendar.init();
}

function cerrarVentana () {
	Alloy.Globals.navigator.goBack();
}


function calendarChange(e) {
  	if (e.type == 'month') {
  		$.lMonth.text = e.date.format("MMM");
  		$.lYear.text = e.date.format("YYYY");
  		$.btnPrev.title = moment(e.date).subtract(1, 'months').format("MMM");
  		$.btnNext.title = moment(e.date).add(1, 'months').format("MMM");
  	} else if (e.type == 'selected') {
  		loadEvents();
  	}
}

function loadEvents() {
    var moment = require('moment');
    var yesterday = moment().subtract(1, 'd').format('DD-MM-YYYY');
	var fuck = Ti.UI.createLabel({text:'fuck',top:0,right:0});
    // The calendar has 2 children structures: [week, dates]. We only need dates
    var children = $.vCalendar.getView().children[1].children;
    //Ti.API.info(JSON.stringify(children[0].children));
    for (var i=0; i<children.length; i++) {
        if (yesterday == moment(children[i].date).format('DD-MM-YYYY')) {
            // children[i].backgroundColor = 'gray';
            //children[i].add(fuck);
            // or you can add a new view, e.g.
            children[i].add( $.UI.create('View', { classes: 'imc-calendar-event-yellow' }) );
        }
    };
}

function prevMonth(e) {
  	$.vCalendar.previous();
}

function nextMonth(e) {
  	$.vCalendar.next();
}

// Advanced 

// function getDate(e) {
  	// this.title = 'Get month - ' + $.vCalendar.get().format("DD-MMM-YYYY");
// }
// 
// function setDate(e) {
  	// $.vCalendar.set( new Date(1986, 1, 20, 0, 0, 0, 0) );
// }


// var params = {
    // column: 4, // from 0 to 6
   	// weekText: "Sun"
 // };
 
function weekFormatter(params) {
  	var vDate = $.UI.create('View', { classes: 'calendar-week calendar-week-' + params.column });
		vDate.add( $.UI.create('Label', { text: params.weekText, classes: 'calendar-week-label calendar-week-label-' + params.column }) );
	return vDate;
}

/*
 params = {
 	index: 0,  // from 0 to 41, 41 dates of a month view, row = Math.floor(params.index / 7)
 	column: 0, // from 0 to 6
 	dateId: "2015-04-23T00:00:00+07:00", // iso string with timezone
 	dateText: 31,
 	isThisMonth: true,
 	isToday: false
 } 
 * */
function dateFormatter(params) {
  	var  viewClasses = ['calendar-date'],
		labelClasses = ['calendar-date-label'];
	
	if (params.isThisMonth) {
		if (params.isToday) {
			viewClasses.push('calendar-today');
  			labelClasses.push('calendar-today-label');
		}
	} else {
	 	viewClasses.push('calendar-disabled');
		labelClasses.push('calendar-disabled-label');
	}
	
	viewClasses.push('calendar-date-' + params.column);
	labelClasses.push('calendar-date-label-' + params.column);
	
	var vDate = $.UI.create('View', { date: params.dateId, classes: viewClasses.join(' ') });
   		vDate.add( $.UI.create('Label', { text: params.dateText, classes: labelClasses.join(' ') }) );
   		
   		var yesterday = moment().subtract(1, 'd').format('DD MMM YYYY');
		var dateId = moment(params.dateId).format('DD MMM YYYY');
		if (dateId === yesterday) {
			var vEvents = $.UI.create('View', { classes: 'imc-calendar-events' });
			vEvents.add( $.UI.create('View', { classes: 'imc-calendar-event imc-calendar-event-yellow' }) );
			vEvents.add( $.UI.create('View', { classes: 'imc-calendar-event imc-calendar-event-blue' }) );
			vEvents.add( $.UI.create('View', { classes: 'imc-calendar-event imc-calendar-event-red' }) );
			vDate.add(vEvents);
		}
		
	return vDate;
}

init();


this.close = function(){
	$.destroy();
};