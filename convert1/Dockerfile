FROM python:3

# Install OpenCV dependencies
RUN apt-get update && apt-get install -y \
    libsm6 libxext6 libxrender-dev libgl1-mesa-glx \
    libavcodec-dev libavformat-dev libswscale-dev \
    && rm -rf /var/lib/apt/lists/*

# Install OpenCV
RUN pip install opencv-python

# Copy the Python script
COPY script.py /app/script.py

# Set the working directory
WORKDIR /app

# Run the script when the container starts
CMD ["python", "script.py"]
