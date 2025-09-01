# CaffMusic - Music Genre Classification App

A full-stack web application that uses machine learning to classify music genres from audio files. Built with Next.js frontend and FastAPI backend with TensorFlow/Keras for real-time music genre prediction.

## 🎵 About

CaffMusic is a demonstration platform showcasing how machine learning can analyze and identify music genres from audio files. The main goal is to provide an educational experience on how AI models can process audio data and make intelligent predictions about musical characteristics.

**Note**: This model is still not at perfect accuracy due to dataset limitations, but serves as an excellent learning tool for understanding music genre classification.

## ✨ Features

- **10 Genre Classification**: Identifies Blues, Classical, Country, Disco, Hip Hop, Jazz, Metal, Pop, Reggae, and Rock
- **Real-time Processing**: Upload audio files and get instant genre predictions with confidence scores
- **Chunk-based Analysis**: Processes audio in segments for more reliable predictions
- **Prediction History**: Track and view your previous predictions with detailed results
- **User Authentication**: Secure login system with Google OAuth and JWT
- **Interactive Knowledge Base**: Learn about the machine learning pipeline and implementation
- **Responsive Design**: Modern UI with sound wave animations and dark/light theme support

## 🏗️ Architecture

```
📁 caffmusic/
├── 📁 frontend/          # Next.js React application
├── 📁 backend/           # FastAPI Python backend
├── 📁 .assets-testing/   # Test audio files
└── README.md
```

### Frontend Stack

- **Framework**: [Next.js 15](frontend/app/layout.tsx) with TypeScript and App Router
- **Authentication**: NextAuth.js with Google OAuth and JWT
- **Database**: PostgreSQL with [Prisma ORM](frontend/lib/prisma.ts)
- **Styling**: Tailwind CSS with custom component library
- **UI Components**: Custom [components](frontend/components/) with animations
- **Package Manager**: Bun

### Backend Stack

- **Framework**: FastAPI with Python
- **ML Framework**: TensorFlow/Keras for genre classification
- **Audio Processing**: Librosa for feature extraction
- **Model**: [Pre-trained CNN model](backend/model/Music_Genre_Classification.keras)
- **CORS**: Enabled for frontend integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Bun (or npm/yarn)
- Python 3.8+
- PostgreSQL database
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd caffmusic
   ```

2. **Setup Backend**

   ```bash
   cd backend
   pip install fastapi uvicorn tensorflow librosa numpy python-multipart
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   bun install
   ```

4. **Environment Configuration**

   Create [frontend/.env](frontend/.env) based on [.env.example](frontend/.env.example):

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/caffmusic"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Backend API
   BACKEND_ENDPOINT_URL="http://localhost:8000"
   ```

5. **Database Setup**
   ```bash
   cd frontend
   npx prisma migrate dev
   npx prisma generate
   ```

### Running the Application

1. **Start Backend Server**

   ```bash
   cd backend
   python main.py
   # Server will run on http://localhost:8000
   ```

2. **Start Frontend Development Server**

   ```bash
   cd frontend
   bun dev
   # Application will run on http://localhost:3000
   ```

3. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📊 Machine Learning Model

The application uses a Convolutional Neural Network (CNN) trained on the [GTZAN dataset](backend/model/MusicGenreClassification.ipynb) for music genre classification.

### Supported Genres

- **Blues** - Traditional blues music
- **Classical** - Classical and orchestral music
- **Country** - Country and folk music
- **Disco** - Disco and dance music
- **Hip Hop** - Hip hop and rap music
- **Jazz** - Jazz and improvisation music
- **Metal** - Heavy metal and hard rock
- **Pop** - Popular and mainstream music
- **Reggae** - Reggae and Caribbean music
- **Rock** - Rock and alternative music

### Model Architecture

```
Input Layer: (128, 128, 1) - Mel Spectrogram
Conv2D + MaxPooling2D layers for feature extraction
Flatten + Dense layers for classification
Output Layer: 10 classes (genres)
Total params: 6,549,642
```

### Audio Processing Pipeline

1. **Audio Loading**: Load audio files using librosa
2. **Chunking**: Split audio into 3-second segments
3. **Feature Extraction**: Convert to Mel spectrograms (128x128)
4. **Prediction**: CNN processes each chunk
5. **Aggregation**: Majority voting for final genre prediction

## 🗂️ Project Structure

### Frontend ([frontend/](frontend/))

