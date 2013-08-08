var jsonData = require('./data.json');
var fs = require('fs');

var videos = jsonData.videos.video;

for (var i = 0; i < videos.length; i++) {

	var video = videos[i];

	var fullTitle = video.title.replace(" (The Nature of Code)", "");

	var shortTitle = fullTitle.replace("Intro ", "").toLowerCase();

	if (shortTitle.indexOf(" ") > 0) {

		shortTitle = shortTitle.substring(0, shortTitle.indexOf(" "));

	}

	var fileName = video.upload_date.substring(0,10) + "-" + shortTitle + ".html";

	fs.writeFile( "../_posts/" +fileName, 
		"---\n" +
		"layout: post\n" +
		"title: \"" + fullTitle + "\"\n" +
		"vimeoURL: http://vimeo.com/" + video.id + "\n" +
		"nocURL: http://natureofcode.com/book/" + "\n" +
		"---\n",
		null);

	console.log(fileName);

}