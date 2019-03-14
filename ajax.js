
const Ajax = {
		ajax:null,

		init(){
			if(!this.ajax){
				this.ajax =  new XMLHttpRequest();
			}

			return this.ajax;
		},

		get(url, callback){
			if(typeof(url) !== "string"){
				console.log("Wrong type of argument!");
				return;
			}

			let request = this.init();
			request.open("GET", url, true);
			request.send();
			request.onreadystatechange = callback;
		}
	}
	
	