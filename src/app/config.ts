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




	public static setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	public static getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	public static checkCookie(name) {
		var user = this.getCookie(name);
		if (user != "") {
			return true;
		} else {
			return false;
		}
	}	
} 