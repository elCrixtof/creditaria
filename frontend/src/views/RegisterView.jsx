import { useState } from 'react';
import axios from 'axios';

const RegisterView = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [status, setStatus] = useState({ message: '', isError: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.prevent.Default();
        try {
            const res = await axios.post('http://localhost:8000/register', formData)
            setStatus({ message: `Usuario ${res.data.username} creado`, isError: false});
        } catch (err) {
            setStatus({
                message: err.response?.data?.detail || 'Error en el servidor',
                isError: true
            })
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-2xl mb-4">Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-semibold">Usuario</span>
                    </label>
                    <input 
                    name="username"
                    type="text" 
                    placeholder="Nombre de usuario" 
                    className="input input-bordered w-full" 
                    onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-semibold">Contraseña</span>
                    </label>
                    <input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-bordered w-full" 
                    onChange={handleChange}
                    />
                </div>

                <div className="card-actions justify-end mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                    Registrarse
                    </button>
                </div>
                </form>
                
                {status.message && (
                <div className={`alert ${status.isError ? 'alert-error' : 'alert-success'} mt-4 shadow-sm`}>
                    <span>{status.message}</span>
                </div>
                )}
            </div>
        </div>
    )
}

export default RegisterView;