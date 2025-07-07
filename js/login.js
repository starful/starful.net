	
$(document).on('change', '.file-input', function() {
	var filesCount = $(this)[0].files.length;
	var textbox = $(this).prev();

	if (filesCount === 1) {
		var fileName = $(this).val().split('\\').pop();
		textbox.text(fileName);
	} else {
		textbox.text(filesCount + ' files selected');
	}

	if (typeof (FileReader) != "undefined") {
		var dvPreview = $("#divImageMediaPreview");
		dvPreview.html("");
		$($(this)[0].files).each(function () {
			var file = $(this);
			var reader = new FileReader();
			reader.onload = function (e) {
				var img = $("<img />");
				img.attr("style", "width: 400px; height:500px; padding: 10px");
				img.attr("src", e.target.result);
				dvPreview.append(img);
			}
			reader.readAsDataURL(file[0]);
		});
	} 
	else {
		alert("This browser does not support HTML5 FileReader.");
	}
});

$(function() {
	$('#upload').on('click', function () {
	    var file_data = $('#data').prop('files')[0];
	    var form_data = new FormData();
	    form_data.append('data', file_data);
	    form_data.append('name', $('input[name="name"]').val());
	    $.ajax({
	        url: 'https://www.starful.net/api/upload/image', // point to server-side controller method
	        dataType: 'image', 					   // what to expect back from the server
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,
	        type: 'post',
	        success: function (response) {
	            $('#msg').html(response); 		   // display success response from the server
	        },
	        error: function (response) {
	            $('#msg').html(response); 		   // display error response from the server
	        }
	    });
	});
});
