function record() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        console.log(event)
        document.getElementById('videoNames').value = event.results[0][0].transcript;
    }
    recognition.start();
}

function playVideos() {
    var videoNames = document.getElementById('videoNames').value.split(' ');
    var videoPlayer = document.getElementById('videoPlayer');

    playNextVideo(videoNames, 0, videoPlayer);
}

function playVideos() {
    var videoNames = document.getElementById('videoNames').value.split(' ');
    var videoPlayer = document.getElementById('videoPlayer');

    playNextVideo(videoNames, 0, videoPlayer);
}

function playNextVideo(videoNames, index, videoPlayer) {
    if (index >= videoNames.length) {
        return;
    }

    var videoName = videoNames[index].toLowerCase();
    var videoPath = 'SignAsset/' + videoName + '.mp4';


    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoPath, true);
    xhr.onload = function () {
        if (xhr.status === 200) {

            var video = document.createElement('video');
            video.setAttribute('controls', 'true');
            video.setAttribute('width', '640');
            video.setAttribute('height', '360');

            var source = document.createElement('source');
            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');

            video.appendChild(source);

            videoPlayer.innerHTML = '';
            videoPlayer.appendChild(video);

            video.onended = function () {
                playNextVideo(videoNames, index + 1, videoPlayer);
            };

            video.play().catch(function (error) {
                console.error('Error playing video:', error);
                playNextVideo(videoNames, index + 1, videoPlayer);
            });
        } else {
            var letters = videoName.split('');
            playNextLetter(letters, 0, videoPlayer, videoNames, index);
        }
    };
    xhr.send();
}

function playNextLetter(letters, index, videoPlayer, videoNames, wordIndex) {
    if (index >= letters.length) {
        playNextVideo(videoNames, wordIndex + 1, videoPlayer);
        return;
    }

    var letter = letters[index].toLowerCase();
    var videoPath = 'SignAsset/' + letter + '.mp4';

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoPath, true);
    xhr.onload = function () {


        var video = document.createElement('video');
        video.setAttribute('width', '640');
        video.setAttribute('height', '360');

        var source = document.createElement('source');
        source.setAttribute('src', videoPath);
        source.setAttribute('type', 'video/mp4');

        video.appendChild(source);

        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(video);

        video.onended = function () {
            playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex);
        };

        video.play().catch(function (error) {
            console.error('Error playing video:', error);
            playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex);
        });

    };
    xhr.send();
}