```
app/
├── (auth)/           # Authentication pages
├── (root)/           # Main application pages
├── api/              # API routes
│   ├── auth/         # Authentication endpoints
│   ├── genres/       # Genre management
│   ├── history/      # Prediction history
│   └── predict/      # Audio prediction
└── knowledge/        # Educational content

components/
├── auth/             # Authentication components
├── detection/        # Audio detection interface
├── home/             # Homepage components
├── knowledge/        # Educational components
└── ui/               # Base UI components
```

### Backend ([backend/](backend/))

```
app/
├── utils/
│   ├── model.py      # ML model handling
│   └── preprocessing.py # Audio preprocessing
├── config.py         # Configuration
├── models.py         # Data models
└── routes.py         # API routes

dataset/              # Training data
model/                # ML model files
temp_uploads/         # Temporary file storage
```

## 🔌 API Endpoints

### Audio Classification

- `POST /predict` - Upload audio file for genre prediction
- `GET /genres` - Get list of supported genres
- `GET /history` - Get prediction history
- `GET /health` - Health check endpoint

### Frontend API Routes

- `POST /api/predict` - [Proxy to backend prediction](frontend/app/api/predict/route.ts)
- `GET /api/genres` - [Get available genres](frontend/app/api/genres/route.ts)
- `GET /api/history` - Get user prediction history
- `POST /api/auth/register` - User registration

## 🛠️ Development

### Frontend Development

- **Detection Interface**: [detect.tsx](frontend/components/detection/detect.tsx) handles file upload and prediction
- **Knowledge Section**: [knowledge-content.tsx](frontend/components/knowledge/knowledge-content.tsx) provides educational content
- **Authentication**: [NextAuth configuration](frontend/provider/session-provider.tsx) with Google OAuth
- **Database**: [Prisma schema](frontend/prisma/schema.prisma) for user data and predictions

### Backend Development

- **Model Loading**: [CaffMusicModel class](backend/app/utils/model.py) manages ML model
- **Audio Processing**: [Preprocessing utilities](backend/app/utils/preprocessing.py) handle audio conversion
- **API Routes**: [FastAPI routes](backend/app/routes.py) for prediction and data management

### Testing

Use the provided test audio file:

```bash
# Test with sample audio
curl -X POST "http://localhost:8000/predict" \
  -F "file=@.assets-testing/Bring me the Horizon - Drown.mp3"
```

## 📈 Model Performance

The model was trained on the GTZAN dataset with the following characteristics:

- **Training Data**: 1000 audio tracks (100 per genre)
- **Audio Features**: Mel spectrograms (128x128 pixels)
- **Training History**: Available in [training_history.json](backend/model/training_history.json)
- **Model Architecture**: Details in [ModelArchitectureLog](frontend/components/knowledge/code/model-archi-log.tsx)

### Limitations

- **Dataset Size**: Limited to 100 samples per genre
- **Audio Quality**: Performance varies with audio quality
- **Mixed Genres**: Challenges with songs containing multiple genres
- **Real-time Processing**: Optimized for demonstration rather than production

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel or similar platform
```

### Backend Deployment

```bash
cd backend
# Configure for your preferred platform (Railway, Heroku, AWS)
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Environment Variables for Production

```env
# Frontend
NEXTAUTH_URL=https://your-domain.com
BACKEND_ENDPOINT_URL=https://your-backend.com

# Backend
CORS_ORIGINS=["https://your-frontend.com"]
```

## 📚 Learning Resources

### Knowledge Section

The app includes an educational [knowledge section](frontend/app/knowledge/page.tsx) covering:

- **Overview**: Introduction to music genre classification
- **Audio Features**: MFCC, Mel spectrograms, and audio processing
- **Model Architecture**: CNN design and implementation
- **Evaluation**: Performance metrics and model assessment

### Code Examples

- [Model Training Notebook](backend/model/MusicGenreClassification.ipynb)
- [Prediction Pipeline](frontend/components/knowledge/code/prediction-pipeline.tsx)
- [Model Evaluation](frontend/components/knowledge/code/model-evaluation.tsx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **GTZAN Dataset** for music genre classification training data
- **TensorFlow/Keras** for the machine learning framework
- **Librosa** for audio processing capabilities
- **Next.js** and **FastAPI** for the full-stack framework
- **Vercel** for frontend hosting solutions

## 📞 Support

For questions about the machine learning implementation, check the [knowledge section](frontend/components/knowledge/knowledge-content.tsx) or explore the model training [Jupyter notebook](backend/model/MusicGenreClassification.ipynb).

---

**CaffMusic** - Discover the Genre of Your Music with AI 🎵
