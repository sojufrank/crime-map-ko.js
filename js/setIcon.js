
var setIcon = function(array){

	array.forEach(function(obj){

		switch(obj.summarized_offense_description) {
	        //person icons
	        case "ASSAULT":
	            obj.icon = "images/person/Assault.png";
	            break;
	        case "WEAPON":
	            obj.icon = "images/person/DriveBy.png";
	            break;
	        case "DISPUTE":
	            obj.icon = "images/person/DriveBy.png";
	            break;
	        case "HOMICIDE":
	            obj.icon = "images/person/Homicide.png";
	            break;
	        case "ROBBERY":
	            obj.icon = "images/person/Robbery.png";
	            break;
	        case "THREATS":
	            obj.icon = "images/person/Threats.png";
	            break;

	        //drugs and vice icons
	        case "LIQUOR VIOLATION":
	            obj.icon = "images/drugsAndVice/Liquor Violation.png";
	            break;
	        case "NARCOTICS":
	            obj.icon = "images/drugsAndVice/Narcotics.png";
	            break;
	        case "OTHER VICE":
	            obj.icon = "images/drugsAndVice/Other Vice.png";
	            break;
	        case "PROSTITUTION":
	            obj.icon = "images/drugsAndVice/Prostitution.png";
	            break;
	        case "OBSTRUCT":
	            obj.icon = "images/drugsAndVice/Stay Out of Area of Drugs.png";
	            break;
	        case "STAY OUT OF AREA OF PROSTITUTION":
	            obj.icon = "images/drugsAndVice/Stay Out of Area of Prostitution.png";
	            break;

	        //property theft and crime
	        case "BIKE THEFT":
	            obj.icon = "images/propertyTheftAndCrime/Bike Theft.png";
	            break;
	        case "THEFT OF SERVICES":
	            obj.icon = "images/propertyTheftAndCrime/Other Property.png";
	            break;
	        case "STOLEN PROPERTY":
	            obj.icon = "images/propertyTheftAndCrime/Pickpocket.png";
	            break;
	        case "LOST PROPERTY":
	            obj.icon = "images/propertyTheftAndCrime/Fraud and Financial.png";
	            break;
	        case "EMBEZZLE":
	            obj.icon = "images/propertyTheftAndCrime/Fraud and Financial.png";
	            break;
	        case "EXTORTION":
	            obj.icon = "images/propertyTheftAndCrime/Fraud and Financial.png";
	            break;
	        case "BURGLARY":
	            obj.icon = "images/propertyTheftAndCrime/Burglary.png";
	            break;
	        case "CAR PROWL":
	            obj.icon = "images/propertyTheftAndCrime/Car Prowl.png";
	            break;
	        case "FRAUD":
	            obj.icon = "images/propertyTheftAndCrime/Fraud and Financial.png";
	            break;
	        case "COUNTERFEIT":
	            obj.icon = "images/propertyTheftAndCrime/Other Property.png";
	            break;
	        case "MAIL THEFT":
	            obj.icon = "images/propertyTheftAndCrime/Mail Theft.png";
	            break;
	        case "OTHER PROPERTY":
	            obj.icon = "images/propertyTheftAndCrime/Other Property.png";
	            break;
	        case "PROPERTY DAMAGE":
	            obj.icon = "images/propertyTheftAndCrime/Property Damage.png";
	            break;
	        case "PICKPOCKET":
	            obj.icon = "images/propertyTheftAndCrime/Pickpocket.png";
	            break;
	        case "SHOPLIFTING":
	            obj.icon = "images/propertyTheftAndCrime/Shoplifting.png";
	            break;
	        case "VEHICLE THEFT":
	            obj.icon = "images/propertyTheftAndCrime/Vehicle Theft.png";
	            break;

	        //transportation icons
	        case "DUI":
	            obj.icon = "images/transportation/DUI.png";
	            break;
	        case "HARBOR":
	            obj.icon = "images/transportation/Harbor.png";
	            break;
	        case "METRO":
	            obj.icon = "images/transportation/Metro.png";
	            break;
	        case "TRAFFIC":
	            obj.icon = "images/transportation/Traffic.png";
	            break;

	        //misc icons
	        case "ANIMAL COMPLAINT":
	            obj.icon = "images/misc/Animal Complaint.png";
	            break;
	        case "VIOLATION OF COURT ORDER":
	            obj.icon = "images/misc/Disorderly Conduct.png";
	            break;
	        case "WARRANT ARREST":
	            obj.icon = "images/misc/Arrest.png";
	            break;
	        case "DISORDERLY CONDUCT":
	            obj.icon = "images/misc/Disorderly Conduct.png";
	            break;
	        case "DISTURBANCE":
	            obj.icon = "images/misc/Disturbance.png";
	            break;
	        case "FALSE ALARM":
	            obj.icon = "images/misc/False Alarm.png";
	            break;
	        case "FALSE REPORT":
	            obj.icon = "images/misc/False Alarm.png";
	            break;
	        case "ILLEGAL DUMPING":
	            obj.icon = "images/misc/Illegal Dumping.png";
	            break;
	        case "INJURY":
	            obj.icon = "images/misc/Injury.png";
	            break;
	        case "TRESPASS":
	            obj.icon = "images/misc/Trespass.png";
	            break;
	        case "BURGLARY-SECURE PARKING-RES":
	            obj.icon = "images/misc/Unsafe Conditions.png";
	            break;
	        default:
	            obj.icon = "images/drugsAndVice/Other Vice.png"
	    }
	});
	return array;
}