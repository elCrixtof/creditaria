from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Relación: Un usuario puede tener muchas simulaciones
    simulations = relationship("Simulation", back_populates="owner")

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    input_data = Column(Float)  # Ejemplo: un valor de entrada
    result = Column(Integer)    # El resultado del cálculo
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relación inversa
    owner = relationship("User", back_populates="simulations")