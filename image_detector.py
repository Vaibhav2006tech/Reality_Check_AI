from transformers import pipeline
from PIL import Image
import numpy as np
import cv2

# -------------------------------
# LOAD MODELS
# -------------------------------

cnn_detector = pipeline(
    "image-classification",
    model="umm-maybe/AI-image-detector"
)

sd_detector = pipeline(
    "image-classification",
    model="Organika/sdxl-detector"
)

clip_detector = pipeline(
    "zero-shot-image-classification",
    model="openai/clip-vit-base-patch32"
)

# -------------------------------
# FREQUENCY DETECTOR
# -------------------------------

def frequency_detector(image):

    img = np.array(image)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    f = np.fft.fft2(gray)
    fshift = np.fft.fftshift(f)

    magnitude = np.log(np.abs(fshift) + 1)

    score = float(np.mean(magnitude))

    freq_score = min(score / 100, 1)

    return float(freq_score)


# -------------------------------
# EXTRACT AI SCORE
# -------------------------------

def extract_ai_score(results):

    for r in results:
        label = r["label"].lower()

        if "ai" in label or "fake" in label:
            return float(r["score"])

    return 0.0


# -------------------------------
# MAIN DETECTOR
# -------------------------------

def detect_image(image_file):

    image = Image.open(image_file).convert("RGB")

    # CNN detector
    cnn_result = cnn_detector(image)
    ai_score1 = extract_ai_score(cnn_result)

    # SD detector
    sd_result = sd_detector(image)
    ai_score2 = extract_ai_score(sd_result)

    # CLIP semantic detection
    clip_result = clip_detector(
        image,
        candidate_labels=[
            "AI generated image",
            "computer generated art",
            "synthetic image",
            "real photograph"
        ]
    )

    ai_score3 = 0
    for r in clip_result:
        label = r["label"].lower()
        if "ai" in label or "synthetic" in label or "computer generated" in label:
            ai_score3 = max(ai_score3, r["score"])

    # Frequency
    ai_score4 = frequency_detector(image)

    # -------------------------------
    # WEIGHTED COMBINATION
    # -------------------------------

    final_ai = (
        ai_score1 * 0.35 +
        ai_score2 * 0.30 +
        ai_score3 * 0.25 +
        ai_score4 * 0.10
    )

    final_ai = min(max(final_ai, 0), 1)

    real = 1 - final_ai

    return {
        "ai_probability": float(final_ai),
        "real_probability": float(real)
    }
