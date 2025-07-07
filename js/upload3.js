$(document).ready(function(){
  $('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });
});	


$(function() {
	var file = null; // 選択されるファイル
	var blob = null; // 画像(BLOBデータ)
	const THUMBNAIL_WIDTH = 200; // 画像リサイズ後の横の長さの最大値
	const THUMBNAIL_HEIGHT = 200; // 画像リサイズ後の縦の長さの最大値

  	// ファイルが選択されたら
  	$('input[type=file]').change(function() {

		document.getElementById("title").style.display ="none";

	    // ファイルを取得
	    file = $(this).prop('files')[0];
	    var file_name = $(this).prop("files")[0]['name'];
	    $('input[name="name"]').val(file_name);

	    // 選択されたファイルが画像かどうか判定
	    if (file.type != 'image/jpeg' && file.type != 'image/png') {
	      // 画像でない場合は終了
	      file = null;
	      blob = null;
	      return;
	    }

	    // 画像をリサイズする
	    var image = new Image();
	    var reader = new FileReader();
	    reader.onload = function(e) {
	    	image.onload = function() {
		        var width, height;
		        if(image.width > image.height){
		          // 横長の画像は横のサイズを指定値にあわせる
		          var ratio = image.height/image.width;
		          width = THUMBNAIL_WIDTH;
		          height = THUMBNAIL_WIDTH * ratio;
		        } else {
		          // 縦長の画像は縦のサイズを指定値にあわせる
		          var ratio = image.width/image.height;
		          width = THUMBNAIL_HEIGHT * ratio;
		          height = THUMBNAIL_HEIGHT;
		        }
		        // サムネ描画用canvasのサイズを上で算出した値に変更
		        var canvas = $('#canvas')
		                     .attr('width', width)
		                     .attr('height', height);
		        var ctx = canvas[0].getContext('2d');
		        // canvasに既に描画されている画像をクリア
		        ctx.clearRect(0,0,width,height);
		        // canvasにサムネイルを描画
		        // ctx.drawImage(image,0,0,image.width,image.height,0,0,width,height);
		        ctx.drawImage(image,0,0,width,height,0,0,width,height);
		        // canvasからbase64画像データを取得
		        var base64 = canvas.get(0).toDataURL('image/jpeg');        
		        // base64からBlobデータを作成
		        var barr, bin, i, len;
		        bin = atob(base64.split('base64,')[1]);
		        len = bin.length;
		        barr = new Uint8Array(len);
		        i = 0;
		        while (i < len) {
		          barr[i] = bin.charCodeAt(i);
		          i++;
		        }
		        blob = new Blob([barr], {type: 'image/jpeg'});
		        console.log(blob);
	      	}
	      	image.src = e.target.result;
	    }
	    reader.readAsDataURL(file);
	});

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
