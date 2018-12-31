/*
 * addEducation
 *
 * param input
 * param iD
 */
 function addEducation(input, iD)
{
	var xml = input.getElementsByTagName('bullet');
	for (var i=0; i<xml.length; i++)
	{
	    var item = xml[i];  

	    var degree = item.getElementsByTagName('degree')[0].firstChild.nodeValue;
	    var date = item.getElementsByTagName('date')[0].firstChild.nodeValue;
	    var institude = item.getElementsByTagName('organization')[0].firstChild.nodeValue;
	    var location = item.getElementsByTagName('location')[0].firstChild.nodeValue;
	    var major = item.getElementsByTagName('major')[0].firstChild.nodeValue;
	    var image = item.getElementsByTagName('image')[0].firstChild.nodeValue;
		var url = "../static/images/thumb/" + image;

		var element_td1 = document.createElement("td");  
		element_td1.appendChild(createTextElement("h1", degree));
		element_td1.appendChild(createTextElement("h2", date));
		element_td1.appendChild(createTextElement("h3", institude + ", " + location));
		element_td1.appendChild(createTextElement("h4", "Area: " + major));

		if (image != "")
		{
			var element_img  = document.createElement("img"); 
			element_img.src = url;
			element_img.alt = image;
			//TooltipImageEvent(element_img, url);

			var element_td2 = document.createElement("td"); 
			element_td2.appendChild(element_img);
		}

		var element_row = document.createElement("tr");  
		element_row.appendChild(element_td1);  
		element_row.appendChild(element_td2);

		document.getElementById(iD).appendChild(element_row);
  	}
}

/*
 * addAward
 *
 * param input
 * param iD
 */
function addAward(input, iD)
{
	var xml = input.getElementsByTagName('bullet');  
	for (var i=0; i<xml.length; i++)
	{
	    var item = xml[i];  

	    var name = item.getElementsByTagName('title')[0].firstChild.nodeValue;
	    var date = item.getElementsByTagName('date')[0].firstChild.nodeValue;
	    var organization = item.getElementsByTagName('organization')[0].firstChild.nodeValue;
	    var description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
	    var image = item.getElementsByTagName('image')[0].firstChild.nodeValue;
		var url = "../static/images/thumb/" + image;

		var element_td1 = document.createElement("td");  
		var element_ul = document.createElement("ul");     
		element_td1.appendChild(element_ul);

		element_td1.appendChild(createTextElement("h1", name));
		element_td1.appendChild(createTextElement("h2", date));
		element_td1.appendChild(createTextElement("h3", organization));
		element_td1.appendChild(createTextElement("h4", description));
		

		if (image != "")
		{
			var element_img  = document.createElement("img"); 
			element_img.src = url;
			element_img.alt = image;
			var element_td2 = document.createElement("td"); 
			element_td2.appendChild(element_img);
		}

		
		var element_row = document.createElement("tr");  
		element_row.appendChild(element_td1);  
		element_row.appendChild(element_td2);

		document.getElementById(iD).appendChild(element_row);
  	}
}

/*
 * addSkill
 *
 * param input
 * param iD
 */
function addSkill(input, iD)
{
	var xml = input.getElementsByTagName('area');
	for (var i=0; i<xml.length; i++)
	{
	    var item = xml[i];  

	    var topic = item.getElementsByTagName('topic')[0].firstChild.nodeValue;

		var element_td1 = document.createElement("td");    
		element_td1.appendChild(createTextElement("h1", topic));

		var element_ul = document.createElement("ul");     
		element_td1.appendChild(element_ul);

		var element_row = document.createElement("tr");  
		element_row.appendChild(element_td1);	


	    var subxml = item.getElementsByTagName('bullet');  
		for (var j=0; j<subxml.length; j++)
		{
		    var name = subxml[j].firstChild.nodeValue;
			element_ul.appendChild(createTextElement("li", name));
		}

		document.getElementById(iD).appendChild(element_row);
  	}
}

/*
 * addSummary
 *
 * param input
 * param iD
 */
function addSummary(input, iD)
{
	var xml = input.getElementsByTagName('bullet');
	var element_td1 = document.createElement("td");    

	var element_tr = document.createElement("tr");     
	element_tr.appendChild(element_td1);
	document.getElementById(iD).appendChild(element_tr);

	var element_ul = document.createElement("ul"); 
	element_td1.appendChild(element_ul);

	for (var i=0; i<xml.length; i++)
	{
	    var item = xml[i];  

	    var name = item.firstChild.nodeValue;

		element_ul.appendChild(createTextElement("li", name));
  	}
}
/*
 * addExperience
 *
 * param input
 * param iD
 * return  none
 */
function addExperience(input, iD)
{
	var xml = input.getElementsByTagName('bullet');
	for (var i=0; i<xml.length; i++)
	{
	    var item = xml[i];  

	    var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
	    var date = item.getElementsByTagName('date')[0].firstChild.nodeValue;
	    var organization = item.getElementsByTagName('organization')[0].firstChild.nodeValue;
	    var location = item.getElementsByTagName('location')[0].firstChild.nodeValue;
		var image = item.getElementsByTagName('image')[0].firstChild.nodeValue;
		var url = "../static/images/thumb/" + image;

		var element_ul = document.createElement("ul");     

		var element_td1 = document.createElement("td");    
		element_td1.appendChild(createTextElement("h1", title));
		element_td1.appendChild(createTextElement("h2", date));
		element_td1.appendChild(createTextElement("h3", organization + ", " + location));
		element_td1.appendChild(element_ul);


		if (image != "")
		{
			var element_img = document.createElement("img"); 
			element_img.src = url;
			element_img.alt = image;
			//TooltipImageEvent(element_img, url);

			var element_td2 = document.createElement("td"); 
			element_td2.appendChild(element_img);
		}

		var element_row = document.createElement("tr");  
		element_row.appendChild(element_td1);		
		element_row.appendChild(element_td2);		


	    var subxml = item.getElementsByTagName('descriptions');  
		for (var j=0; j<subxml.length; j++)
		{
		    var subitem = subxml[j];   

		    var topic = subitem.getElementsByTagName('topic')[0].firstChild.nodeValue;
		    
			element_td1.appendChild(createTextElement("h4", topic));

			var element_ul = document.createElement("ul");  
			element_td1.appendChild(element_ul);

		    var subxml1 = subitem.getElementsByTagName('description');  
			for (var m=0; m<subxml1.length; m++)
			{
			    var description = subxml1[m].firstChild.nodeValue;
 
				element_ul.appendChild(createTextElement("li", description));
			}
		}

		document.getElementById(iD).appendChild(element_row);
  }
}

document.addEventListener("DOMContentLoaded", function() {	
  	headerLoad(0);
	var resume_xml = loadXML("../static/xml/profile.xml");

	addSummary(resume_xml.getElementsByTagName('summary')[0],'summary');
	addEducation(resume_xml.getElementsByTagName('education')[0], 'education');
	addAward(resume_xml.getElementsByTagName('award')[0], 'award');
	addSkill(resume_xml.getElementsByTagName('skill')[0], 'skill');
	addExperience(resume_xml.getElementsByTagName('experience')[0], 'experience');
	addExperience(resume_xml.getElementsByTagName('volunteer')[0], 'volunteer');
});