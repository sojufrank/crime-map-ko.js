// global map variable
var map;

//hide filter dropdowns until api call is completed
$('#dropDownHide').hide();

//start app
$( document ).ready(function() {
    app()
});

var app = function(){
	$.getJSON('https://data.seattle.gov/resource/7ais-f98f.json', function(data) {
		//remove first object in array because its not a report object.  
		data.shift();

		//hide loading screen and show filter dropdowns
		$('#loader-div').hide();
		$('#dropDownHide').show();

		//call knockout.js to apply data to the view
		ko.applyBindings(new ViewModel(data));

	});

	var ViewModel = function(arr){

		var self = this;

		//function from seticon.js to set icon location
		arr = setIcon(arr);

		//mapData holds model data. other arrays are to hold drop down data
		this.mapData = ko.observableArray([]);
		this.dateDropDown = [];
		this.crimeDropDown = [];

		//parse and push objects into arrays
		arr.forEach(function(object){
			//create bool called active and set it true (used display marker)
			object.active = true;
			self.mapData.push(object);
			self.dateDropDown.push(object.date_reported.substring(0,10));
			self.crimeDropDown.push(object.summarized_offense_description);
		})

		//sort filter dropdown arrays and remove duplicates
		this.crimeDropDown = this.crimeDropDown.sort().filter(function(item, pos){
			return self.crimeDropDown.indexOf(item) == pos;
		})
		this.dateDropDown = this.dateDropDown.sort().filter(function(item, pos){
			return self.dateDropDown.indexOf(item) == pos;
		});

		// add ALL option into filter drop down arrays
		this.crimeDropDown.unshift("ALL");
		this.dateDropDown.unshift("ALL");

		// create ko.observable for data-bind 
		this.selectDate = ko.observable();
		this.selectCrime = ko.observable();

		// update markers when drop down triggers change event
		this.mapMarkerUpdate = function(){
			this.mapClear();
			self.dropDownParse();
			self.makeMarker();
		}

		// modify obj.active flag depending on state of drop down filters
		this.dropDownParse = function(){
			date = self.selectDate();
			crime = self.selectCrime();
			self.mapData().forEach(function(obj){

				dateCheck = obj.date_reported.substring(0,10);
				crimeCheck = obj.summarized_offense_description;

				if(date == "ALL" && crime == "ALL"){
					obj.active = true;
				}
				else if(date == "ALL" && crime != "ALL"){
					if(crime == crimeCheck){obj.active = true} 
					else {obj.active = false}
				}
				else if(date != "ALL" && crime == "ALL"){
					if(date == dateCheck){obj.active = true}
					else{obj.active = false}
				}
				else {
					if(date == dateCheck && crime == crimeCheck){ obj.active = true}
					else{ obj.active = false}
				}
			});			
		}

		//creates a google map and sets it to seattle
		this.initMap = function(){
		    map = new google.maps.Map(document.getElementById('map'), {
		        center: {lat: 47.6062, lng: -122.3321},
		        zoom: 14,
		        mapTypeControl: false,
		        styles: style,
		    });
		}

		// draws markers on google map
		this.makeMarker = function(){
		    self.mapData().forEach(function(obj){

		    	//check obj.active flag to create markers
		    	if(obj.active == true){
			    	coords = new google.maps.LatLng(obj.location.latitude, obj.location.longitude)
			    	obj.marker = new google.maps.Marker({
			    		map:map,
			    		position: coords,
			    		title: obj.summarized_offense_description,
			    		icon: obj.icon,
			    	});

			    	//click event for each marker
			    	obj.marker.addListener('click', function(){
			    		
			    		//this is to close open info windows before opening a new one
			    		self.mapData().forEach(function(obj){
			    			if(obj.infoWindow){obj.infoWindow.close()}
			    		});

			    		var date = obj.date_reported;
			    		date = date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
			    		
			    		//html template for infowindow data view
			    		obj.infoWindow = new google.maps.InfoWindow({
			    			content: '<div class="infoWindow">'+
			    			'<div class="iw-offense">'+obj.offense_type.split('-').join(' ')+'</div>'+
			    			'<div class="iw-address">'+obj.hundred_block_location+'</div>'+
			    			'<div class="iw-date">'+date+' <i class="fa fa-clock-o"></i>'+
			    			'<span class="iw-time"> '+obj.date_reported.substring(11,16)+'</span></div>'+
			    			'</div>',
			    		});

			    		//opens infowindow on click
			    		obj.infoWindow.open(map, obj.marker);
			    	});
		    	}
		    })
		}

		//iterate through all objects and if a marker exists set it to null to clear it from map
		this.mapClear = function(){
			this.mapData().forEach(function(obj){
				if(obj.marker != null){obj.marker.setMap(null);}
			})
		}

		// calls to draw map and draw markers
		this.initMap();
		this.makeMarker();
	}
}