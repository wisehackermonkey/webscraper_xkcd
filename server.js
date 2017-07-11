var request = require("request");
var cheerio = require('cheerio');

var download = require('./lib/download')
var opn = require('opn');
var fs = require('fs');
var websiteURL = 'https://xkcd.com/';
var xkcdURLs = [];
var http = 'http://';
//generate xkcd commic page urls
//106 - 1861 is .png
var start  = 106;
var end = 1861;

for(var i = 0; i <= end - start ; i++){
	var x = (i + start);
	scrapeXKCD(websiteURL + x +'/', x);
}

console.log('All done downloading!');






function scrapeXKCD(URL, index){

	request(URL, function (error, response, html) {
		
	  if (!error && response.statusCode == 200) {
	  	var $ = cheerio.load(html);
	  	

		
		
	  	var title = $("#ctitle").text();
				
		var rawURL = $('img[alt="' + title +'"]').attr('src');
		
		for(var i = 0; i < title.length; i++){

		    title = title.replace("/", "").replace(" ", "_");

		}


		if(typeof rawURL === "string"){
			var url = http + rawURL.slice(2, rawURL.length);
			var imageFileName = Number(index) + '_' + title + '.png';

			download(
				url,
				'comics/' + imageFileName, 
				function (state) {},
				function (response) {},
				function (error) {}, 
				function () {}
			);

		}else{
			console.log("ERROR url is not found",rawURL);
		}
		



		//console.log("url           : ",url);
		console.log("imageFileName : ",imageFileName);
		//console.log("downloading....:", Math.random());
	  }
	});

}

print("server running...");

function print(x){ console.log(x);}