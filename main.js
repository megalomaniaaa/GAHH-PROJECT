prodection_1=""
prodection_2=""

Webcam.set(
    {
      width:350,
      height:300,
      image_format:'png',
      png_quality:90   
    }
);

camera=document.getElementById("camera")

Webcam.attach("#camera")

function take_snapshot()
{
    Webcam.snap(function(data_uri)
{
    document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_uri+'">'
}    )
}

console.log('ml5 version',ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/R1c89Gr42/model.json",modelLoaded)
function modelLoaded()
{
console.log("model is loaded")
}
function speak()
{
    var synth=window.speechSynthesis
    speak_1="the prodection is:"+prodection_1
    var utterthis=new SpeechSynthesisUtterance(speak_1);
    synth.speak(utterthis)
}

function check()
{
    img = document.getElementById('selfie_image')
    classifier.classify(img, gotResult)
}

function gotResult(error,result)
{
      if(error)
      {
          console.log(error)
      }
      else
      {
          console.log(result)
          document.getElementById("result_emotion_name").innerHTML=result[0].label
          prodection_1=result[0].label

          speak()
          if(result[0].label=="thumbs up")
          {
              document.getElementById("update_emoji").innerHTML="👍"
          }
          if(result[0].label=="thumbs down")
          {
              document.getElementById("update_emoji").innerHTML="👎"
          }
          if(result[0].label=="okay")
          {
              document.getElementById("update_emoji").innerHTML="👌"
          }

      }
}