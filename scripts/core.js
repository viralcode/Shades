/*   
 * Author : Jijo John
 * Company : Shades Team (Singlelinelogics)
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
                    suffix = "AM",
                    timeData = [];
                var hours = dateOb.getHours();
                var minutes = dateOb.getMinutes();
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
                timeData.push(hours, minutes, suffix);
                return timeData; //Return Data array

            };
        },

        dateInit: function() {

            Date.prototype.getFormattedDate = function() {

                var dateData = []; // dateData variable with array data type for returning the current date
                var day = this.getDay();
                var month = this.getMonth();
                var year = this.getFullYear();
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September ', 'October', 'November', 'December'];
                dateData.push(months[month], day, year);
                return dateData;

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



    var timeAndDate = function(type, dateElement) {

        this.typeInputs = type;

        this.dateElements = dateElement;


        Init.timeInit(); //init the time prototype

        Init.dateInit(); //init the date prototype

        DateString = new Date(); //date object

        /* Checks for the object length */

        var typeInputsKey, typeInputlength = 0;

        for (typeInputsKey in this.typeInputs) {

            (this.typeInputs.hasOwnProperty(typeInputsKey)) ? typeInputlength++ : typeInputlength = 0;

        }


        /* End  */


        var elementincrement; //variable

        if (this.dateElements instanceof Array && this.dateElements !== '' && typeInputlength <= 2) // validates the input
        {

            for (elementincrement = 0; elementincrement < this.dateElements.length; elementincrement++) //loops the array
            {

                try

                {
                    var elementSelector = document.querySelector(this.dateElements[elementincrement]);

                    elementSelector.innerHTML = DateString.getFormattedDate() + DateString.getFormattedTime(); //change in future

                } catch (ex)

                {
                    console.log(ex.message);

                }

            }


        } else {

            console.log('Something wrong with the input!'); //logs the error

        }




    };


    var LocationData = function(city, country, elements) { //fetch user's current latitude and longitude  : N:B Tweaks required


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



    var weatherApiParser = function(city, country, elements, Latitude, Longitude) {

        //Weather api Uri 
        var uriInput = 'http://api.openweathermap.org/data/2.5/weather?lat=' + Latitude + '&lon=' + Longitude + '&mode=json&APPID=5153be936572857b83596b648dcf57ff';
        var response, temperatureInCelsius;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4 && xhr.status == 200) {

                response = JSON.parse(xhr.responseText);

                temperatureInCelsius = Math.floor((response.main.temp) - 273.15); //temperature in celsius

                for (var i = 0; i < elements.length; i++) {

                    var elementSelector = document.querySelector(elements[i]);
                    elementSelector.innerHTML = parseInt(temperatureInCelsius) + '°C';



                }



            }



        }

        xhr.open("GET", uriInput, true);
        xhr.send();



    };

    return {

        setBg: function(input) {

            switchBg(input);
        },

        showTime: function(type, elements) {

            timeAndDate(type, elements);

        },

        CurrentLocation: function(city, country, element) {

            LocationData(city, country, element);


        }

    };


})();



shadesUiModule.setBg(['../R/Background.jpg']);
shadesUiModule.showTime({
    object1: "object1",
    object2: "object2"
}, ['#time_content']);
shadesUiModule.CurrentLocation('London', 'Canada', ['.div3']);