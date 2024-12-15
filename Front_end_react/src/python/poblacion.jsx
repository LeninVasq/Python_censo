import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../url';

const Poblacion = () => {
    const [poblaciones, setPoblaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPoblaciones = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}poblacion`);
                const data = await response.json();
                console.log('Datos de la API:', data); // Verifica los datos aquí

                // Verifica que 'data.data' tenga contenido
                if (data && data.data && Array.isArray(data.data)) {
                    const poblacionesTransformadas = data.data.slice(1).map((fila) => ({
                        departamento: fila[0],
                        hombres: fila[1],
                        mujeres: fila[2],
                        total: fila[3],
                        distribucion: fila[4],
                    }));

                    setPoblaciones(poblacionesTransformadas);
                } else {
                    setError('Datos no disponibles o en formato incorrecto');
                }
            } catch (error) {
                console.error('Error al obtener los datos de población:', error);
                alert(error);
                setError('Hubo un error al obtener los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchPoblaciones();
    }, []);

    // Mostrar un mensaje de carga o error si es necesario
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <table className="table table-striped table-bordered table-hover w-full border-collapse rounded-lg">
            <thead className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <tr>
                    <th>Departamento</th>
                    <th>Hombres</th>
                    <th>Mujeres</th>
                    <th>Total</th>
                    <th>Distribucion</th>
                </tr>
            </thead>
            <tbody>
                {poblaciones.map((poblacion, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                        <td>{poblacion.departamento}</td>
                        <td>{poblacion.hombres}</td>
                        <td>{poblacion.mujeres}</td>
                        <td>{poblacion.total}</td>
                        <td>{poblacion.distribucion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Poblacion;
