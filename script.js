// ------------------- IMAGE DETECTION -------------------
function detectImage() {
    const fileInput = document.getElementById("imageUpload");
    const imageResult = document.getElementById("imageResult");

    if (!fileInput.files || fileInput.files.length === 0) {
        showToast("Please upload an image first");
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
        const ai   = (data.ai_probability   * 100).toFixed(2);
        const real = (data.real_probability * 100).toFixed(2);

        let verdict = "";
        if      (real < 80)               verdict = "AI Generated Image";
        else if (real >= 80 && real < 85) verdict = "Likely AI Generated";
        else if (real >= 85 && real <= 90) verdict = "Likely Real Image";
        else                              verdict = "Real Image";

        imageResult.innerText =
            "AI Probability:   " + ai   + "%\n" +
            "Real Probability: " + real + "%\n\n" +
            "Verdict: " + verdict;
    })
    .catch(error => {
        console.error(error);
        imageResult.innerText = "Error detecting image. Is the server running?";
    });
}


// ------------------- TEXT DETECTION -------------------
function detectText() {
    const textInput  = document.getElementById("textInput").value;
    const textResult = document.getElementById("textResult");

    if (!textInput.trim()) {
        showToast("Please enter some text first");
        return;
    }

    textResult.innerText = "Analyzing text...";

    fetch("http://127.0.0.1:5000/detect_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textInput })
    })
    .then(response => response.json())
    .then(data => {
        textResult.innerText =
            "Text: "          + data.text          + "\n" +
            "Reality Score: " + data.reality_score + "%\n" +
            "Verdict: "       + data.classification;
    })
    .catch(error => {
        console.error(error);
        textResult.innerText = "Error detecting text. Is the server running?";
    });
}


// ------------------- AUDIO DETECTION -------------------
function detectAudio() {
    const audioInput  = document.getElementById("audioUpload");
    const audioResult = document.getElementById("audioResult");

    if (!audioInput.files || audioInput.files.length === 0) {
        showToast("Please upload an audio file first");
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
            "Reality Score: " + data.score          + "%\n" +
            "Verdict: "       + data.classification;
    })
    .catch(error => {
        console.error(error);
        audioResult.innerText = "Error detecting audio. Is the server running?";
    });
}
