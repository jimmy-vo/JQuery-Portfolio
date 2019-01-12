
// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", function(){
	$('#layout_header').load('_t_header.html', function(responseTxt, statusTxt, xhr){

		if(statusTxt == "success"){
			$('#headerTemplate').html($('#hidden_header').html());
			if ($('#hidden_pageno').html() !== '-1')
			{
				$('#navigation li:eq(' + $('#hidden_pageno').html() + ')').addClass("selected");
			}
		}

		if(statusTxt == "error"){
		  	alert("Failed to load header: " + xhr.status + ": " + xhr.statusText);
		}
	});

    $('#layout_footer').load('_t_footer.html', function(responseTxt, statusTxt, xhr){

		if(statusTxt == "success"){

		}

		if(statusTxt == "error"){
		  	alert("Failed to load footer: " + xhr.status + ": " + xhr.statusText);
		}
	});
});