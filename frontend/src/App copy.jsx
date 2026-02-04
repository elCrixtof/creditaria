import RegisterView from "./views/RegisterView";

function App() {
  return (
    <div className="min-h-screen bg-base-200 font-sans">
      
      {/* Navbar de DaisyUI */}
      <div className="navbar bg-base-100 shadow-md px-8">
        <div className="flex-1">
          <a className="text-xl font-bold text-primary tracking-tight">CreditSim</a>
        </div>
        {/* <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Inicio</a></li>
          </ul>
        </div> */}
      </div>

      {/* Contenedor Principal Centrado */}
      <main className="flex flex-col items-center justify-center p-4 mt-10">
        <div className="w-full max-w-md">
           <RegisterView />
        </div>
      </main>

    </div>
  );
}

export default App;