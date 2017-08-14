export var config = {
	title: "Hello World",
	"serviceLink": "http://localhost/projects/services/link/index.php",
	"old": "http://localhost/SecurityAPI",
	"CacheService":"http://localhost/CacheServiceAPI"
}
export class ConfigFunctions{
	public static convertDate(date){
		date = new Date(date);
		let dateChunks = date.toString().split(" ");
		let finalDate = dateChunks[2]+" "+dateChunks[1]+" "+dateChunks[3];
		return finalDate;
	}	
} 