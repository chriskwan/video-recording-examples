// NOTE: this code will only work if running this code from a server
// (e.g. http-server) instead of a local file
(function() {
	var multiStreamRecorder;
	var videoElement = document.getElementById("msrVideo");
	var startButton = document.getElementById("startBtn");
	var stopButton = document.getElementById("stopBtn");

	startButton.onclick = startRecording;
	stopButton.onclick = stopRecording;

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

		videoElement.src = URL.createObjectURL(stream);
		//videoElement.play(); //get a weird echo if it's playing at the same time

		//multiStreamRecorder.start(3 * 1000);
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

})();