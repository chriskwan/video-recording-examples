// NOTE: this code will only work if running this code from a server
// (e.g. http-server) instead of a local file
// Ref: https://www.webrtc-experiment.com/msr/MultiStreamRecorder.html
(function() {
	var multiStreamRecorder;
	var videoElement = document.getElementById("msrVideo");
	var setupButton = document.getElementById("setupBtn")
	var startButton = document.getElementById("startBtn");
	var stopButton = document.getElementById("stopBtn");
	var playButton = document.getElementById("playBtn");
	var pauseButton = document.getElementById("pauseBtn");
	var videoRecordings = document.getElementById("videoRecordings");
	var audioRecordings = document.getElementById("audioRecordings");

	setupButton.onclick = setup;
	startButton.onclick = startRecording;
	stopButton.onclick = stopRecording;
	playButton.onclick = playVideo;
	pauseButton.onclick = pauseVideo;

	var videoNumber = 0;
	var audioNumber = 0;

	var mediaConstraints = {
		audio: true,
		video: true
	};

	function setup() {
		navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
	}

	function onMediaSuccess(stream) {
		multiStreamRecorder = new MultiStreamRecorder(stream);
		multiStreamRecorder.video = videoElement;
		multiStreamRecorder.audioChannels = 1;
		
		multiStreamRecorder.ondataavailable = onMediaDataAvailable;

		// Show the stream shows up in the video element
		videoElement.src = URL.createObjectURL(stream);
	}

	function onMediaDataAvailable(blobs) {
		console.log("ON DATA AVAILABLE");

		videoNumber++;
		makeLink(videoRecordings, blobs.video, videoNumber);

		audioNumber++;
		makeLink(audioRecordings, blobs.audio, audioNumber);
	}

	function makeLink(container, blob, number) {
		var li = document.createElement('li');

		// Ref: https://www.webrtc-experiment.com/msr/MultiStreamRecorder.html
		var a = document.createElement('a');
		a.target = "_blank";

		var size = bytesToSize(blob.size);
		a.innerHTML = "Recording #" + number + " (" + size + ")"; //cwkTODO add time
		
		a.href = URL.createObjectURL(blob);

		li.appendChild(a);
		container.appendChild(li);
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