
/*
	All it does is to read the music file, and create an animation using it
*/

(function(){
	var uploadField = document.getElementById("uploadFile"),
		canvas = document.getElementById("visual"),
		label = document.getElementById("uploadLabel"),
		effectCount = 1, micIp = 0, visualTimer, webRtcSource, mp3source;

	var audioContext = new AudioContext(),
		fileReader = new FileReader(),
		canvasContext = canvas.getContext('2d'),
		analyser = audioContext.createAnalyser(),
		dataArr;

	uploadField.addEventListener("change", function(e){
		var musicFile = e.target.files[0];

		if(musicFile.type.indexOf("audio") === -1){
			console.log("Choose a music file!");
			return;
		}

		label.innerHTML = "<img src = './images/load.gif' width = 20>";
		fileReader.readAsArrayBuffer(musicFile);

	}, false);

	fileReader.onload = function(e){
		var file = e.target.result;

		audioContext.decodeAudioData(file, function(data){
			uploadField.disabled = true;
			label.className = "disabled";
			label.innerHTML = "Enjoy your song";
			document.getElementsByClassName("micButton")[0].disabled = true;
			audioManagement(data);
		});
	};

	function audioManagement(buffer){
		var mp3source = audioContext.createBufferSource();
		mp3source.buffer = buffer;

		mp3source.connect(analyser);
		analyser.connect(audioContext.destination);
		dataArr = new Uint8Array(analyser.frequencyBinCount);

		visualise();
		mp3source.start(0);

		mp3source.onended = function(){
			uploadField.disabled = false;
			label.className = "";
			label.innerHTML = "Play another song";
			document.getElementsByClassName("micButton")[0].disabled = false;
		}
	}

	function visualiseMic() {
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getUserMedia(
            { audio: true, video: false }, 
            function (mediaStream) {
                webRtcSource = audioContext.createMediaStreamSource(mediaStream);
                webRtcSource.connect(analyser);
                //analyser.connect(audioContext.destination);
                dataArr = new Uint8Array(analyser.frequencyBinCount);

                visualise();
            }, 
            function(error) {
                console.log("There was an error when getting microphone input: " + err);
            }
        );
    }

	function visualise(){
		analyser.getByteFrequencyData(dataArr);
		
		if(effectCount == 1)
			visualisation1();
		else if(effectCount == 2)
			visualisation2();
		else if(effectCount == 3)
			visualisation3();
		else if(effectCount == 4)
			visualisation4();
		else
			visualisation5();

		visualTimer = setTimeout(visualise, 20);
	}

	function visualisation1(){
		canvasContext.fillStyle = "rgb(5,10,20)";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		canvasContext.fillStyle = 'rgb(71,107,107)';
		for(var i = 0, x = 0; i < dataArr.length; i++){
			canvasContext.fillRect(x, canvas.height/2 - parseInt(dataArr[i]), 5, parseInt(dataArr[i]));
			x += 6;
		}

		canvasContext.fillStyle = "rgba(255,255,0,0.5)";
		for(var i = 0, x = 0; i < dataArr.length; i++){
			canvasContext.fillRect(x, canvas.height/2, 5, parseInt(dataArr[i]));
			x += 6;
		}
	}

	function visualisation2(){
		canvasContext.fillStyle = "rgb(5,10,20)";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.strokeStyle = "yellow";

		canvasContext.beginPath();
		canvasContext.moveTo(0,canvas.height);

		for(var i = 0, x = 0; i < dataArr.length; i++){
			canvasContext.lineTo(x, canvas.height - parseInt(dataArr[i] * 1.5));
			x += 2;
		}

		canvasContext.stroke();

	}

	function visualisation3(){
		canvasContext.fillStyle = "rgb(5,10,20)";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		var colors = ["yellow", "red", "green"];

		var limit = parseInt(dataArr.length/3);

		for(var i = 0, y = canvas.height; i < 3; i++){

			canvasContext.strokeStyle = colors[i];
			canvasContext.beginPath();
			canvasContext.moveTo(0,y);

			for(var j = 0, x = 0; j < limit; j++){
				canvasContext.lineTo(x, y - dataArr[i*limit + j]*1.5);
				x += 3;
			}

			canvasContext.stroke();
			y -= 50;
		}

	}

	function visualisation4(){
		canvasContext.fillStyle = "rgb(5,10,20)";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = 'yellow';

		for(var i = 0, x = 0; i < dataArr.length; i++){
			canvasContext.fillRect(x, canvas.height - parseInt(dataArr[i] * 1.5), 2, parseInt(dataArr[i]*1.5));
			x += 2;
		}
	}

	function visualisation5(){
		canvasContext.clearRect(0,0,canvas.width,canvas.height);
		canvasContext.fillStyle = "rgb(5,10,20)";
		canvasContext.strokeStyle = "rgb(255,255,51)";
		canvasContext.fillRect(0,0,canvas.width,canvas.height);
		var sum1 = 0,sum2 = 0,sum3 = 0,sum4 = 0;
		for (var i = 0;i <= (dataArr.length/4)-1; i++) 
		{
			sum1 += Number(dataArr[i]);
			sum2 += Number(dataArr[i+dataArr.length/4]);
			sum3 += Number(dataArr[i+2*dataArr.length/4]);
			sum4 += Number(dataArr[i+3*dataArr.length/4]);
		}
		canvasContext.beginPath();
		sum = sum1 + sum2 + sum3 + sum4;
		for(var i = 0, x = 0; i < dataArr.length; i++){
			canvasContext.arc(x, canvas.height - parseInt(dataArr[i] * 1.5),sum/dataArr.length,0,2*Math.PI);
			x += 2;
		}
		canvasContext.stroke();

	}


	document.getElementsByClassName("visualisation")[0].addEventListener("change", function(){
		effectCount = parseInt(this.value);
	});

	document.getElementsByClassName("micButton")[0].addEventListener("click", function(){
		if(micIp == 0){
			uploadField.disabled = true;
			label.className = "disabled";
			label.innerHTML = "You can't play a song right now";
			this.innerHTML = "Stop visualising your speech!";
			micIp = 1;
			visualiseMic();
		}

		else {
			micIp = 0;
			uploadField.disabled = false;
			label.className = "";
			label.innerHTML = "Choose a music file";
			this.innerHTML = "Visualise what you say";
			clearTimeout(visualTimer);
			webRtcSource.disconnect();
		}
		
	});

})();
