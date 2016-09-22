var map;
$('#dropDownHide').hide();

$( document ).ready(function() {
    app()
});

var app = function(){
	$.getJSON('https://data.seattle.gov/resource/7ais-f98f.json', function(data) {
		data.shift();
		console.log(data);

		$('#loader-div').hide();
		$('#dropDownHide').show();

		ko.applyBindings(new ViewModel(data));

	});

	var ViewModel = function(arr){

		var self = this;

		arr = setIcon(arr);

		this.mapData = ko.observableArray([]);
		this.dateDropDown = [];
		this.crimeDropDown = [];

		arr.forEach(function(object){
			self.mapData.push(object);
			self.dateDropDown.push(object.date_reported.substring(0,10));
			self.crimeDropDown.push(object.summarized_offense_description);
		})

		this.crimeDropDown = this.crimeDropDown.sort().filter(function(item, pos){
			return self.crimeDropDown.indexOf(item) == pos;
		})

		this.dateDropDown = this.dateDropDown.sort().filter(function(item, pos){
			return self.dateDropDown.indexOf(item) == pos;
		});

		this.mapData().forEach(function(obj){obj.active = true});
		this.crimeDropDown.unshift("ALL");
		this.dateDropDown.unshift("ALL");

		this.initMap = function(){
		    map = new google.maps.Map(document.getElementById('map'), {
		        center: {lat: 47.6062, lng: -122.3321},
		        zoom: 14,
		        mapTypeControl: false,
		        styles: style,
		    });
		}

		this.makeMarker = function(){
		    self.mapData().forEach(function(obj){

		    	if(obj.active == true){
			    	coords = new google.maps.LatLng(obj.location.latitude, obj.location.longitude)
			    	obj.marker = new google.maps.Marker({
			    		map:map,
			    		position: coords,
			    		title: obj.summarized_offense_description,
			    		icon: obj.icon,
			    	});

			    	obj.marker.addListener('click', function(){
			    		//console.log(obj.summarized_offense_description);
			    		self.mapData().forEach(function(obj){
			    			if(obj.infoWindow){obj.infoWindow.close()}
			    		});
			    		var date = obj.date_reported;
			    		date = date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
			    		
			    		obj.infoWindow = new google.maps.InfoWindow({
			    			content: '<div class="infoWindow">'+
			    			'<div class="iw-offense">'+obj.offense_type.split('-').join(' ')+'</div>'+
			    			'<div class="iw-address">'+obj.hundred_block_location+'</div>'+
			    			'<div class="iw-date">'+date+' <i class="fa fa-clock-o"></i>'+
			    			'<span class="iw-time"> '+obj.date_reported.substring(11,16)+'</span></div>'+
			    			'</div>',
			    		});
			    		obj.infoWindow.open(map, obj.marker);
			    	});
		    	}
		    })
		}

		this.mapClear = function(){
			this.mapData().forEach(function(obj){
				if(obj.marker != null){obj.marker.setMap(null);}
			})
		}

		this.selectDate = ko.observable();
		this.selectCrime = ko.observable();

		this.test = function(){
			//console.log(this.selectDate());
			this.mapClear();
			self.dropDownParse();
			self.makeMarker();
		}
		this.test2 = function(){
			//console.log(this.selectCrime());
			this.mapClear();
			self.dropDownParse();
			self.makeMarker();
		}
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

		this.initMap();
		this.makeMarker();
	}
}