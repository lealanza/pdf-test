import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import OrdenDeCompra from '../components/OrdenDeCompra';
import { getVentas } from '@/axios/axios';
const ImprimirOrden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false); // State to control PDF viewer visibility

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const ordenesData = await getVentas();
        setOrdenes(ordenesData);
        console.log({ordenesData})
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrdenes();
  }, []);

  const obtenerDetalleOrden = async (ordenId) => {
    try {
      const response = await fetch(`https://ghbackend.vercel.app/notas/ventas/${ordenId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error(`Failed to fetch order details: ${error}`);
    }
  };

  const generarDetalleOrden = async (ordenId) => {
    const ordenDetalle = await obtenerDetalleOrden(ordenId);
    setOrdenSeleccionada(ordenDetalle);
    setShowPDFViewer(true); // Open the PDF viewer when an order is selected
  };

  const cerrarPDFViewer = () => {
    setShowPDFViewer(false); // Close the PDF viewer
  };

  const renderPDFViewer = () => {
    if (ordenSeleccionada && showPDFViewer) {
      return (
        <div style={{flex:1}}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end' }}>
          <div>
            <button onClick={cerrarPDFViewer}>Cerrar</button></div>
          <div style={{height:'80vh', borderRadius:'50%'}}>
            <PDFViewer width="100%" height="100%" style={{borderRadius:10}}>
              <OrdenDeCompra orden={ordenSeleccionada} />
            </PDFViewer>
            </div>
        </div>
        </div>

      ); 
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent:'space-between'  }}>
      <div style={{ width: '30%', overflowY: 'auto' }}>
        <h2>Lista de Órdenes</h2>
        <ul>
          {ordenes.map((orden) => (
            <li key={orden._id} style={{display:'flex', gap:5, padding:10}}>
             {orden.cliente.nombre} {orden.cliente.apellido} 
              <button onClick={() => generarDetalleOrden(orden._id)}>
                 Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      </div>
      {renderPDFViewer()}
    </div>
  );
};

export default ImprimirOrden;
