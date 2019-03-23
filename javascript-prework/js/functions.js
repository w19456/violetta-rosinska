function printMessage(msg){
	var div = document.createElement('div');
	div.innerHTML = msg;
	document.getElementById('messages').appendChild(div);
}

function clearMessages(){
	document.getElementById('messages').innerHTML = '';
}
//score
function displayScore(won, lost){
	var div = document.createElement('div');
	div.innerHTML = "Twój wynik to: "+ won +":" + lost;
	var scoreDiv = document.getElementById('results');
	scoreDiv.innerHTML = '';
	scoreDiv.appendChild(div);
}