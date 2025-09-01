import CodeSnippet from "../code-snippet";

export default function ModelEvaluation() {
    return (
        <CodeSnippet language="Python" code={`
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def evaluate_model(model, X_test, y_test, genre_labels):
    """Evaluate model performance with multiple metrics"""
    # Predict on test data
    y_pred = model.predict(X_test)
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_true_classes = np.argmax(y_test, axis=1)
    
    # Calculate metrics
    report = classification_report(
        y_true_classes, 
        y_pred_classes, 
        target_names=genre_labels,
        output_dict=True
    )
    
    # Create confusion matrix
    cm = confusion_matrix(y_true_classes, y_pred_classes)
    cm_normalized = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
    
    # Plot confusion matrix
    plt.figure(figsize=(12, 10))
    sns.heatmap(
        cm_normalized, 
        annot=True, 
        fmt='.2f', 
        xticklabels=genre_labels, 
        yticklabels=genre_labels
    )
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.title('Confusion Matrix')
    plt.show()
    
    # Print classification report
    print("Classification Report:")
    for genre in genre_labels:
        print(f"{genre}: F1-Score: {report[genre]['f1-score']:.2f}")
    
    print(f"Overall Accuracy: {report['accuracy']:.2f}")
    
    return report, cm

# Example usage
genre_labels = ['Blues', 'Classical', 'Country', 'Disco', 
                'Hip-hop', 'Jazz', 'Metal', 'Pop', 'Reggae', 'Rock']
report, cm = evaluate_model(model, X_test, y_test, genre_labels)`} />
    )
}