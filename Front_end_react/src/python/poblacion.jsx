import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { API_BASE_URL } from '../url';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const Poblacion = () => {
    const [poblaciones, setPoblaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    useEffect(() => {
        const fetchPoblaciones = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}poblacion`);
                const data = await response.json();

                if (data && data.data && Array.isArray(data.data)) {
                    const poblacionesTransformadas = data.data.slice(1).map((fila) => ({
                        departamento: fila[0],
                        hombres: parseInt(fila[1], 10),
                        mujeres: parseInt(fila[2], 10),
                        total: parseInt(fila[3], 10),
                        distribucion: fila[4],
                    }));

                    setPoblaciones(poblacionesTransformadas);
                } else {
                    setError('Datos no disponibles o en formato incorrecto');
                }
            } catch (error) {
                console.error('Error al obtener los datos de población:', error);
                setError('Hubo un error al obtener los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchPoblaciones();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="h4 text-dark">Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="h4 text-danger">{error}</p>
            </div>
        );
    }

    const filteredData = poblaciones.filter((poblacion) =>
        poblacion.departamento.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { name: 'Departamento', selector: (row) => row.departamento, sortable: true },
        {
            name: 'Hombres',
            selector: (row) => formatNumber(row.hombres),
            sortable: true,
            sortFunction: (rowA, rowB) => rowB.hombres - rowA.hombres, // Ordenar de mayor a menor
        },
        {
            name: 'Mujeres',
            selector: (row) => formatNumber(row.mujeres),
            sortable: true,
            sortFunction: (rowA, rowB) => rowB.mujeres - rowA.mujeres, // Ordenar de mayor a menor
        },
        {
            name: 'Total',
            selector: (row) => formatNumber(row.total),
            sortable: true,
            sortFunction: (rowA, rowB) => rowB.total - rowA.total, // Ordenar de mayor a menor
        },
        { name: 'Distribución', selector: (row) => row.distribucion, sortable: false },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                '&:hover': {
                    backgroundColor: '#e8f5e9', // Light green on hover
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
            },
        },
    };

    return (
        <div className="container py-5">
            <div className="row">
                {/* Sección de la tabla */}
                <section className="col-12 col-lg-6 mb-4">
                    <div className="shadow-lg rounded bg-white p-4">
                        <h2 className="h5 mb-4 text-gray-700">Datos de Población</h2>

                        {/* Buscador mejorado */}
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Buscar por departamento"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Buscar"
                            />
                            <Button variant="outline-secondary" onClick={() => setSearch('')}>
                                Limpiar
                            </Button>
                        </InputGroup>

                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            paginationPerPage={rowsPerPage}
                            onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
                            highlightOnHover
                            customStyles={customStyles}
                            sortIcon={<span className="material-icons">sort</span>} // Icono para orden
                        />
                    </div>
                </section>

                {/* Sección del gráfico */}
                <section className="col-12 col-lg-6">
                    <div className="shadow-lg rounded bg-white p-4">
                        <h2 className="h5 mb-4 text-gray-700">Gráfico de Población</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={poblaciones}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="departamento" />
                                <YAxis tickFormatter={formatNumber} />
                                <Tooltip formatter={(value) => formatNumber(value)} />
                                <Legend />
                                <Bar dataKey="hombres" fill="#4A90E2" name="Hombres" />
                                <Bar dataKey="mujeres" fill="#F15454" name="Mujeres" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Poblacion;
