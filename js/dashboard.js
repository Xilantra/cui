  /*CoralHR Dashboard*/
  /*Equal height, calendar, snap sidebar, sparkline */

/**Equal height for each row*************************************/
$.fn.eqHeights = function(options) {

    var defaults = {  
        child: false ,
      parentSelector:null
    };  
    var options = $.extend(defaults, options); 

    var el = $(this);
    if (el.length > 0 && !el.data('eqHeights')) {
        $(window).bind('resize.eqHeights', function() {
            el.eqHeights();
        });
        el.data('eqHeights', true);
    }

    if( options.child && options.child.length > 0 ){
        var elmtns = $(options.child, this);
    } else {
        var elmtns = $(this).children();
    }

    var prevTop = 0;
    var max_height = 0;
    var elements = [];
    var parentEl;
    elmtns.height('auto').each(function() {

      if(options.parentSelector && parentEl !== $(this).parents(options.parentSelector).get(0)){
        $(elements).height(max_height);
        max_height = 0;
        prevTop = 0;
        elements=[];
        parentEl = $(this).parents(options.parentSelector).get(0);
      }

        var thisTop = this.offsetTop;

        if (prevTop > 0 && prevTop != thisTop) {
            $(elements).height(max_height);
            max_height = $(this).height();
            elements = [];
        }
        max_height = Math.max(max_height, $(this).height());

        prevTop = this.offsetTop;
        elements.push(this);
    });

    $(elements).height(max_height);
};

// can't have the same pattern for some reason or it scans the page and makes all the same height. Each row should be separate but it doesn't work that way.
$(window).load(function() {

  $('.row [class*="col-"]').eqHeights({parentSelector:'.row'});
  });         


/**Calendar*************************************/
(function($) {

	"use strict";

	var options = {
		events_source: 'events.json.php',
		view: 'month',
		tmpl_path: 'tmpls/',
		tmpl_cache: false,
		day: '2013-03-12',
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		}
	};

	var calendar = $('#calendar').calendar(options);

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function(){
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({first_day: value});
		calendar.view();
	});

	$('#language').change(function(){
		calendar.setLanguage($(this).val());
		calendar.view();
	});

	$('#events-in-modal').change(function(){
		var val = $(this).is(':checked') ? $(this).val() : null;
		calendar.setOptions({modal: val});
	});
	$('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
		//e.preventDefault();
		//e.stopPropagation();
	});
}(jQuery));


/**Snap Sidebar*************************************/
        var snapper = new Snap({
            element: document.getElementById('content'),
            //disable: 'left',
                transitionSpeed: 0.4,
                easing: 'easeOut',
                dragger: document.getElementById('nav')
            });

        $("#open-left").click(function() {
            if( snapper.state().state=="left" ){
            snapper.close('left');
        }else {
            snapper.open('left');
        }
        });

        $("#open-right").click(function() {
            if( snapper.state().state=="right" ){
            snapper.close('right');
        }else {
            snapper.open('right');
        }
        });


/**Sparkline*************************************/
$(".line").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
    type: 'line'});

$(".bar").sparkline([5,6,7,2,0,-4,-2,4], {
    type: 'bar',
    tooltipSuffix: " Coral"});

$(".tristate").sparkline([1,1,0,1,-1,-1,1,-1,0,0,1,1], {
    type: 'tristate'});

$(".discrete").sparkline([4,6,7,7,4,3,2,1,4,4], {
    type: 'discrete'});


$(".bullet").sparkline([10,12,12,9,7], {
    type: 'bullet'});

$(".pie").sparkline([1,1,2], {
    type: 'pie'});


$(".box").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], {
    type: 'box'});

// Values to render
var values = [5,6,7,9,9,5,3,2,2,4,6,7];

// Draw a sparkline for the #sparkline element
$(".lineB").sparkline(values, {
    type: 'line',
    width: '100%',
    height: '50',
    lineColor: '#ffffff',
    spotColor: '#b12f00',
    minSpotColor: '#b12f00',
    maxSpotColor: '#b12f00',
    fillColor: 'transparent'});

$(".barB").sparkline([5,6,7,2,0,-7,-4,-2,4,-4,-2,4,-2,-1,-2,4,0,-7,-9,8,5,3], {
    type: 'bar',
    height: '50',
    barWidth: 10,
    barSpacing: 2,
    barColor: '#ffffff',
    negBarColor: '#b12f00'});

$(".tristateB").sparkline([1,1,0,1,-1,-1,1,-1,0,0,1,1,1,0,1,-1,-1,1,-1,0,0,1,1], {
    type: 'tristate',
    height: '60',
    posBarColor: '#ff7f00',
    negBarColor: '#bf005f',
    zeroBarColor: '#7f7f7f',
    barWidth: 10,
    barSpacing: 2,
    zeroAxis: false,
    });

$(".discreteB").sparkline([4,6,7,7,4,3,2,1,4,4], {
    type: 'discrete',
    width: '200',
    height: '150'});

$(".bulletB").sparkline([10,12,12,9,7], {
    type: 'bullet',
    width: '100%'});

$(".pieB").sparkline([1,1,2,1,2,1,1,1], {
    type: 'pie',
    width: '200',
    height: '200',
    sliceColors: ['#999','#888','#777','#666','#555','#444','#333','#222'],
    offset: -40,
    borderWidth: 9,
    borderColor: '#00bfbf'});


$(".boxB").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], {
    type: 'box',
    width: '100%'});