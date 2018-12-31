
var hasErrors = false;

function hideErrors()
{
	var errorFields = document.getElementsByClassName("error");
	for(var i=0; i<errorFields.length; i++)
	{
		errorFields[i].style.display =  "none";
	}
}


/*
 * resetForm
 *
 * param e
 * return  if form is reset
 */
function resetForm(e)
{
	if ( confirm('Clear all?') )
	{
		hideErrors();		
		return true;
	}

	e.preventDefault();
	return false;	
}

/*
 * validate
 *
 * param e
 * return  if form is validate
 */
function validate(e)
{
	hideErrors();

	if (formHasErrors())
	{
		e.preventDefault();
		return false;
	}

	return true;
} 

/*
 * formHasErrors
 *
 * return  if form Has Errors
 */
function formHasErrors() {
	hasErrors = false;
	hasErrors = IsFieldEmpty("fullname")? 				true : hasErrors;
	hasErrors = IsFieldEmpty("address")? 				true : hasErrors;
	hasErrors = (IsFieldEmpty("number"))?				true :	
				(IsInvalidNumber("number")? 			true : hasErrors );
	hasErrors = (IsFieldEmpty("email"))?				true :	
				(IsFieldNotFormated("email", /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)  ? 	
														true : hasErrors );
	hasErrors = IsFieldEmpty("textarea")? 				true : hasErrors;

	return hasErrors;
}




/*
 * SetFocus
 * parm element
 * return none
 */
 function SetFocus(element) {
 	
	if (hasErrors === false)
	{
		element.focus();
		element.select();
	}
 }

/*
 * IsInvalidNumber
 *
 * return   True if an error was found; False if no errors were found
 */
function IsInvalidNumber (iDString)
{
	var number = document.getElementById(iDString).value;
	// number = trim(number.replace("(","").replace(")","").replace("-","").replace(".",""));
	if(number.length == 10)
	{
		return false;
	}

	document.getElementById(iDString+"format_error").style.display =  "block";
	SetFocus(document.getElementById(iDString));
	return true;
}

/*
 * IsFieldEmpty
 *
 * return   True if an error was found; False if no errors were found
 */
function IsFieldEmpty(iDString) {
	value = document.getElementById(iDString).value;
	if ((trim (value) !== "") && (value !== null))
	{
    	return  false;
	}

	document.getElementById(iDString+"_error").style.display =  "block";
	SetFocus(document.getElementById(iDString));
    return true;
}

/*
 * IsFieldNotFormated
 *
 * return   True if an error was found; False if no errors were found
 */
function IsFieldNotFormated(iDString, regEx) {
	if (regEx.test(document.getElementById(iDString).value))
	{
		return false;
	}
	
	document.getElementById(iDString+"format_error").style.display =  "block";
	SetFocus(document.getElementById(iDString));
	return true;
}


// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", function(){  	
  	headerLoad(2);
	
	document.getElementById("submit").addEventListener("click", validate);
	document.getElementById("clear").addEventListener("click", resetForm);
	document.getElementById("message").addEventListener("click", function () {
		alert("It can't be use right now");
	});
	hideErrors();
});
