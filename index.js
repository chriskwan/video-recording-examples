// NOTE: this code will only work if running this code from a server
// (e.g. http-server) instead of a local file
(function() {
	var multiStreamRecorder;
	var videoElement = document.getElementById("msrVideo");
	var startButton = document.getElementById("startBtn");
	var stopButton = document.getElementById("stopBtn");
	var playButton = document.getElementById("playBtn");
	var pauseButton = document.getElementById("pauseBtn");

	startButton.onclick = startRecording;
	stopButton.onclick = stopRecording;
	playButton.onclick = playVideo;
	pauseButton.onclick = pauseVideo;

	var mediaConstraints = {
		audio: true,
		video: true
	};

	navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

	function onMediaSuccess(stream) {
		multiStreamRecorder = new MultiStreamRecorder(stream);
		multiStreamRecorder.video = videoElement;
		multiStreamRecorder.audioChannels = 1;
		
		multiStreamRecorder.ondataavailable = function (blobs) {
			console.log("on data available");
		};

		// Show the stream shows up in the video element
		videoElement.src = URL.createObjectURL(stream);
	}

	function onMediaError(e) {
		console.error("media error", e);
	}

	function startRecording() {
		if (!multiStreamRecorder) {
			return;
		}
		console.log("START recording");
		multiStreamRecorder.start(3 * 1000);
		console.log("Recording STARTED");
	}

	function stopRecording() {
		if (!multiStreamRecorder) {
			return;
		}
		console.log("STOP recording");
		multiStreamRecorder.stop();
		console.log("Recording STOPPED");
	}

	function playVideo() {
		//cwkTODO this doesn't quite work - it plays the stream
		//need to change it to play the recorded video
		videoElement.play();
	}

	function pauseVideo() {
		videoElement.pause();
	}

})();