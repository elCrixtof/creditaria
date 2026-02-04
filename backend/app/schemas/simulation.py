from pydantic import BaseModel, Field
from typing import List

class SimulacionSolicitud(BaseModel):
    monto: float = Field(..., gt=0)
    tasa_anual: float = Field(..., gt=0, le=100)
    plazo_meses: int = Field(..., gt=0)

class AmortizacionFila(BaseModel):
    mes: int
    saldo_inicial: float
    cuota_mensual: float
    interes_mensual: float
    capital: float
    saldo_final: float

class SimulacionRespuesta(BaseModel):
    monto: float
    cuota_mensual: float
    interes_total: float
    tabla: List[AmortizacionFila]