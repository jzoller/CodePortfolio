var weatherApp = require('./WeatherApp.js');

exports.testGeneratePathForHttpRequest = function(test){
	test.equal('/forecastrss?w=2499999&u=f', weatherApp.generatePathForHttpRequest(2499999));
	test.done();
}

exports.testGenerateHttpOptionsForHttpRequest = function(test){
	var path = weatherApp.generatePathForHttpRequest(2499999);
	test.equal('weather.yahooapis.com', weatherApp.generateHttpOptionsForHttpRequest(path).host);
	test.equal(80, weatherApp.generateHttpOptionsForHttpRequest(path).port);
	test.equal('/forecastrss?w=2499999&u=f', weatherApp.generateHttpOptionsForHttpRequest(path).path);
	test.done();
}

exports.testParseDataFromWebRequest = function(test){
	htmlContentString = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><rss version="2.0" xmlns:yweather="http://xml.weather.yahoo.com/ns/rss/1.0" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"><channel><title>Yahoo! Weather - Stinson, KY</title><link>http://us.rd.yahoo.com/dailynews/rss/weather/Stinson__KY/*http://weather.yahoo.com/forecast/USKY1005_f.html</link><description>Yahoo! Weather for Stinson, KY</description><language>en-us</language><lastBuildDate>Sat, 13 Jul 2013 8:49 pm EDT</lastBuildDate><ttl>60</ttl><yweather:location city="Stinson" region="KY"   country="United States"/><yweather:units temperature="F" distance="mi" pressure="in" speed="mph"/><yweather:wind chill="79"   direction="70"   speed="5" /><yweather:atmosphere humidity="64"  visibility="10"  pressure="30.12"  rising="1" /><yweather:astronomy sunrise="6:16 am"   sunset="8:53 pm"/><image><title>Yahoo! Weather</title><width>142</width><height>18</height><link>http://weather.yahoo.com</link><url>http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif</url></image><item><title>Conditions for Stinson, KY at 8:49 pm EDT</title><geo:lat>38.31</geo:lat><geo:long>-82.88</geo:long><link>http://us.rd.yahoo.com/dailynews/rss/weather/Stinson__KY/*http://weather.yahoo.com/forecast/USKY1005_f.html</link><pubDate>Sat, 13 Jul 2013 8:49 pm EDT</pubDate><yweather:condition  text="Fair"  code="34"  temp="79"  date="Sat, 13 Jul 2013 8:49 pm EDT" /><description><![CDATA[<img src="http://l.yimg.com/a/i/us/we/52/34.gif"/><br /><b>Current Conditions:</b><br />Fair, 79 F<BR /><BR /><b>Forecast:</b><BR />Sat - Partly Cloudy. High: 84 Low: 66<br />Sun - Mostly Sunny. High: 90 Low: 66<br />Mon - Sunny. High: 93 Low: 68<br />Tue - Isolated Thunderstorms. High: 94 Low: 70<br />Wed - Scattered Thunderstorms. High: 91 Low: 69<br /><br /><a href="http://us.rd.yahoo.com/dailynews/rss/weather/Stinson__KY/*http://weather.yahoo.com/forecast/USKY1005_f.html">Full Forecast at Yahoo! Weather</a><BR/><BR/>(provided by <a href="http://www.weather.com" >The Weather Channel</a>)<br/>]]></description><yweather:forecast day="Sat" date="13 Jul 2013" low="66" high="84" text="Partly Cloudy" code="29" /><yweather:forecast day="Sun" date="14 Jul 2013" low="66" high="90" text="Mostly Sunny" code="34" /><yweather:forecast day="Mon" date="15 Jul 2013" low="68" high="93" text="Sunny" code="32" /><yweather:forecast day="Tue" date="16 Jul 2013" low="70" high="94" text="Isolated Thunderstorms" code="37" /><yweather:forecast day="Wed" date="17 Jul 2013" low="69" high="91" text="Scattered Thunderstorms" code="38" /><guid isPermaLink="false">USKY1005_2013_07_17_7_00_EDT</guid></item></channel></rss><!-- api18.weather.gq1.yahoo.com Sun Jul 14 01:31:26 PST 2013 -->';
	test.deepEqual(['Stinson', 'KY', '79'], weatherApp.parseDataFromWebRequest(htmlContentString));
	test.done();
}

