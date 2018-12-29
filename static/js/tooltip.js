var OffsetX  = 35;
var OffsetY = 20;

/*
 * TooltipFollow
 *
 * param evt
 * return    none
 */
function TooltipFollow(evt) 
{
    var e = window.event || evt; 
	var imageTooltipheight = parseInt(document.getElementById("preview").height);
	var imageTooltipwidth = parseInt(document.getElementById("preview").width);


    var Y = parseInt(e.clientY) + OffsetY;
    if (Y + imageTooltipheight >= OffsetY + document.documentElement.clientHeight  )
    {
    	Y -= imageTooltipheight + OffsetY*1.5;
    }

    var X = parseInt(e.clientX) + OffsetX;
    var leftEdge = (X - imageTooltipwidth/2 <= OffsetX)? true:false;
    var rightEdge = (X + imageTooltipwidth/2 >= OffsetX + document.documentElement.clientWidth)?true:false;

    if (leftEdge !== rightEdge)
    {
	    if (rightEdge)
	    {
	    	X = document.documentElement.clientWidth - OffsetX - imageTooltipwidth*3/2;
	    }
	    else 
	    {
	    	X = OffsetX + imageTooltipwidth/2;
	    }
	}


	var imageTooltip = document.getElementById("preview");
    imageTooltip.style.left = X + 'px';  
    imageTooltip.style.top = Y + 'px';   
}

/*
 * TooltipHide
 *
 * return    none
 */
 function TooltipHide()
 { 	
	var imageTooltip = document.getElementById("preview");
	imageTooltip.style.visibility = "hidden";
 }


/*
 * TooltipShow
 *
 * param argument
 * return    none
 */
function TooltipShow(argument) 
{
	var imageTooltip = document.getElementById("preview");
	imageTooltip.src = argument;
	imageTooltip.alt = argument;
	imageTooltip.style.visibility = "visible";
}


/*
 * TooltipImageEvent
 *
 * param element
 * param url
 * return    none
 */
function TooltipImageEvent(element, url) 
{	
	OffsetX = -document.getElementById("preview").width/2;

	(function(myUrl, element) {
		element.addEventListener("mousemove", TooltipFollow);
		element.addEventListener("mouseout", TooltipHide);
		element.addEventListener('mouseover', function(){TooltipShow(myUrl)} ); 
	})(url, element);
}
