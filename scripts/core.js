/*   
* Author : Jijo John
* Company : Shades Team (Singlelinelogics)
* Date : 7 april 2015
* (C) Jijo John @ shades
*/

var shadesUiModule = (function () {

/* Global Variables */
	
var backgroundSwitch = [];

/* Global Variables end */	
	
var InitPrototypes = {


 timeInit : function() {

	 Date.prototype.getFormattedTime  = function()
	 {
		 

	   var dateOb = new Date() , suffix = "AM", timeData = [];
	   var hours = dateOb.getHours();
	   var minutes = dateOb.getMinutes();
	   if (minutes < 10){ minutes = "0" + minutes;};
	   if(hours >= 12){ suffix = "PM";hours = hours - 12;}
	   if(hours == 0 ) { hours = 12;}
	   timeData.push(hours,minutes,suffix);
	   return timeData; //Return Data array
		 
	 }
 },

 dateInit: function() {

	Date.prototype.getFormattedDate = function()
    {
		
      var dateData = [];
      var day = this.getDay();
	  var month = this.getMonth();
	  var year=this.getFullYear();
	  var months = ['January','February','March','April','May','June' , 'July' , 'August', 'September ','October' , 'November' ,'December'];
	  dateData.push(months[month],day,year);
      return dateData;
    
	}

 }
	
}



    var switchBg = function (inputStream) {

        this.arrayInput = inputStream;

        if (this.arrayInput instanceof Array || this.arrayInput != '') {
           
			var i;

            for (i = 0; i < inputStream.length; i++) {

                backgroundSwitch.push(inputStream[i]);

            }

        }
        else 
		{
            
			console.log('Something wrong with the input !')

        }


        var j = 0;
        
		var r = backgroundSwitch.length - 1;

        var shufflePic = function () {

            var elementHolder = document.getElementById('containerHolder');
            
			elementHolder.style.backgroundImage = 'url("' + backgroundSwitch[j] + '")';
            
			(j < r) ? j++ : j = 0;
        }


        window.addEventListener("load", setInterval(shufflePic, 5000), false);


    };
	
	
	
 var timeAndDate = function(type,dateElement) {	
	 
     this.typeInputs = type;
	 
	 this.dateElements = dateElement;
	
	 
	 InitPrototypes.timeInit();  //init the time prototype
	 
	 InitPrototypes.dateInit();  //init the date prototype
	
	 DateString = new Date(); //date object
	 
	 
     var typeInputsKey , typeInputlength = 0;
	 
	 for(typeInputsKey in this.typeInputs)
	 {
	
		(this.typeInputs.hasOwnProperty(typeInputsKey)) ? typeInputlength++ : typeInputlength = 0 ;			
		
	 }
	
	
	 var elementincrement;
	 
	 if(this.dateElements instanceof Array && this.dateElements != '' && typeInputlength <= 2)
	 {
		 
		 for(elementincrement =0; elementincrement < this.dateElements.length ; elementincrement ++)
		 {
		 
		    try
			 
			{
     			var elementSelector = document.querySelector(this.dateElements[elementincrement]);
	 			
				elementSelector.innerHTML = DateString.getFormattedDate() + DateString.getFormattedTime();
			 }
			catch(ex)
			 
			{
				 console.log(ex.message);
				 
		    }
			 
		 }
		 
		     
    }
	 
	 else
	 {
	
		 console.log('Something wrong with the input!');
		 
	 }
	 
	 
	 
	
  }
	
  var weatherApi = function(uriInput)
   {
	 this.uriStream = uriInput;
	   
	 if(this.uriStream !== '' && typeof uriInput == string)
	 {
		
		 
	   JSON.parse(); //In Development
		 
		 
	 }
	  else
	  {
		  
		console.log('invalid Input');  
	  
	  
	  }
		 

	
}
  
  return {
	  
    setBg: function(input){
		
		switchBg(input)
	},
	  
     showTime : function(type , elements){ 
	
		 timeAndDate(type, elements);
	 }
  
  };

})();


shadesUiModule.setBg(['../R/Background.jpg','../R/Background_a.jpg']);

shadesUiModule.showTime({object1:"object1", object2 : "object2"}, ['#div1' , '.div2']);

