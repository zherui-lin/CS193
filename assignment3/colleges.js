var univArray = new Array(
	{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
	{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
	{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
	{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
	{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
	{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
	{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
	{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
	{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
	{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
);

function searchUniv() {
	var form = document.getElementsByTagName("form")[0];
	var ownership = form.ownership.value;
	var tuition = form.tuition.value;
	var high = form.high.value;
	var low = form.low.value;
	var univDisplay = new Array();
	for (var univ of univArray) {
		if (ownership !== "none" && univ.ownership !== ownership) {
			continue;
		}
		if (tuition !== "" && univ.tuition > parseInt(tuition)) {
			continue;
		}
		if (high !== "" && univ.SATh > parseInt(high)) {
			continue;
		}
		if (low != "" && univ.SATl < parseInt(low)) {
			continue;
		}
		univDisplay.push(univ);
	}
	return univDisplay;
}

function updateDisplay() {
	var univDisplay = searchUniv();
	var header = document.getElementById("header");
	var tbody = header.parentElement;
	while (header.nextElementSibling) {
		tbody.removeChild(header.nextElementSibling); // element can only be removed by parent
	}
	for (var index in univDisplay) {
		var univ = univDisplay[index];
		var tr = document.createElement("tr");
		var {nickname, SATh, SATl, tuition} = univ;
		univ = {nickname, SATh, SATl, tuition};
		for (var prop in univ) {
			var td = document.createElement("td");
			td.innerHTML = univ[prop];
			tr.appendChild(td);
		}
		if (index % 2 != 0) {
			tr.classList.add("odd");
		}
		tbody.appendChild(tr);
	}
}

document.getElementById("update").addEventListener("click", updateDisplay);
