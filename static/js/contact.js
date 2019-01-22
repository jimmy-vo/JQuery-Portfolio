


function IsFieldEmpty(text) {
	value = String(text);
	if ((trim (value) !== "") && (value !== null))
	{
    	return  false;
	}
    return true;
}

function IsFieldNotFormated(text, regEx) {
	if (regEx.test(String(text), regEx))
	{
		return false;
	}
	return true;
}



function ValidateName()
{	
	console.log('ValidateName');

	if (IsFieldEmpty($fullname.val()))
	{
		$fullname.addClass('error');
		return true	;
	}
	
	$fullname.removeClass('error');
	return false;
}

function ValidateNumber()
{	
	console.log('ValidateNumber');

	if	(IsFieldEmpty($number.val()))
	{
		$number.addClass('error');
		return true	;
	}
	else if (IsFieldNotFormated($number.val(), /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
	{
		$number.addClass('error');
		return true;
	}
	
	$number.removeClass('error');
	return false;
}

function ValidateEmail()
{	
	console.log('ValidateEmail');
	
	if	(IsFieldEmpty($email.val()))
	{
		$email.addClass('error');
		return true	;
	}
	else if (IsFieldNotFormated($email.val(), /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/))
	{
		$email.addClass('error');
		return true;
	}
	
	$email.removeClass('error');
	return false;
}

function ValidateMessage()
{
	console.log('ValidateMessage');

	if (IsFieldEmpty($message.val()))
	{
		$message.addClass('error');
		return true	;
	}

	$message.removeClass('error');
	return false;
}

document.addEventListener("DOMContentLoaded", function(){

	$fullname = $("#fullname");
	$email = $("#email");
	$number = $("#number");
	$address = $("#address");
	$message = $("#message");

 	$fullname.on('blur', ValidateName);
 	$number.on('blur', ValidateNumber);
 	$email.on('blur', ValidateEmail);
 	$message.on('blur', ValidateMessage);
 
 	$fullname.on('focus', function() {$fullname.removeClass('error');   console.log('leave fullname');});
 	$number.on('focus', function() {$number.removeClass('error');       console.log('leave fullname');});
 	$email.on('focus', function() {$email.removeClass('error');         console.log('leave fullname');});
 	$message.on('focus', function() {$message.removeClass('error');     console.log('leave fullname');});

 	$("#submit").on('click', function(){
 	    let error = '';

        if (ValidateName())
        {
            error = "fullname";
        }
        else if(ValidateEmail())
        {
            error = "email";
        }
        else if(ValidateNumber())
        {
            error = "number";
        }
        else if(ValidateMessage())
        {
            error = "message";
        }

        if (error != '')
        {
            $(error).focus();
            e.preventDefault();
        }
 	});
});
