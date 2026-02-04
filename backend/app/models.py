from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     password = Column(String)

#     # Relación: Un usuario puede tener muchas simulaciones
#     simulations = relationship("Simulation", back_populates="owner")

class Simulacion(Base):
    __tablename__ = "simulaciones"

    id = Column(Integer, primary_key=True, index=True)
    monto = Column(Float, nullable=False)  
    tasa_anual = Column(Float, nullable=False)    
    plazo_meses = Column(Integer, nullable=False)    
    cuota_mensual = Column(Float, nullable=False)
    total_intereses = Column(Float, nullable=False)
    # user_id = Column(Integer, ForeignKey("users.id"))

    # Relación inversa
    owner = relationship("User", back_populates="simulations")