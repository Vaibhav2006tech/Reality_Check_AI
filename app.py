from flask import Flask, request, jsonify, session, redirect, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "your_secret_key_here"  # Needed for session management


# ------------------- IMAGE DETECTION -------------------
from image_detector import detect_image
@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    file = request.files["image"]
    result = detect_image(file)
    real_score = result.get("real_score", 0)

    if real_score < 80:
        label = "AI Generated Image"
    elif 80 <= real_score < 85:
        label = "Likely AI Generated Image"
    elif 85 <= real_score <= 90:
        label = "Likely Real Image"
    else:
        label = "Real Image"

    result["classification"] = label
    return jsonify(result)

# ------------------- TEXT DETECTION -------------------
from text_detector import detect_ai_text
@app.route("/detect_text", methods=["POST"])
def detect_text():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    score = detect_ai_text(text)

    if score < 25:
        label = "AI Generated Text"
    elif score < 65:
        label = "Likely AI Generated"
    elif score <= 90:
        label = "Likely Human"
    else:
        label = "Human Written"

    return jsonify({
        "text": text,
        "reality_score": score,
        "classification": label
    })

# ------------------- AUDIO DETECTION -------------------
from audio_detector import analyze_audio
@app.route("/detect_audio", methods=["POST"])
def detect_audio_route():
    if "audio" not in request.files:
        return jsonify({"error": "No audio uploaded"}), 400

    file = request.files["audio"]
    analysis = analyze_audio(file)

    score = analysis.get("score", 0)
    if score < 50:
        label = "Likely AI Generated Audio"
    elif score < 70:
        label = "Possibly AI Audio"
    elif score < 85:
        label = "Likely Real Audio"
    else:
        label = "Real Audio"

    analysis["classification"] = label
    return jsonify(analysis)

# ------------------- RUN SERVER -------------------
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
