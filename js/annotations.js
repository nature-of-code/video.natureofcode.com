"use strict";

var pop;
var urlCache = {};
var fullscreen = false;

Popcorn(function() {

	$("#annotations").find("a")
		.attr("target","_blank")
		.attr("onclick","linkClick(event);");

	pop = Popcorn.vimeo(
		'#video',
		page.vimeoURL
	);

	parseAnnotations();

	$("#goFullscreen").click( function() {
		toggleFullScreen();
	});		

	$(document).bind("fullscreenchange", function() {
	    if ($(document).fullScreen()) {

	    	$("#videoBox").addClass("full");
			$("#footnotesBox").addClass("full");

	    } else {

	    	$("#videoBox").removeClass("full");
			$("#footnotesBox").removeClass("full");

	    }
	});	

	$("#showAnnotations").click( function() {

		$("#annotationsBox").slideToggle('slow', function() {
			if ($(this).is(":visible")) {
				 $("#showAnnotations").text('Hide Annotations');                
			} else {
				 $("#showAnnotations").text('View All Annotations');              
			} 				
		});
	});

	//pop.play();
});

function toggleFullScreen() {

	$(document).toggleFullScreen();

}

function parseAnnotations() {

	$('#annotations').children().each(function(index,value) {

		// Parse start and end times

		var startTime, endTime;

		if ($(this).is("[data-start]"))
				startTime = Popcorn.util.toSeconds( $(this).attr('data-start'));
			else
				return -1;

		if ($(this).is("[data-end]"))
				endTime = Popcorn.util.toSeconds( $(this).attr('data-end'));
			else
				endTime = null;

		if ( !$.isNumeric(startTime)) return -1;

		if  ( !$.isNumeric(endTime)) endTime = startTime + 10;

		// Cue the footnote in Popcorn

		pop.footnote({
			start: startTime,
			end: endTime,
			text: $(this).html(),
			target: "footnotesBox",
			//effect: 'applyclass',
			//applyclass: 'show'				
		});

		// Add a direct link to the spot in the video

		var videoLink = $("<div>")
			.html($(this).attr('data-start'))
			.attr('href','#')
			.attr('data-start', startTime)
			.addClass('videoLink')
			.click( function() {

				var cueTime = $(this).attr('data-start');
				pop.currentTime(cueTime);

			});

		$(this).before(videoLink);

	});

}

function linkClick(e) {

	var anchor = $(e.target);

	if (anchor.attr('data-displaycode') == "true") {
		//console.log("Display code");

		$("a.current").removeClass("current");
		anchor.addClass("current");

		displayCode(anchor.attr('href'));

		e.preventDefault();
	}

	pop.pause();
	$(document).fullScreen(false);
}

function getAPIURL(url) {
	var regex = /^https?:\/\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/[^\/]+\/(.*)/g;

	var match = regex.exec(url);
	
	var host = match[1];
	var user = match[2];
	var repository = match[3];
	var type = match[4];
	var path = match[5];

	var newURL = "https://api.github.com/repos/" + user + "/" + repository + "/contents/" + path;

	return newURL;

}

function displayCode(url) {
	var url = getAPIURL(url);

	if (urlCache[url] != null) {
		//console.log("Cached");
		displayCodeData(urlCache[url]);
	} else {

		$.ajax({
			url:url, 
			success:function (data, status, xhr) {
				if (urlCache[this.url] == null) urlCache[this.url] = data;
				displayCodeData(data);
			}
		});
	}
}

function displayCodeData(data) {
	if ( $.isArray(data) ) {

		//console.log("Tab clean-up");
		$("#codetabs").html("");

		$(data).each( function(index, value) {
			var tabLink = $("<a/>")
				.html(value["name"])
				.attr("href", value["html_url"])
				.attr("data-displaycode", "true")
				.attr("onclick","linkClick(event);");

			if (index == 0) {
				tabLink.addClass("current");
			}

			$("#codetabs").append(tabLink);
		});

		displayCode(data[0]["html_url"])

	} else {

		var decodedContents = (atob(data.content.replace(/\n/g, "")));
		$("#code").text(decodedContents);

		$("#code").html( prettyPrintOne( $("#code").html() ) );
		$("#codebox").slideDown();
	}

}