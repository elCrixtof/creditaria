import {useState} from 'react'
import api from './api/axios'

function App() {
  const [monto, setMonto] = useState(3000)
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await api.post('/simulate/', {
        monto: monto,
        tasa_anual:15,
        plazo_meses:6
      })
      
      setResultado(response.data)
    } catch (error) {
      console.error("Error al conectar con el Backend", error)
    }
  }

  return (
    <div style={{padding:'20px'}}>
      <h1>CreditSim</h1>
      <form onSubmit={handleSubmit}>
        <label>Monto del prestamo</label>
        <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
        <button type='submit'>Calcular</button>
      </form>
      {resultado && 
        <div style={{ marginTop: '20px' }}>
          <h3>Cuota mensual: ${resultado.cuota_mensual}</h3>
          <p>Interes total: ${resultado.total_intereses}</p>
        </div>
      }
    </div>
  )
}

export default App