import {useState} from 'react'
import api from '../api/axios'

const SimulateView = () => {
  const [monto, setMonto] = useState(3000)
  const [tasa_anual, setTasa_Anual] = useState(15)
  const [plazo_meses, setPlazo_Meses] = useState(6)
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await api.post('/simulate/', {
        monto: monto,
        tasa_anual: tasa_anual,
        plazo_meses: plazo_meses
      })
      
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
                  onChange={(e) => setMonto(e.target.value)}
                  type="number"
                  placeholder="Monto"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
                <input
                  value={tasa_anual}
                  onChange={(e) => setTasa_Anual(e.target.value)}
                  type="number"
                  placeholder="Tasa Anual"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <input
                value={plazo_meses}
                onChange={(e) => setPlazo_Meses(e.target.value)}
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
                            <th>mes</th>
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
    // <div className='mockup-window border border-base-300 w-full'>
    //     <div className='grid place-content-center border-t border-base-300 h-80'>
    //         <h2>Simular Amortizacion</h2>
    //             <fieldset onSubmit={handleSubmit} className='fieldset'>
    //                 {/* <legend className='fieldset-legent'>Ingresa monto</legend> */}
    //                 <label class='label'>Monto</label>
    //                 <input 
    //                     className='input' 
    //                     type="number" 
    //                     value={monto}
    //                     onChange={(e) => setMonto(e.target.value)}
    //                 />
    //                 <label class='label'>Tasa Anual</label>
    //                 <input 
    //                     className='input' 
    //                     type="number" 
    //                     value={tasa_anual}
    //                     onChange={(e) => setTasa_Anual(e.target.value)}
    //                 />
    //                 <label class='label'>Plazo en meses</label>
    //                 <input 
    //                     className='input' 
    //                     type="number" 
    //                     value={plazo_meses}
    //                     onChange={(e) => setPlazo_Meses(e.target.value)}
    //                 />
    //                 <button 
    //                     className='btn btn-neutral mt-4'
    //                     type='submit'
    //                 >
    //                     Calcular
    //                     </button>
    //             </fieldset>
    //     </div>
    // </div>
    // <div style={{padding:'20px'}}>
    //   <h1>CreditSim</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>Monto del prestamo</label>
    //     <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
    //     <button type='submit'>Calcular</button>
    //   </form>
    //   {resultado && 
    //     <div style={{ marginTop: '20px' }}>
    //       <h3>Cuota mensual: ${resultado.cuota_mensual}</h3>
    //       <p>Interes total: ${resultado.total_intereses}</p>
    //     </div>
    //   }
    // </div>
  )
}

export default SimulateView;