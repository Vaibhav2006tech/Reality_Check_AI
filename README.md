# Reality_Check_AI
This project is an engine which distinguishes between AI generated/edited and real content. Here the classification is being done for images, text and audio


1. Project Overview

AI Reality Verification is a system designed to analyze digital content—images, videos, audio, or text—to determine whether it is real or AI-generated.

Purpose:
Detect deepfakes, AI-generated media, or manipulated content.
Provide a Reality Score (percentage likelihood of being real) and a Verdict (“AI Generated” or “Real”).
Applications:
Social media verification.
Academic and news authenticity checks.
Content moderation and digital forensics.
2. System Architecture

The system can be divided into three main layers:

a) Frontend (User Interface)
Technologies: HTML, CSS, JavaScript.
Role:
Allows users to upload files (images, videos, audio, text).
Sends data to the backend server via HTTP requests (AJAX/Fetch).
Displays the results (Reality Score + Verdict) in a user-friendly way.
b) Backend (Server & API)
Technologies: Flask (Python), REST API.
Role:
Receives user uploads and saves them temporarily.
Performs preprocessing depending on content type:
Images: Resize, normalize, convert color spaces.
Videos: Extract frames using OpenCV.
Audio: Convert to spectrograms.
Text: Tokenize or vectorize for NLP models.
Passes preprocessed data to the ML models.
Returns results as JSON to the frontend.
c) ML Layer (AI Models & Libraries)
Technologies: PyTorch, OpenCV, NumPy.
Role:
Detect AI-generated content using pretrained or custom models.
Output a Reality Score (confidence probability) and a Verdict.
Examples of ML Approaches:
Images: CNNs like Xception, ResNet, EfficientNet trained on deepfake datasets.
Videos: Frame-level analysis → aggregate predictions.
Audio: Spectrogram → CNN classifier.
Text: Transformer models (BERT, GPT-based) to detect AI writing patterns.
3. Workflow
User Interaction: Upload content through the web interface.
Request Handling: Frontend sends the file to Flask backend.
Preprocessing:
OpenCV for image/video manipulation.
NumPy for numerical operations and tensor conversion.
Spectrogram generation for audio.
Tokenization for text.
ML Prediction:
Data fed into PyTorch model.
Model outputs probability/confidence of content being AI-generated.
Postprocessing:
Convert probability to Reality Score (0–100%).
Decide Verdict based on a threshold (e.g., >50% → AI Generated).
Response to User:
Backend sends JSON response.
Frontend displays score and verdict dynamically.
4. Libraries and Their Roles
Library/Tool	Role in the System
Flask	Web server & API endpoints to handle uploads and send results.
PyTorch	ML framework to load models and perform inference.
OpenCV	Image/video preprocessing, frame extraction, resizing, normalization.
NumPy	Numerical operations, array/tensor handling.
HTML/CSS/JS	Frontend UI for file upload and result display.
5. Key Concepts
Reality Score: Percentage likelihood that the content is real. Calculated from ML model confidence scores.
Verdict: Qualitative label based on Reality Score threshold.
Preprocessing: Essential to convert diverse media into formats compatible with ML models.
Model Selection: Depends on media type and task:
CNNs for images/videos.
RNNs or CNNs for audio.
Transformers for text.
6. Extensions & Enhancements
Multi-modal verification (images + audio + text in one system).
Store results in a database for auditing and history tracking.
Add visualization of predictions (like heatmaps on images).
Improve accuracy using ensemble models or fine-tuned state-of-the-art networks.

This structure ensures modularity, so new media types or improved models can be integrated without redesigning the whole system.
