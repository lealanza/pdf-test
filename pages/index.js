import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import OrdenDeCompra from '../components/OrdenDeCompra';
import { getVentas, getProductos } from '@/axios/axios';
import {Tooltip, Cell, ResponsiveContainer, PieChart, Pie, LineChart, XAxis, YAxis, CartesianGrid,Line } from 'recharts';

const ImprimirOrden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [prodcutos, setProductos] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const ordenesData = await getVentas();
        setOrdenes(ordenesData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrdenes();
  }, []);
  useEffect(() => { 
    const fetchProductos = async () => {
      try {
        const productosData = await getProductos();
        setProductos(productosData);
      } catch (error) {
        console.error("Failed to fetch productos:", error);
      }
    };
    fetchProductos();  
  },[])

  const obtenerDetalleOrden = async (ordenId) => {
    try {
      const response = await fetch(`https://ghbackend.vercel.app/notas/ventas/${ordenId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch order details: ${error}`);
    }
  };

  
  const generarDetalleOrden = async (ordenId) => {
    try {
      const ordenDetalle = await obtenerDetalleOrden(ordenId);
      if (ordenDetalle) {
        setOrdenSeleccionada(ordenDetalle);
        setShowPDFViewer(true);
      }
    } catch (error) {
      console.error("Error generating order detail:", error);
    }
  };

  const cerrarPDFViewer = () => setShowPDFViewer(false);

  // Inlined renderPDFViewer to avoid unnecessary function calls
  const pdfViewer = ordenSeleccionada && showPDFViewer && (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <button onClick={cerrarPDFViewer}>Cerrar</button>
        <PDFViewer width="800px" height="100%" style={{ height: '80vh', borderRadius: '10px',zIndex:1000 }}>
          <OrdenDeCompra orden={ordenSeleccionada} />
        </PDFViewer>
      </div>
    </div>
  );
  const aggregateOrdersByDay = (ordenes) => {
    const counts = {};
    ordenes.forEach((order) => {
      const dateKey = order.status; // Assuming created_at is a timestamp
      if(counts[dateKey]){
        counts[dateKey].value += 1;
      } else {
        counts[dateKey] = { name: dateKey, value: 1 };
      }
    });
    return Object.values(counts);
  };
  const aggregateSalesByDay = (ordenes) => {
    const sales = {};
    ordenes.forEach((order) => {
      const dateKey = order.status; // Assuming created_at is a timestamp
      const totalVenta = order.valorTotal; // Asumiendo que hay un campo 'totalVenta' en tu objeto de orden
      if (sales[dateKey]) {
        sales[dateKey].value += totalVenta;
      } else {
        sales[dateKey] = { name: dateKey, value: totalVenta };
      }
    });
    return Object.values(sales);
  };
  const salesData = aggregateSalesByDay(ordenes); 
  const data = aggregateOrdersByDay(ordenes);
  const COLORS = ['#6682EA', '#EA666C', '#000000']; 

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'space-between' }}>
      <div style={{ width: '30%', overflowY: 'auto' }}>
        <h2>Lista de Órdenes</h2>
        <ul>
          {ordenes.map(orden => (
            <li key={orden._id} style={{ display: 'flex', gap: 5, padding: 10 }}>
              {`${orden.cliente.nombre} ${orden.cliente.apellido}`}
              <button onClick={() => generarDetalleOrden(orden._id)}>
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      </div>
      

      
     <div>
      <h2>Ordenes Ventas por día</h2>
      <div style={{ width: 800, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
      <div style={{ width: "100%", height: 300, border:'1px solid #6682EA', borderRadius:5 , padding:5, gap:5, backgroundColor:'#D5D7FC'}}>
        <ResponsiveContainer>
        <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={({ name, value }) => `${name}s: ${value} .`}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer> 
      </div>
      <div style={{ width: "100%", height: 300, border:'1px solid #6682EA', borderRadius:5 , padding:5, gap:5, backgroundColor:'#D5D7FC'}}>    <ResponsiveContainer>
      <LineChart data={salesData}>
        <YAxis stroke='#000FFF'/>
        <XAxis dataKey="name" stroke='#000FFF'/>
        <CartesianGrid stroke="#6682EA" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#000000" />
      </LineChart>
    </ResponsiveContainer>
      
      </div>
      <div style={{ width: "100%", height: 300, border:'1px solid #6682EA', borderRadius:5 , padding:5, gap:5, backgroundColor:'#D5D7FC'}}>          test
      </div>
      <div style={{ width: "100%", height: 300, border:'1px solid #6682EA', borderRadius:5, padding:5, gap:5, backgroundColor:'#D5D7FC' }}>          test
      </div>
      </div>
      </div>
      {pdfViewer}
      </div>
  );
};

export default ImprimirOrden;
