/*
 * AddItem
 *
 * param date
 * param description
 * param images
 * param count
 * return  none
 */
function AddItem(title, link, images, count) 
{
	var element_li = document.createElement("li"); 

	if(link != "#")
	{
		var element_a = createTextElement("a", title);  
		element_a.href = link;
		element_li.appendChild(element_a);
	}
	else
	{
		element_li.appendChild(createTextElement("h1", title));
	}


	if (images != null)
	{
		var element_img  = document.createElement("img"); 
		var	url = "../static/images/thumb/"+ images + ".jpg";
		element_img.src = url;
		element_img.alt = images +  ".jpg";

		TooltipImageEvent(element_img, url);

		element_li.appendChild(element_img);
	}


	document.getElementById("project").appendChild(element_li);


	if(count%2 !== 0)
		element_li.classList.add("zebra_background");

	return element_li;
}

/*
 * AddDescription
 *
 * param element_li
 * param topic
 * param bullet
 */
function AddDescription(element_li, topic, bullet) 
{
	for (var i = 0; i<topic.length; i++) 
	{
		element_li.appendChild(createTextElement("h2", topic[i]));
	}

	if (bullet.length>0) 
	{
		var element_ul = document.createElement("ul"); 
		element_li.appendChild(element_ul);
		for (var i = 0; i<bullet.length; i++) 
		{
			element_ul.appendChild(createTextElement("li", bullet[i]));
		}
	}
	
}


document.addEventListener("DOMContentLoaded", function(){
	var overview_xml = loadXML("../static/xml/project.xml");

	for (var i=0; i<overview_xml.getElementsByTagName('project').length; i++)
	{
		var item = overview_xml.getElementsByTagName('project')[i];
		var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
		var link = item.getElementsByTagName('link')[0].firstChild.nodeValue;
		var images = (item.getElementsByTagName('image')[0] != undefined)?
						item.getElementsByTagName('image')[0].firstChild.nodeValue:
						null;

		var element_li = AddItem(title , link, images, i);
		for (var j=0; j<item.getElementsByTagName('description').length; j++)
		{	
			var topic=[];
			var bullet=[];
			var subitem = item.getElementsByTagName('description')[j];
			for (var k=0; k<subitem.getElementsByTagName('topic').length; k++)
			{	
				topic[k] = subitem.getElementsByTagName('topic')[k].firstChild.nodeValue;
			}
			for (var l=0; l<subitem.getElementsByTagName('bullet').length; l++)
			{	
				bullet[l] = subitem.getElementsByTagName('bullet')[l].firstChild.nodeValue;
			}
			AddDescription(element_li, topic, bullet) 
		}

	}
});