(function(){
  var playing = 0;

  var word = "hello", curIndex = 0;
  var recognizer = new webkitSpeechRecognition();
  recognizer.lang = "en-GB";
  recognizer.continuous = true;
  recognizer.interimResults = true;

  recognizer.onstart = function(){
    
  }

  recognizer.onend = function(){
    
  }

  recognizer.onresult = function(res){
    var final = '', init = '';
    for(var i = res.resultIndex; i < res.results.length; i++){
      if(res.results[i].isFinal){
        final += res.results[i][0].transcript;
      }

      else {
        init += res.results[i][0].transcript;
      }
    }

    var temp = final.split(' ').concat(init.split(' '));

    matchWord(temp);
  }

  function matchWord(arr){
    if(arr.indexOf(word[curIndex]) != -1){
      document.getElementsByClassName("saidLetters")[0].appendChild(document.createTextNode(word[curIndex]));
      ++curIndex;
      if(curIndex == word.length){
        alert("Got it!");
        if(playing == 1){
          playing = 0;
          recognizer.stop();
          skipAWord();
        }
      }
    }

    else {
      console.log("That's not right!");
    }
  }

  document.getElementsByClassName("but1")[0].addEventListener("click", function(){
    if(playing == 0){
      playing = 1;
      recognizer.start();
    }

    else {
      playing = 0;
      recognizer.stop();
    }
  }, false);

  document.getElementsByClassName("but2")[0].addEventListener("click", function(){
    speakWord();
  });

  function speakWord(){
    console.log(word);
    var synthesizer = new SpeechSynthesisUtterance(word);
    synthesizer.voice = speechSynthesis.getVoices()[7];
    synthesizer.lang = 'hi-IN';
    speechSynthesis.speak(synthesizer);
  }


  /*
    NO WEB AUDIO FROM HERE ON
  */

  function skipAWord(){
    setTimeout(function(){
      document.getElementsByClassName("saidLetters")[0].innerHTML = ""; 
      document.getElementsByClassName("saidLetters")[0].innerHTML = word;
        setTimeout(function(){
          makeRequest('../csec_hackathon/index.php/Data_word/get_word');
          document.getElementsByClassName("saidLetters")[0].innerHTML = ""; 
        }, 1000);
    }, 100);
  }


  document.getElementsByClassName("startGame")[0].addEventListener("click", function(){
    document.getElementsByClassName("play")[0].className = "play final";
    makeRequest('../csec_hackathon/index.php/Data_word/get_word');
  }, false);

  document.getElementsByClassName("skipBut")[0].addEventListener("click", function(){
    skipAWord();
  });

  var httpRequest;
  function makeRequest(url){
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function alertContents(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        curIndex = 0;
        word = httpRequest.responseText;
        var end = (word.indexOf('<') == -1)?word.length:word.indexOf('<');
        word = word.slice(0, end);
        speakWord();
      } 
      else {
        
      }
    }
  }

})();