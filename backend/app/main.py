from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import Settings
from app.routes import router

app = FastAPI(
    title=Settings.APP_TITTLE,
    description=Settings.APP_DESCRIPTION,
    version=Settings.APP_VERSION,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include the router
app.include_router(router)
