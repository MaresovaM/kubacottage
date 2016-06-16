function sendmail () {
	$.ajax({
	    url: "https://formspree.io/marketa.maresova@gmail.com", 
	    method: "POST",
	    data: {message: document.getElementById("teloZpravy").value},
	    dataType: "json"
	});
}