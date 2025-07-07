'use strict';

const $ = (id) => document.getElementById(id);

window.addEventListener('load', () => {
    $('b1').addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!$('file1').value) {
            console.log('No file is selected.');
            return;
        }

        const fd = new FormData($('f1'));
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log("status = " + xhr.status);
                console.log(xhr.responseText);
            }
        }

        xhr.open("POST", "https://www.starful.net/api/upload/image", true);
        // xhr.withCredentials = true;

        // xhr.onreadystatechange = function(){
        //     if (this.readyState === 4 && this.status === 200) {
        //         var id = this.response.id;
        //         console.log(id);
        //     }
        // };
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS');


        // Basic Events
        xhr.addEventListener('load', (evt) => {
            console.log('** xhr: load');
            let response = JSON.parse(xhr.responseText);
            console.log(response);
        });

        xhr.addEventListener('progress', (evt) => {
            console.log('** xhr: progress');
        });

        xhr.addEventListener('error', (evt) => {
            console.log('** xhr: error');
        });

        // Upload Events
        xhr.upload.addEventListener('loadstart', (evt) => {
            console.log('++ xhr.upload: loadstart');
        });

        xhr.upload.addEventListener('progress', (evt) => {
            let percent = (evt.loaded / evt.total * 100).toFixed(1);
            console.log(`++ xhr.upload: progress ${percent}%`);
        });

        xhr.upload.addEventListener('abort', (evt) => {
            console.log('++ xhr.upload: abort (Upload aborted)');
        });

        xhr.upload.addEventListener('error', (evt) => {
            console.log('++ xhr.upload: error (Upload failed)');
        });

        xhr.upload.addEventListener('load', (evt) => {
            console.log('++ xhr.upload: load (Upload Completed Successfully)');
        });

        xhr.upload.addEventListener('timeout', (evt) => {
            console.log('++ xhr.upload: timeout');
        });

        xhr.upload.addEventListener('loadend', (evt) => {
            console.log('++ xhr.upload: loadend (Upload Finished)');
        });
        
        xhr.send(fd);
    });

    $('clearButton').addEventListener('click', (evt) => {
        console.log('** clear button clicked');
        evt.preventDefault();
        const file1 = $('file1');
        file1.value = file1.defaultValue;
        file1.dispatchEvent(new Event('change'));
    });

});
