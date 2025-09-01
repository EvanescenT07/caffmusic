import CodeSnippet from "../code-snippet";

export default function ModelImplementation() {
  return (
    <CodeSnippet
      language="Python"
      code={`
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

def create_model(input_shape, num_genres):
    model = Sequential()
    # Block 1
    model.add(Conv2D(32, 3, padding='same', activation='relu', input_shape=input_shape))
    model.add(Conv2D(32, 3, activation='relu'))
    model.add(MaxPooling2D(2, 2))
    # Block 2
    model.add(Conv2D(64, 3, padding='same', activation='relu'))
    model.add(Conv2D(64, 3, activation='relu'))
    model.add(MaxPooling2D(2, 2))
    # Block 3
    model.add(Conv2D(128, 3, padding='same', activation='relu'))
    model.add(Conv2D(128, 3, activation='relu'))
    model.add(MaxPooling2D(2, 2))
    model.add(Dropout(0.3))
    # Block 4
    model.add(Conv2D(256, 3, padding='same', activation='relu'))
    model.add(Conv2D(256, 3, activation='relu'))
    model.add(MaxPooling2D(2, 2))
    # Block 5
    model.add(Conv2D(512, 3, padding='same', activation='relu'))
    model.add(Conv2D(512, 3, activation='relu'))
    model.add(MaxPooling2D(2, 2))
    model.add(Dropout(0.3))
    # Dense
    model.add(Flatten())
    model.add(Dense(1200, activation='relu'))
    model.add(Dropout(0.45))
    model.add(Dense(num_genres, activation='softmax'))
    # Compile
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.00005)
    model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# Example usage:
input_shape = (150, 150, 1)
num_genres = 10
model = create_model(input_shape, num_genres)`}
    />
  );
}
