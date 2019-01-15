function onMenuSelected(obj) {
	obj.addClass("selected");
	obj.find('img').addClass("selected");
	obj.find('a').addClass("selected");
}

function onMenuUnselected(obj) {
	obj.removeClass("selected");
	obj.find('img').removeClass("selected");
	obj.find('a').removeClass("selected");
}

// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", function(){
	$('#layout_header').load('_t_header.html', function(responseTxt, statusTxt, xhr){

		if(statusTxt == "success"){
			if ($('#hidden_pageno').html() !== '-1')
			{
				for (var i = 0; i < $('#navigation li').length; i++) {
					if (i == $('#hidden_pageno').html()){
						onMenuSelected($('#navigation li:eq(' + i + ')'));
					}
					else{
						var obj = $('#navigation li:eq('+ i +')');

						(function(myobj) {
							myobj.on( "mouseenter", 
								function(){
							 		onMenuSelected(myobj);
							 	});
							myobj.on( "mouseleave", 
								function(){
							 		onMenuUnselected(myobj);
							 	});
						})(obj);
					}
				}
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