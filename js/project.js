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
function AddItem(title, link, description, count) 
{
	var element_li = document.createElement("li"); 

	var element_a = document.createElement("a");  
	element_a.innerHTML  = title;
	element_a.href = link;
	element_li.appendChild(element_a);

	var element_blockquote = document.createElement("h2");  
	element_blockquote.innerHTML  = description;
	element_li.appendChild(element_blockquote);

	document.getElementById("project").appendChild(element_li);


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
	document.getElementsByTagName("li")[2].classList.add("selected");
	var overview_xml = loadXML("xml/project.xml");

	for (var i=0; i<overview_xml.getElementsByTagName('bullet').length; i++)
	{
		var item = overview_xml.getElementsByTagName('bullet')[i];
		var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
		var link = item.getElementsByTagName('link')[0].firstChild.nodeValue;
		var description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
		
		AddItem(title , link,description  , i);
	}
}

// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", load);