exports.testParseDataFromWebRequestWhenWOEIDDoesntExist = function(test){
	htmlContentString = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><rss version="2.0" xmlns:yweather="http://xml.weather.yahoo.com/ns/rss/1.0" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"><channel><title>Yahoo! Weather - Error</title><description>Yahoo! Weather Error</description><item><title>City not found</title><description>Invalid Input /forecastrss?w=0&amp;u=f</description></item></channel></rss><!-- api1.weather.bf1.yahoo.com Tue Jul 16 01:09:02 PST 2013 -->';
	var unavailableCityStateAndTemp = ['Unavailable', 'Unavailable', 'Unavailable'];
	test.deepEqual(unavailableCityStateAndTemp, weatherApp.parseDataFromWebRequest(htmlContentString));
	test.done();
}

exports.testGetErrorFromHttpRequest = function(test) {
	var path = weatherApp.generatePathForHttpRequest(0);
	var httpOptions = weatherApp.generateHttpOptionsForHttpRequest(path);
	var handlerFunc = function(error, content){
		var unavailableCityStateAndTemp = ['Unavailable', 'Unavailable', 'Unavailable'];
		test.deepEqual(unavailableCityStateAndTemp, weatherApp.parseDataFromWebRequest(content));
		test.done();
	}
	weatherApp.getHttpResponse(httpOptions, handlerFunc);
}

var isANumber = function(objectToTest){
	return !isNaN(objectToTest);
}

exports.testGetCityAndStateFromHttpRequest = function(test) {
	var path = weatherApp.generatePathForHttpRequest(2499999);
	var httpOptions = weatherApp.generateHttpOptionsForHttpRequest(path);
	var handlerFunc = function(error, content){
		test.equal('Stinson', content[0]);
		test.equal('KY', content[1]);
		test.equal(true, isANumber(content[2]));
		test.done();
	}
	weatherApp.getHttpResponse(httpOptions, handlerFunc);
}

exports.testGetMultipleCitiesAndStatesFromHttpRequest = function(test) {
	var numberOfCitiesRecieved = 0;
	var WOEIDSToTest = [2499999, 2459115, 2295411, 2502265, 2, 2424766, 8775];
	var numberOfCitiesSent = WOEIDSToTest.length;
	var weatherInfoHandler = function(error, content){
		numberOfCitiesRecieved++;
		content.sort();
		if(numberOfCitiesSent === numberOfCitiesRecieved){
			test.equal('Actinolite', content[0][0]);
			test.equal('ON', content[0][1]);
			test.equal(true, isANumber(content[0][2]));
			test.equal('Calgary', content[1][0]);
			test.equal('AB', content[1][1]);
			test.equal(true, isANumber(content[1][2]));
			test.equal('Houston', content[2][0]);
			test.equal('TX', content[2][1]);
			test.equal(true, isANumber(content[2][2]));
			test.equal('Mumbai', content[3][0]);
			test.equal('MH', content[3][1])
			test.equal(true, isANumber(content[3][2]));
			test.equal('New York', content[4][0]);
			test.equal('NY', content[4][1]);
			test.equal(true, isANumber(content[4][2]));
			test.equal('Stinson', content[5][0]);
			test.equal('KY', content[5][1]);
			test.equal(true, isANumber(content[5][2]));
			test.equal('Sunnyvale', content[6][0]);
			test.equal('CA', content[6][1]);
			test.equal(true, isANumber(content[6][2]));
			test.done();
		}
	}
	weatherApp.getWeatherInfoFromWOEIDS(WOEIDSToTest, weatherInfoHandler);
}