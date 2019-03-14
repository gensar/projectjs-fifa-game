window.onload = function(){
	let DataManager = {};

	let screenData = {
		teamsCollectionObject:{},
		resultsCollectionObject: {},
		matchesCollectionObject: {},
		initFlag: true
	}

	let objectName = 'matchesCollectionObject';
	let chosenMatchRow = {};
	let chosenMatch = {};

	let urlConfiguration = dataType =>{
		let url = null;
		switch(dataType){
			case 'teams':
				url = 'http://worldcup.sfg.io/teams/';
				break;
			case 'results':
				url = 'http://worldcup.sfg.io/teams/group_results';
				break;
			case 'country-info':
				url = 'http://worldcup.sfg.io/matches/country?fifa_code=' + countryCode;
				break;
			case 'matches':
				url = 'http://worldcup.sfg.io/matches';
				break;
		}
		return url;
	}

	let currentMatch = {};

	DataManager.getData = function(dataType, collectionObject, countryCode){
		let url = urlConfiguration(dataType);
		let callbackFn = function(){
			if (this.readyState == 4 && this.status == 200) {
				screenData[collectionObject] = JSON.parse(this.responseText);
   				console.log(screenData[collectionObject]);
  			}
  			if(screenData.initFlag && Array.isArray(screenData[collectionObject])){
  				for(let i=0; i < screenData[collectionObject].length; i++){
  					currentMatch = screenData[collectionObject][i];
  					if(i < 15){
  						let htmlOwner = document.getElementById("matches-body");
  			
  						htmlOwner.innerHTML += '<tr onclick="onRowClick(this)"><td>' + currentMatch.home_team.country + ' - ' + currentMatch.away_team.country + '</td>' + 
  						'<td>' + currentMatch.away_team.country + '</td>' +
  						'<td>' + currentMatch.home_team.country + '</td><td>' + currentMatch.home_team.goals + '-' + currentMatch.away_team.goals + '</td>' + 
  						'<td>' + currentMatch.winner + '</td><td>' + currentMatch.time + '</td></tr>'
  					} 				
  				}
  				
  			}
  			
		}
		Ajax.get(url, callbackFn);
	}

	
	DataManager.getData('matches', objectName);

	changeLayoutOnMatchSelect = function(){
		let elementsCollection = document.getElementsByClassName('additional');
		for(let i=0; i < elementsCollection.length; i++){
			elementsCollection[i].classList.remove('hide');
		}
		
		document.getElementById("matchInfo").classList.remove('hide');
		//document.getElementById("opponents-info").classList.remove('hide');
		let htmlOwner = document.getElementById("matches-body");
		htmlOwner.innerHTML = '<tr><td>' + chosenMatch.home_team.country + ' - ' + chosenMatch.away_team.country + '</td>' + 
  		'<td>' + chosenMatch.away_team.country + '</td>' +
  		'<td>' + chosenMatch.home_team.country + '</td><td>' + chosenMatch.home_team.goals + '-' + chosenMatch.away_team.goals + '</td>' + 
  		'<td>' + chosenMatch.winner + '</td><td>' + chosenMatch.time + '</td><td>' + chosenMatch.location + '</td>' + '<td>' + chosenMatch.venue + '</td>' +
  		'<td>' + chosenMatch.weather.description + '</td></tr>'

  		document.getElementById("att-on-goal").innerHTML = chosenMatch.home_team_statistics.attempts_on_goal;
  		document.getElementById("centered").innerHTML = chosenMatch.home_team_statistics.on_target;
  		document.getElementById("corners").innerHTML = chosenMatch.home_team_statistics.corners;
  		document.getElementById("ball-possess").innerHTML = chosenMatch.home_team_statistics.ball_possession;
  		document.getElementById("pass-acc").innerHTML = chosenMatch.home_team_statistics.pass_accuracy;
  		document.getElementById("red-cards").innerHTML = chosenMatch.home_team_statistics.red_cards;
  		document.getElementById("yellow-cards").innerHTML = chosenMatch.home_team_statistics.yellow_cards;


  		for(let i=0; i < chosenMatch.home_team_statistics.starting_eleven.length; i++){
  			let currPlayer = chosenMatch.home_team_statistics.starting_eleven[i];
  			document.getElementById("home-players").innerHTML += '<tr><td>' + currPlayer.name + '</td><td>' + currPlayer.shirt_number + '</td>' +
  			'<td>' + currPlayer.position + '</td></tr>'
  		}

  		document.getElementById("att-on-goal-g").innerHTML = chosenMatch.away_team_statistics.attempts_on_goal;
  		document.getElementById("centered-g").innerHTML = chosenMatch.away_team_statistics.on_target;
  		document.getElementById("corners-g").innerHTML = chosenMatch.away_team_statistics.corners;
  		document.getElementById("ball-possess-g").innerHTML = chosenMatch.away_team_statistics.ball_possession;
  		document.getElementById("pass-acc-g").innerHTML = chosenMatch.away_team_statistics.pass_accuracy;
  		document.getElementById("red-cards-g").innerHTML = chosenMatch.away_team_statistics.red_cards;
  		document.getElementById("yellow-cards-g").innerHTML = chosenMatch.away_team_statistics.yellow_cards;

  		for(let i=0; i < chosenMatch.away_team_statistics.starting_eleven.length; i++){
  			let currPlayer = chosenMatch.away_team_statistics.starting_eleven[i];
  			document.getElementById("guest-players").innerHTML += '<tr><td>' + currPlayer.name + '</td><td>' + currPlayer.shirt_number + '</td>' +
  			'<td>' + currPlayer.position + '</td></tr>'
  		}
  	}

  	searchFn = function(){
  		let searched = document.getElementById("search-bar").value;
  		searched = searched.toLowerCase();
  		if(!searched){
  			for(let i=0; i < screenData.matchesCollectionObject.length; i++){
  				currentMatch = screenData.matchesCollectionObject[i];
  				if(i < 15){
  					let htmlOwner = document.getElementById("matches-body");
 					htmlOwner.innerHTML += '<tr onclick="onRowClick(this)"><td>' + currentMatch.home_team.country + ' - ' + currentMatch.away_team.country + '</td>' + 
  					'<td>' + currentMatch.away_team.country + '</td>' +
  					'<td>' + currentMatch.home_team.country + '</td><td>' + currentMatch.home_team.goals + '-' + currentMatch.away_team.goals + '</td>' + 
  					'<td>' + currentMatch.winner + '</td><td>' + currentMatch.time + '</td></tr>'
  				} 				
  			}
  			return;
  		}
  		//save searched 
  		let oldSearchedCollection = JSON.parse(localStorage.getItem("searchedCollection"));
  		let searchedCollection = [];

  		if(oldSearchedCollection){
  			localStorage.removeItem("searchedCollection");
  		}
 
  		let newSearchedCollection = [];
  		newSearchedCollection.push(searched);

  		if(oldSearchedCollection && oldSearchedCollection.length > 0 && newSearchedCollection && newSearchedCollection.length > 0){
  			searchedCollection = [...oldSearchedCollection, ...newSearchedCollection]
  		}
  		else{
  			searchedCollection = newSearchedCollection;
  		}
  		localStorage.setItem("searchedCollection", JSON.stringify(searchedCollection));

  		let firstFilteredCollection = screenData.matchesCollectionObject.filter(item => item.home_team_country.toLowerCase().indexOf(searched) > -1);
  		let secondFilteredCollection = screenData.matchesCollectionObject.filter(item => item.away_team_country.toLowerCase().indexOf(searched) > -1);
  		let thirdFilteredCollection = screenData.matchesCollectionObject.filter(item => item.home_team.goals === searched);
  		let fourthFilteredCollection = screenData.matchesCollectionObject.filter(item => item.away_team.goals === searched);
  		
  		let filteredCollection = [...firstFilteredCollection, ...secondFilteredCollection, ...thirdFilteredCollection, ...fourthFilteredCollection];

  		let htmlOwner = document.getElementById("matches-body");
  			htmlOwner.innerHTML = null;

  		for(let i = 0; i < filteredCollection.length; i++){
  			let currentMatch = filteredCollection[i];
  			htmlOwner.innerHTML += '<tr onclick="onRowClick(this)"><td>' + currentMatch.home_team.country + ' - ' + currentMatch.away_team.country + '</td>' + 
  			'<td>' + currentMatch.away_team.country + '</td>' +
  			'<td>' + currentMatch.home_team.country + '</td><td>' + currentMatch.home_team.goals + '-' + currentMatch.away_team.goals + '</td>' + 
  			'<td>' + currentMatch.winner + '</td><td>' + currentMatch.time + '</td></tr>'
  		}
  	}

  	document.getElementById("searchForm").addEventListener("submit", function(event){
    	event.preventDefault();
   		searchFn();
	});

	getMoreData = function(){
		DataManager.getData('results', 'resultsCollectionObject');
		//let team = 
		changeLayoutOnMatchSelect();
	}
  

	//table manipulations
	onRowClick = function(row){
		chosenMatchRow = row;
		console.log("CHOSEN IS " + row);

		for(let i=0; i < screenData.matchesCollectionObject.length; i++){
			if(chosenMatchRow.rowIndex == (i+1)){
				chosenMatch = screenData.matchesCollectionObject[i];
				break;
			}
		}

		getMoreData();
		
	}

	//history of searches
	getHistoryOfSearches = function(){
		window.location.href="./history.html";
	}

	document.getElementById("historyBtn").addEventListener("click", function(event){
    	event.preventDefault();
   		getHistoryOfSearches();
	});

}
