$(document).ready(function(){

	$('#emailbox').keyup(function(e){
		if (e.keyCode == 13){
			e.preventDefault();
			SendSignup();
		} else {
			return false;
		}
	});

	$('#btnSignup').on('click', function(){
		SendSignup();
	});

	function SendSignup(){
		var email = $('#emailbox').val();

		if (email === "" || !ValidateEmail(email)){
			ShowError('Please enter a valid email address!');
			$('#emailbox').focus();
			return;
		}

		$.ajax({
			url: '/main/savesignup',
			type: 'POST',
			data: { email: email }
		}).done(function(data){
			if (data === null){
				ShowError('Looks like you have already signed up!');
				return;
			}

			HideDialog();

			ShowSuccess("Thanks for signing up! We'll keep you posted on our progress.");
			$('#emailbox').val('');
		});
	}

	function ShowError(text) {
	    $('#error').html(text);
	    $('#error').show();
	    $('#error').animate({ bottom: '0' }, 500);

	    setTimeout(function () {
	        $('#error').animate({ bottom: '-50px' }, 500,
	            function () {
	                $('#error').hide();
	            });
	    }, 6000);
	}

	function ShowSuccess(text) {
	    $('#success').html(text);
	    $('#success').show();
	    $('#success').animate({ bottom: '0' }, 500);

	    setTimeout(function () {
	        $('#success').animate({ bottom: '-50px' }, 500,
	            function () {
	                $('#success').hide();
	            });
	    }, 4000);
	}

	function ValidateEmail(value) {
	    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	    if (reg.test(value))
	        return (true);

	    return (false);
	}

	function HideDialog(){
		var d = $('.dialog');
		d.animate({
			top: '-500px'
		}, 500, function(){
			d.hide();
			$('#overlay').fadeOut('fast');
		});
	}

});

