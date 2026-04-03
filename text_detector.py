# text_detector.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load the AI text detection model (e.g., RoBERTa fine-tuned for AI detection)
MODEL_NAME = "roberta-base-openai-detector"  # Example, replace with actual detector model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

def detect_ai_text(text):
    """
    Returns a score (0-100) indicating likelihood that the text is AI-generated.
    """
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
        ai_prob = probs[0][1].item()  # Assuming [0]=human, [1]=AI
        reality_score = (1 - ai_prob) * 100  # 100 = fully real, 0 = fully AI
    return round(reality_score, 2)
