from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import simulations
from app import models
from contextlib import asynccontextmanager


# Crear tablas al arrancar
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield

app = FastAPI(lifespan=lifespan)

# Configurar CORS para que React (Vite) pueda conectarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Puerto por defecto de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(simulations.router)

@app.get("/")
async def read_root():
    return {"message": "CreditSim API"}