window.onload = function(){
	let historyCollection = JSON.parse(localStorage.getItem("searchedCollection"));
	for(let i=0; i < historyCollection.length; i++){
		document.getElementById("list").innerHTML += '<li class="list-group-item">' + historyCollection[i] + '</li>'
	}
}