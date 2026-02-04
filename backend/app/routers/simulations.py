from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app import schemas, models, services
from app.database import get_db

router = APIRouter(prefix="/simulate", tags=["Simulations"])

@router.post("/", response_model=schemas.SimulacionRespuesta)
async def create_simulation(
    payload: schemas.SimulacionSolicitud,
    background_task: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    # Logica de amortizacion
    monto = payload.monto
    tasa_mensual = payload.tasa_anual / (12*100)
    plazo_meses = payload.plazo_meses

    cuota_mensual = monto*tasa_mensual*((1+tasa_mensual)**plazo_meses)/(((1+tasa_mensual)**plazo_meses)-1)

    print(f'Cuota: {cuota_mensual}')

    tabla_amortizacion = []
    saldo_actual = monto
    for mes in range(1, plazo_meses+1):
        interes_mensual = saldo_actual*tasa_mensual
        capital = cuota_mensual - interes_mensual
        saldo_final = saldo_actual - capital

        fila = {
            'mes': mes,
            'saldo_inicial': saldo_actual,
            'cuota_mensual': cuota_mensual,
            'interes_mensual': interes_mensual,
            'capital': capital,
            'saldo_final': saldo_final 
        }
        tabla_amortizacion.append(fila)

        saldo_actual = saldo_final
        total_intereses = cuota_mensual * plazo_meses

    # Guardado en la db

    nueva_simulacion = models.Simulacion(
        monto = payload.monto,
        tasa_anual = payload.tasa_anual,
        plazo_meses = payload.plazo_meses,
        cuota_mensual = cuota_mensual,
        total_intereses = total_intereses
    )

    db.add(nueva_simulacion)
    await db.commit()

    background_task.add_task(services.auditoria)

    return {
        "monto": monto,
        "cuota_mensual": cuota_mensual,
        "tasa_mensual": tasa_mensual,
        "total_intereses": total_intereses,
        "tabla": tabla_amortizacion
    }