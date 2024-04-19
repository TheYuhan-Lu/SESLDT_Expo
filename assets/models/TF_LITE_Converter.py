import tensorflow as tf

# Load the TensorFlow model
model = tf.saved_model.load('assets\models\group1-shard1of1.bin')

# Convert the model
converter = tf.lite.TFLiteConverter.from_saved_model(model)
tflite_model = converter.convert()

# Save the converted model
with open('eye_detection_model.tflite', 'wb') as f:
    f.write(tflite_model)
