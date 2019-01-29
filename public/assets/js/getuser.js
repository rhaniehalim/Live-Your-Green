$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return (results && results[1]) || 0;
}

var userId = $.urlParam('user'); // id

if(userId) {
    localStorage.setItem('id', userId);
}