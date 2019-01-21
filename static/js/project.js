var lightboxClass = 'lightbox';


function AddItem(title, link, images) 
{
	var element_li = document.createElement("li"); 

	if(link != "#")
	{
		var element_a = createTextElement("a", title);  
		element_a.href = link;
		element_a.classList.add('font-title');
		element_li.appendChild(element_a);
	}
	else
	{
		var element_h1 = createTextElement("a", title);  
		element_h1.classList.add('font-title');
		element_li.appendChild(element_h1);
	}

	if (images != null)
	{
		var element_img  = document.createElement("img"); 
		var	url_thb = "../static/images/thumb/"+ images + ".jpg";
		element_img.src = url_thb;
		element_img.alt = images +  ".jpg";

		var element_a  = document.createElement("a"); 
		var	url_org = "../static/images/large/"+ images + ".jpg";
		element_a.href = url_org;
		element_a.classList.add(lightboxClass);

		TooltipImageEvent(element_img, url_org);
		element_a.appendChild(element_img);
		element_li.appendChild(element_a);
	}
	

	document.getElementById("project").appendChild(element_li);
	return element_li;
}


function AddDescription(element_li, topic, bullet) 
{
	for (var i = 0; i<topic.length; i++) 
	{
		var element_h2 = createTextElement("h2", topic[i]); 
		element_h2.classList.add('font-normal');
		element_li.appendChild(element_h2);
	}

	if (bullet.length>0) 
	{
		var element_ul = document.createElement("ul"); 
		element_li.appendChild(element_ul);
		for (var i = 0; i<bullet.length; i++) 
		{
			var element_li1 = createTextElement("li", bullet[i]); 
			element_li1.classList.add('font-bullet');
			element_ul.appendChild(element_li1);
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
			
			// var element_clear =  createTextElement("p", "");
			// element_clear.style.clear = 'both';
			// element_li.appendChild(element_clear);	
		}

	}

   	new LuminousGallery(document.getElementsByClassName(lightboxClass));
});