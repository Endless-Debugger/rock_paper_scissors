let classification = "Hi";
let model;
let classifyImg = document.getElementById("counter-img");
let gloat = document.getElementById("gloat-h3");
(async function testModel() {
    console.log("Hello")
    model = await tf.loadLayersModel("model/model.json");
    console.log("bye")
})();

$("#image-selector").change(function (){
    let reader = new FileReader();
    reader.onload = function(e){
        let dataurl = reader.result;
    $("#selected-image").attr("src", dataurl)
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
})
predict_button = document.querySelector("#predict-button")
predict_button.onclick = (async function () {

        let image= $("#selected-image").get(0);
        console.log("Hi")
        let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([300, 300]).mean(2).toFloat().expandDims().expandDims(3);
        console.log("Stage 0")
        let predictions = await model.predict(tensor).data();
        let iterate = 0;
        
        console.log(predictions)
        for(let i = 0; i < 3; i++){
            if (predictions[i] == 1){
                if (i == 0){
                    classification = "Rock"
                }
                if (i == 1){
                    classification = "Paper"
                }
                if( i == 2){
                    classification = "Scissors"
                }
            }
        }

        console.log(classification)
        srcClassify(classification)
    }
    );
    console.log("Hurray")

function srcClassify(classificatio) {
    if (classificatio == "Scissors"){
        $("#counter-img").attr("src", "imgs/download.jfif")
    }
    else if (classificatio == "Rock"){
        $("#counter-img").attr("src", "imgs/download (1).jfif")
    }
    else if (classificatio == "Paper"){
        $("#counter-img").attr("src", "imgs/download (2).jfif")
    }
}
function seeIfCorrect(my_class){
    if (my_class == classification){
        gloat.textContent = "Haha I was correct, I am the Supreme Lord!"
    }
    else {
        gloat.textContent = " Huh there must be a problem in your image noob, I am never wrong!"
    }
}
