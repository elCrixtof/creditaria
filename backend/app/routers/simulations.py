from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app import schemas, models, services
from app.database import get_db

router = APIRouter(prefix="/simulate", tags=["Simulations"])

@router.post("/", response_model=schemas.SimulacionRespuesta)
async def create_simulation(
    payload: schemas.SimulacionSolicitud,
    background: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    # Logica de amortizacion
    # Guardado en la db
    pass