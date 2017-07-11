/*
07/10/17
Webscrapter for the xkcd comics
at xkcd.com. saves them to a folder
by wisemonkey 

generate xkcd commic page urls
from https://xkcd.com/1/
to   https://xkcd.com/1861/ -- the latest comic as of 7/10/17 
*/

var request = require('request');
var cheerio = require('cheerio');

var download = require('./lib/download')

var websiteURL = 'https://xkcd.com/';

var start  = 0;
var end = 1861;

for(var i = 0; i <= end - start ; i++){

	var url = websiteURL + (i + start) +'/';

	var comicIndex = (i + start)

	scrapeXKCD(url,comicIndex);
}




function scrapeXKCD(URL, index){

	request(URL, function (error, response, html) {
		
	  if (!error && response.statusCode == 200) {
	  	var $ = cheerio.load(html);
	  	var imgFileName, temp = "";

		var imgUrl = $('img[alt="' + $("#ctitle").text() +'"]').attr('src');

		if(typeof imgUrl === "string"){

			imgUrl      = imgUrl.slice(2, imgUrl.length);

			imgUrl      = 'http://' + imgUrl;

			imgFileName = imgUrl.slice(28, imgUrl.length);

			imgFileName = index + "_"+  imgFileName.replace("/", "_");
			
			imgFileName = imgFileName.replace("_cropped_(1)", "").replace("_(1)", "");

			download(
				imgUrl,  // example //imgs.xkcd.com/comics/quantum.png
				'comics/' + imgFileName, 
				function (state) {},
				function (response) {},
				function (error) {}, 
				function () {}
			);

		}else{
			console.log("ERROR image url not found! : ",imgUrl);
		}
		



		console.log("imgFileName : ",imgFileName);
	  }
	});

}


function print(x){ console.log(x);}