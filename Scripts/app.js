/* ===============================================
		  File Name: App
          Authour: Tara McNeil
          Site Name: Portfolio | Tara McNeil
          File Description: Javascript
================================================ */

(function () {

    "use strict";
    // Instantiate new xhr object
    
    var request = new XMLHttpRequest();
    request.open('GET', '../../app.json', true);
    request.addEventListener('readystatechange', function() {
        
        // wait for file to load
        if (request.readyState === 4 && request.status === 200) {
            var text = {};

            // read json object
            text = JSON.parse(request.responseText);

            // declare local paragraph array
            var paragraphArray = [];
            
            // read paragraphs array from the json object
            paragraphArray = text.paragraphs;
            
            // store length of the array into a variable
            var paragraphArrayLength = paragraphArray.length;
            
            // loop through the array
            for(var number=0; number < paragraphArrayLength; number++) {
                
                // create a reference to each html paragraph element 
                var paragraph = document.getElementById("paragraph" + (number+1) );
                
                // set the innerHTML of the paragraph to the string from the paragraphArray
                paragraph.innerHTML = paragraphArray[number];
            }

        }
    });
    request.send();

    
    /* ==============================================
        CONTACT
    ============================================== */
    var contactName;
    contactName = document.getElementById("contact-name");
    var contactMail;
    contactMail = document.getElementById("contact-mail");
    var contactMessage;
    contactMessage = document.getElementById("contact-message");
    var button = document.getElementById('submit');
    button.addEventListener("click", function (){
        console.log(contactName.value);
        console.log(contactMail.value);
        console.log(contactMessage.value);
    });
    
    $('#contact-form').submit(function() {
		
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parent().append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parent().append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage);
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
			},2000);
		}
		else {
			$('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>'+sendingMessage);
			
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('#contact-form button').html('<i class="fa fa-check"></i>'+okMessage);
				
				$('#contact-form')[0].reset();
				
				setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
				},2000);
				
			});
		}
		
		return false;	
	});
    
})();