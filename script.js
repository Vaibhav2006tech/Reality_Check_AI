// ------------------- IMAGE DETECTION -------------------
const uploadInput = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const imageResult = document.getElementById("imageResult");

uploadInput.addEventListener("change", function() {
    const file = this.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(e){
            previewImage.src = e.target.result;
        }

        reader.readAsDataURL(file);
    }
});

function detectImage() {
    const fileInput = document.getElementById("imageUpload");

    if(fileInput.files.length === 0){
        alert("Please upload an image");
        return;
    }

    imageResult.innerText = "Analyzing image...";

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const ai = (data.ai_probability * 100).toFixed(2);
        const real = (data.real_probability * 100).toFixed(2);

        let verdict = "";

        if(real < 80){
            verdict = "AI Generated Image";
        }
        else if(real >= 80 && real < 85){
            verdict = "Likely AI Generated";
        }
        else if(real >= 85 && real <= 90){
            verdict = "Likely Real Image";
        }
        else{
            verdict = "Real Image";
        }

        imageResult.innerText =
            "AI Probability: " + ai + "%\n" +
            "Real Probability: " + real + "%\n\n" +
            "Verdict: " + verdict;
    })
    .catch(error => {
        console.error(error);
        imageResult.innerText = "Error detecting image";
    });
}

// ------------------- TEXT DETECTION -------------------
const textResult = document.getElementById("textResult");

function detectText() {
    const textInput = document.getElementById("textInput").value;

    if(!textInput){
        alert("Please enter some text");
        return;
    }

    textResult.innerText = "Analyzing text...";

    fetch("http://127.0.0.1:5000/detect_text", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: textInput })
    })
    .then(response => response.json())
    .then(data => {
        textResult.innerText =
            "Text: " + data.text + "\n" +
            "Reality Score: " + data.reality_score + "%\n" +
            "Verdict: " + data.classification;
    })
    .catch(error => {
        console.error(error);
        textResult.innerText = "Error detecting text";
    });
}

// ------------------- AUDIO DETECTION -------------------
const audioResult = document.getElementById("audioResult");

function detectAudio() {
    const audioInput = document.getElementById("audioUpload");

    if(audioInput.files.length === 0){
        alert("Please upload an audio file");
        return;
    }

    audioResult.innerText = "Analyzing audio...";

    const formData = new FormData();
    formData.append("audio", audioInput.files[0]);

    fetch("http://127.0.0.1:5000/detect_audio", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        audioResult.innerText =
            "Reality Score: " + data.score + "%\n" +
            "Verdict: " + data.classification;
    })
    .catch(error => {
        console.error(error);
        audioResult.innerText = "Error detecting audio";
    });
}
