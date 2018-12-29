/**
 * blog.js
 *
 * Project: jimmyvo2410.github.io
 * Author: Jimmy Vo
 * Date Created: May 30 2018
 */

var keyStore = "BLOG_ITEM";
var BlogItem = 0;
var TRUNCATE = 200;
var xmlData
var element_parrent;

function CreateImg(url, isTooltip) 
{
	var element_img  = document.createElement("img"); 
	if (ImageExist(url))
	{
		// console.log("set: " + url);
		element_img.src = url;
		element_img.alt = url;

		if(isTooltip) TooltipImageEvent(element_img, url);
		return element_img;
	}
	else
	{
		return null;
	}
}

/*
 * CreateBlog
 * param 	date
 * param 	description
 * param 	images
 * param 	count
 * return  	none
 */
function CreateBlog(count, isPreview) 
{	
	var item = xmlData.getElementsByTagName('bullet')[count];
	var date = item.getElementsByTagName('date')[0].firstChild.nodeValue;
	var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
	var description = item.getElementsByTagName('description');
	var images = item.getElementsByTagName('image')[0].firstChild.nodeValue;

	var element_li = document.createElement("li"); 
	var element_h1 = document.createElement("h1");  

	var element_Tag = document.createElement('a');
	element_Tag.innerHTML = title;

	element_h1.appendChild(element_Tag);
	element_h1.innerHTML +=  date;

	element_li.appendChild(element_h1);


	if(isPreview === true)
	{
		var element_img  = CreateImg("images/thumb/"+ images + "(1).jpg", false); 
		if (element_img !== null)
		{
			element_li.appendChild(element_img);
		}
		var element_h2 = document.createElement("h2");  
		element_h2.innerHTML  = truncate(description[0].firstChild.nodeValue,TRUNCATE);
		element_li.appendChild(element_h2);
	}
	else
	{
		for (var i=1; i<9; i++)
		{
			var element_img  = CreateImg("images/thumb/"+ images + "("+ i + ").jpg", true); 
			if (element_img !== null)
			{
				element_li.appendChild(element_img);
				// element_img.classList.add("full");
			}
			else
			{
				break;
			}
		}	

		for (var i = 0; i <description.length; i++) 
		{
			var element_h2 = document.createElement("h2");  
			element_h2.innerHTML  = description[i].firstChild.nodeValue;
			element_li.appendChild(element_h2);
			element_h2.classList.add("full");
		}
		element_li.classList.add("selected");
	}			
	
	(function(idx)
	{
		element_li.addEventListener('click', function(){BlogEventMouseIn(idx)});
	}(count));

	
	if(count%2 !== 0)
		element_li.classList.add("zebra_background");

	return element_li;
}


/*
 * LoadStorage
 * return  none
 */
function LoadStorage() 
{
	//localStorage
	BlogItem = localStorage.getItem(keyStore);

	if ((BlogItem === null) || (parseInt(BlogItem)>xmlData.getElementsByTagName('bullet').length)-1)
	{
		BlogItem = 0;
		localStorage.setItem(keyStore, BlogItem);
	}
}

/*
 * BlogEventMouseIn
 * param 	idx
 * return   none
 */
function BlogEventMouseIn(idx) 
{	
	if (idx !== BlogItem)
	{
		element_parrent.getElementsByTagName("li")[BlogItem].replaceWith(CreateBlog( BlogItem,true));
		BlogItem = idx;
		localStorage.setItem(keyStore, BlogItem);
		element_parrent.getElementsByTagName("li")[idx].replaceWith(CreateBlog( idx,false));
		// element_parrent.getElementsByTagName("li")[idx].scrollIntoView(true);
	}
}


document.addEventListener("DOMContentLoaded", function(){	
	document.getElementsByTagName("li")[0].classList.add("selected");
	element_parrent = 	document.getElementById("blog");
	element_parrent.innerHTML = "";


	xmlData = loadXML("xml/blog.xml");
	// LoadStorage();

	for (var i=0; i<xmlData.getElementsByTagName('bullet').length; i++){
		element_parrent.appendChild(CreateBlog(i, (parseInt(BlogItem) !== i)));
	}
});