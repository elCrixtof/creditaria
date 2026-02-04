import {useState} from 'react'
import api from '../api/axios'

const SimulateView = () => {
  const [monto, setMonto] = useState(localStorage.getItem('monto'))
  const [tasa_anual, setTasa_Anual] = useState(localStorage.getItem('tasa_anual'))
  const [plazo_meses, setPlazo_Meses] = useState(localStorage.getItem('plazo_meses'))
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await api.post('/simulate/', {
        monto: monto,
        tasa_anual: tasa_anual,
        plazo_meses: plazo_meses
      })
      localStorage.setItem('monto', monto)
      localStorage.setItem('tasa_anual', tasa_anual)
      localStorage.setItem('plazo_meses', plazo_meses)
      setResultado(response.data)
    } catch (error) {
      console.error("Error al conectar con el Backend", error)
    }
  }

  return (
    <div className="flex min-h-screen px-5 py-5">
      <div className="bg-base-100 w-full rounded-md px-5 py-5">
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl font-semibold">
            Calcular Tabla de Amortizacion
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <form onSubmit={handleSubmit} className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={monto}
                  onChange={(e) => {
                    setMonto(e.target.value);
                    setResultado(null);
                  }}
                  type="number"
                  placeholder="Monto"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
                <input
                  value={tasa_anual}
                  onChange={(e) => {
                    setTasa_Anual(e.target.value);
                    setResultado(null);
                  }}
                  type="number"
                  placeholder="Tasa Anual"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <input
                value={plazo_meses}
                onChange={(e) => {
                    setPlazo_Meses(e.target.value);
                    setResultado(null);
                  }}
                type="number"
                placeholder="Plazo en meses"
                className="input input-bordered input-primary w-full"
              />
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button type='submit' className="btn btn-active btn-primary btn-block max-w-[200px]">
                  Calcular
                </button>
              </div>
            </form>
            {resultado && 
                <div className="overflow-x-auto mt-10">
                    <p className='font-semibold'>Cuota mensual: ${resultado.cuota_mensual}</p>
                    <p className='font-semibold'>Interes total: ${resultado.total_intereses}</p>
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Saldo Actual</th>
                            <th>Cuota</th>
                            <th>Interes {resultado.tasa_mensual}</th>
                            <th>Capital</th>
                            <th>Saldo Final</th>
                        </tr>
                        </thead>
                        <tbody>
                            {resultado.tabla.map((fila, index) => (
                                <tr key={index}>
                                    <th>{fila.mes}</th>
                                    <th>{fila.saldo_inicial}</th>
                                    <th>{fila.cuota_mensual}</th>
                                    <th>{fila.interes_mensual}</th>
                                    <th>{fila.capital}</th>
                                    <th>{fila.saldo_final}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimulateView;