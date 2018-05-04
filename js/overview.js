/**

 * overview: for overview

 *

 * Project: Assignment_9

 * Author: Jimmy Vo

 * Date Created: April 10 2018

 */


/*
 * AddItem
 *
 * param date
 * param description
 * param images
 * param count
 * return  none
 */
function AddItem(date, description, images, count) 
{
	var element_li = document.createElement("li"); 

	var element_h2 = document.createElement("h1");  
	element_h2.innerHTML  = date;
	element_li.appendChild(element_h2);

	var element_blockquote = document.createElement("h2");  
	element_blockquote.innerHTML  = description;
	element_li.appendChild(element_blockquote);

	document.getElementById("overview").appendChild(element_li);

	for (var i=1; i<9; i++)
	{
		var element_img  = document.createElement("img"); 
		var	url = "images/"+ images + "("+ i + ").jpg";
		if (ImageExist(url))
		{
			// console.log("set: " + url);
			element_img.src = url;
			element_img.alt = images  + i +  ".jpg";

			TooltipImageEvent(element_img, url);

			element_li.appendChild(element_img);
		}
		else
		{
			break;
		}
	}	

	if(count%2 !== 0)
		element_li.classList.add("zebra_background");

}


/*
 * load
 *
 * return  none
 */
function load() 
{	
	document.getElementsByTagName("li")[0].classList.add("selected");
	var overview_xml = loadXML("xml/overview.xml");

	for (var i=0; i<overview_xml.getElementsByTagName('bullet').length; i++)
	{
		var item = overview_xml.getElementsByTagName('bullet')[i];
		var common_name = item.getElementsByTagName('date')[0].firstChild.nodeValue;
		var description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
		var images = item.getElementsByTagName('image')[0].firstChild.nodeValue;

		AddItem(common_name , description , images, i);
	}
}

// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", load);