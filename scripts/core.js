/*   
 * Author : Jijo John @ Shades a.k.a singlelinelogics
 * Date : 7 april 2015
 * (C) Jijo John @ shades
 */
var shadesUiModule = (function() {

    /* Add global variables here */

    var backgroundSwitch = backgroundSwitch || [];

    /* Global Variables end */

    
	var Init = {

        /*  prototypes */


        timeInit: function() {

            Date.prototype.getFormattedTime = function() {


                var dateOb = new Date(),
                    suffix = "AM";
                var hours = dateOb.getHours();
                var minutes = dateOb.getMinutes();
                var seconds = dateOb.getSeconds();
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (hours >= 12) {
                    suffix = "PM";
                    hours = hours - 12;
                }
                if (hours === 0) {
                    hours = 12;
                }
                var finalTime = hours + ":" + minutes + " " + suffix;
                return finalTime;

            };
        },

        dateInit: function() {

            Date.prototype.getFormattedDate = function() {


                var day = this.getDate();
                var month = this.getMonth();
                var year = this.getFullYear();
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September ', 'October', 'November', 'December'];
                var finalData = months[month] + " " + "" + day + "," + " " + year;
                return finalData;

            };

        }




    };


    var switchBg = function(inputStream) {

        this.arrayInput = inputStream;

        if (this.arrayInput instanceof Array || this.arrayInput !== '') //condition validates input stream

        {

            var i;

            for (i = 0; i < inputStream.length; i++) {

                backgroundSwitch.push(inputStream[i]); //adds the input stream data into the background switch array

            }

        } else {

            console.log('Something wrong with the input !'); //logs the error in to the console

        }


        var j = 0; //counter

        var r = backgroundSwitch.length - 1; //stores the length of backgroundSwitch array

        var shufflePic = function() {

            var elementHolder = document.getElementById('containerHolder'); // change in future

            elementHolder.style.backgroundImage = 'url("' + backgroundSwitch[j] + '")';

            (j < r) ? j++ : j = 0;

        };


        window.addEventListener('load', setInterval(shufflePic, 5000), false);


    };



    var timeAndDate = function(elements) {

        Init.timeInit(); //initialize the time prototype

        Init.dateInit(); //initialize the date prototype

        DateString = new Date(); 

        

        var elementsKey, typeInputlength = 0,
            time, date;

        for (elementsKey in elements) {

            (elements.hasOwnProperty(elementsKey)) ? typeInputlength++ : typeInputlength = 0;

            if (typeof elements == 'object' && typeInputlength !== 0) {
                if (typeInputlength <= 2) {

                    if (elementsKey == 'time' || elementsKey == 'date') {


                        time = document.querySelector(elements['time']);

                        time.innerHTML = DateString.getFormattedTime();

                        date = document.querySelector(elements['date']);

                        date.innerHTML = DateString.getFormattedDate();



                    }


                } else {

                    console.log('Invalid object length');

                }

            } else {


                console.log('Invalid input data');


            }




        }


    };


    var LocationData = function( city, country, elements ) { //fetch user's current latitude and longitude  


        var latitude, longitude;

        if (navigator.geolocation) {

            window.addEventListener('load', function() {

                var startPos;

                var geoOptionsObj = {

                    timeout: 10 * 1000
                };


                var geoSuccessCallback = function(position) {


                    startPos = position;

                    latitude = startPos.coords.latitude;

                    longitude = startPos.coords.longitude;

                    weatherApiParser(city, country, elements, latitude, longitude);



                };

                var geoErrorCallback = function(error) {

                    console.log('Something went wrong' + '' + error.code);

                };


                navigator.geolocation.getCurrentPosition(geoSuccessCallback, geoErrorCallback, geoOptionsObj);



            }, false);



        } else {

            console.log('GeoLocation API not supported ! Please Upgrade Your Browser');


        }




    };



    var weatherApiParser = function( city, country, elements, Latitude, Longitude ) {

        //Weather api Uri 
        var uriInput = 'http://api.openweathermap.org/data/2.5/weather?lat=' + Latitude + '&lon=' + Longitude +    '&mode=json&APPID=5153be936572857b83596b648dcf57ff';

        var response, temperatureInCelsius;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4 && xhr.status == 200) {

                response = JSON.parse(xhr.responseText);

                xhr.onerror = function(e) {
                    console.log(e.message)
                };

                temperatureInCelsius = Math.floor((response.main.temp) - 273.15); //temperature in celsius

                for (var i = 0; i < elements.length; i++) {

                    var elementSelector = document.querySelector(elements[i]);

                    elementSelector.innerHTML = parseInt(temperatureInCelsius) + '°C';



                }



            }



        }

        xhr.open("GET", decodeURI(uriInput), true);

        xhr.send();



    };


    var googleSearchSuggestions = function(search_Keyword , element) {

		
		var uri = 'http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=' + search_Keyword;
		
		var xhr = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject(Microsoft.XMLHTTP);
	    
		xhr.onreadystatechange = function(){
		xhr.responseType = 'xml';
			
	    if(xhr.status == 200 && xhr.readyState == 4)
		 {
		
		  var response = xhr.responseXML;	  
		  
        

		
		
         } 
			
		
		
		
		}
		xhr.open('GET', decodeURI(uri), true);
        xhr.send();
      
    };




    return {

        setBg: function(input) {

            switchBg(input);
        },

        showTime: function(elements) {

            timeAndDate(elements);

        },

        CurrentLocation: function(city, country, element) {

            LocationData(city, country, element);


        },
		
		searchSuggest : function(search_Keyword){
		
		    googleSearchSuggestions(search_Keyword);
		
	     }

    };


})();



shadesUiModule.setBg(['../R/Background.jpg']);
shadesUiModule.showTime({
    time: "#time_content",
    date: "#date_content"
});
shadesUiModule.CurrentLocation('London', 'Canada', ['#weather_content']);
shadesUiModule.searchSuggest('Google');