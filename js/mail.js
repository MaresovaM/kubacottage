/* global $*/

// TODO: Update mail to the real one.
/** Main contact e-mail adderss */
var CONTACT_MAIL = "martin.jacek.mares@gmail.com";

/** Sending... button value - for lovcalization */
var HTML_SENDING = 'Odesílám...';

/** 
 * Sends mail from the reservation form using formspree.io service.
 */
$("#sendmail").click(function () {
	// Disable button change to prevent double send
	$("#sendmail").addClass("disabled");
	var origSendmailButtonHtml = $("#sendmail").html();
	$("#sendmail").html(HTML_SENDING);
	// Hide possible allerts from last calls
	$("#sendresult-ok").addClass("hidden");
	$("#sendresult-error").addClass("hidden");
	// Construct mail message (scramble little bit e-mail address)
	var msg = $("#frommail").val();
	msg = msg.replace(new RegExp('@', 'g'), " (zavinac) ");
	msg = "Tazatel:" + msg.replace(new RegExp('\\.', 'g'), "(tecka)") + "\n";
	msg = msg + "Osob: " + $("#guestcount").val() + "\n\n";
	msg = msg + $("#msgboddy").val();
	// Submit to the formspree.io service
	$.ajax({
	    url: "https://formspree.io/" + CONTACT_MAIL, 
	    method: "POST",
	    data: {
	    	message: msg,
	    	_subject: "Zprava z webovek chalupy",
	    	_gotcha: $("#gotcha").val()
	    },
	    dataType: "json",
	    complete: function() {
	    	// Enable sending again
	    	$("#sendmail").removeClass("disabled");
	    	$("#sendmail").html(origSendmailButtonHtml);
	    },
	    success: function() {
	    	$("#sendresult-ok").removeClass("hidden");
	    	$("#reservationform").trigger("reset");
	    },
	    error: function() {
	    	$("#sendresult-error").removeClass("hidden");
	    }
	});
});