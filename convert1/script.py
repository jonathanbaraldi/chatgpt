import cv2
import numpy as np

# Open the input movie file
input_movie = cv2.VideoCapture("input.mp4")

if not input_movie.isOpened():
    print("Error opening input movie file")
    exit()

# Get the width and height of the frames in the movie file
frame_width = int(input_movie.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(input_movie.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Get the number of frames in the movie file
num_frames = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))

# Create an output movie file (make sure resolution/frame rate matches input video!)
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output_movie = cv2.VideoWriter("output.mp4", fourcc, 30.0, (frame_width, frame_height))

if not output_movie.isOpened():
    print("Error opening output movie file")
    exit()

# Loop through the frames of the input movie
while input_movie.isOpened():
    # Read the next frame
    success, frame = input_movie.read()

    # If the frame was read successfully, process it
    if success:
        # Get the current position of the video in milliseconds
        pos_msec = input_movie.get(cv2.CAP_PROP_POS_MSEC)

        # Convert the frame to grayscale if we are in the first 15 seconds of the movie
        if pos_msec < 15000:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Write the frame to the output movie file
        success = output_movie.write(frame)
        if not success:
            print("Error writing frame to output movie file")
            break
    else:
        break

# Release the movie files
input_movie.release()
output_movie.release()

print("Done")
