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
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Label,
    AreaChart,
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts';
import { Button, FormControl, InputGroup, Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { API_BASE_URL } from '../url';

const Poblacion = () => {
    const [poblaciones, setPoblaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [height, setHeight] = useState(400); // Ajuste de la altura predeterminada
    const [graphType, setGraphType] = useState('Bar'); // Tipo de gráfico seleccionado

    const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

    const formatPercentage = (value) => {
        if (value !== null && value !== undefined) {
            return `${(value * 100).toFixed(2)}%`;
        }
        return '-';
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
                        distribucion: parseFloat(fila[4]),
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

    const filteredData = poblaciones.filter((poblacion) =>
        poblacion.departamento.toLowerCase().includes(search.toLowerCase())
    );

    const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const columns = [
        { name: 'Departamento', selector: (row) => row.departamento, sortable: true },
        { name: 'Hombres', selector: (row) => formatNumber(row.hombres), sortable: true },
        { name: 'Mujeres', selector: (row) => formatNumber(row.mujeres), sortable: true },
        { name: 'Total', selector: (row) => formatNumber(row.total), sortable: true },
        { name: 'Distribución', selector: (row) => formatPercentage(row.distribucion) },
    ];

    const handleRowsPerPageChange = (e) => {
        const newRowsPerPage = Number(e.target.value);
        setRowsPerPage(newRowsPerPage);
        setHeight(newRowsPerPage * 45); // Ajusta la altura proporcionalmente
    };

    const handleGraphTypeChange = (type) => {
        setGraphType(type);
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
    };

    const tableStyle = {
        maxHeight: height, // Usamos maxHeight para ajustar dinámicamente
        overflowY: 'auto', // Activamos el scroll si los datos sobrepasan el espacio disponible
    };

    const cardStyle = {
        height: '100%',
    };

    return (
        <Container fluid className="py-4">
            <Row>
                {/* Tabla */}
                <Col lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">Datos de Población</h5>
                        </Card.Header>
                        <Card.Body>
                            {/* Buscador y control de filas */}
                            <div className="d-flex justify-content-between mb-2">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Buscar por departamento"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setSearch('')}
                                        className="bg-success text-white"
                                    >
                                        Limpiar
                                    </Button>
                                </InputGroup>

                                {/* Separación entre InputGroup y el select */}
                                <div className="ml-4">
                                    <FormControl
                                        as="select"
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </FormControl>
                                </div>
                            </div>

                            {/* Tabla */}
                            <DataTable
                                columns={columns}
                                data={currentData}
                                highlightOnHover
                                pagination={false}
                                paginationPerPage={rowsPerPage}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        },
                                    },
                                }}
                            />

                            {/* Paginación */}
                            <div className="d-flex justify-content-between mt-2">
                                <Button
                                    variant="success"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </Button>
                                <span>
                                    Página {currentPage} de {Math.ceil(filteredData.length / rowsPerPage)}
                                </span>
                                <Button
                                    variant="success"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Gráfico */}
                <Col lg={6}>
                    <Card className="shadow-sm" style={cardStyle}>
                        <Card.Header className="bg-primary text-white d-flex justify-content-between">
                            <h5 className="mb-0">Gráfico de Población</h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Seleccionar Gráfico
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleGraphTypeChange('Bar')}>Gráfico de Barras</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleGraphTypeChange('Line')}>Gráfico de Líneas</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleGraphTypeChange('Area')}>Gráfico de Áreas</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleGraphTypeChange('Radar')}>Gráfico Radar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body style={{ height }}>
                            <ResponsiveContainer width="100%" height="100%">
                                {graphType === 'Bar' ? (
                                    <BarChart data={poblaciones}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="departamento" />
                                        <YAxis tickFormatter={formatNumber} />
                                        <Tooltip formatter={(value) => formatNumber(value)} />
                                        <Legend />
                                        <Bar dataKey="hombres" fill="#4A90E2" name="Hombres" />
                                        <Bar dataKey="mujeres" fill="#F15454" name="Mujeres" />
                                    </BarChart>
                                ) : graphType === 'Line' ? (
                                    <LineChart data={poblaciones}>
                                        <XAxis dataKey="departamento" />
                                        <YAxis tickFormatter={formatNumber} />
                                        <Tooltip formatter={(value) => formatNumber(value)} />
                                        <Legend />
                                        <Line type="monotone" dataKey="hombres" stroke="#4A90E2" />
                                        <Line type="monotone" dataKey="mujeres" stroke="#F15454" />
                                    </LineChart>
                                ) : graphType === 'Area' ? (
                                    <AreaChart data={poblaciones}>
                                        <XAxis dataKey="departamento" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="hombres" fill="#4A90E2" stroke="#4A90E2" />
                                        <Area type="monotone" dataKey="mujeres" fill="#F15454" stroke="#F15454" />
                                    </AreaChart>
                                ) : graphType === 'Radar' && poblaciones && poblaciones.length > 0 ? (
                                    <RadarChart outerRadius={160} width={730} height={300} data={poblaciones}>
                                        <PolarGrid strokeDasharray="3 3" />
                                        <PolarAngleAxis 
                                            dataKey="departamento" 
                                            stroke="#000" 
                                            fontSize={20} 
                                            tickLine={false} 
                                            tick={{ fill: '#000', fontSize: 20 }} 
                                        />
                                        <PolarRadiusAxis 
                                            angle={30} 
                                            domain={[0, 'dataMax']} 
                                            stroke="#000" 
                                            tick={false} 
                                        />
                                        <Radar 
                                            name="Hombres" 
                                            dataKey="hombres" 
                                            stroke="#4A90E2" 
                                            fill="#4A90E2" 
                                            fillOpacity={0.6} 
                                            dot={{ r: 4, fill: '#4A90E2', strokeWidth: 1 }} 
                                        />
                                        <Radar 
                                            name="Mujeres" 
                                            dataKey="mujeres" 
                                            stroke="#F15454" 
                                            fill="#F15454" 
                                            fillOpacity={0.6} 
                                            dot={{ r: 4, fill: '#F15454', strokeWidth: 1 }} 
                                        />
                                        <Tooltip 
                                            formatter={(value, name, props) => {
                                                if (name === 'Hombres') {
                                                    return `Hombres: ${value}`;
                                                } else if (name === 'Mujeres') {
                                                    return `Mujeres: ${value}`;
                                                }
                                                return value;
                                            }}
                                            labelFormatter={(label) => `Departamento: ${label}`} 
                                            wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '5px' }} 
                                        />
                                        <Legend 
                                            iconSize={20} 
                                            width={200} 
                                            height={36} 
                                            layout="horizontal" 
                                            verticalAlign="top" 
                                            align="center" 
                                            iconType="circle" 
                                            payload={[ 
                                                { value: 'Hombres', type: 'square', color: '#4A90E2' },
                                                { value: 'Mujeres', type: 'square', color: '#F15454' }
                                            ]}
                                        />
                                    </RadarChart>
                                ) : null}
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Poblacion;
