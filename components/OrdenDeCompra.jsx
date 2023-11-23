import React from 'react';
import { Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    width:'100%',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  }, 
  watermark: {
    position: 'absolute',
    minWidth: '100%', // Ensure it covers full page width
    minHeight: '100%', // Ensure it covers full page height
    opacity: 0.1, // Make the logo transparent
    zIndex: -1, // Place the watermark behind other content
  },
  
  
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('es', options);
};

const OrdenDeCompraPDF = ({ orden }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      <View style={styles.section}>
        <Image src={'https://i.ibb.co/85NtSrj/Logo-Image.jpg'} alt='' style={{width:150, height:150, borderRadius:5, opacity:0.2, zIndex:'-1', position:'absolute', top:'20%', left:'50%', transform:'translate(-50%, -50%)', margin:'auto' }}/>
        <Text style={styles.title}>Orden de Compra</Text>
        <Text style={styles.subtitle}>Datos del Cliente</Text>
        <Text style={styles.text}>Nombre: {orden.cliente?.nombre || ''} {orden.cliente?.apellido || ''}</Text>
        <Text style={styles.text}>CUIT: {orden.cliente?.cuit || ''}</Text>
        <Text style={styles.text}>Teléfono: {orden.cliente?.telefono || ''}</Text>
        <Text style={styles.text}>Condición: {orden.cliente?.condicion || ''}</Text>

        <Text style={styles.subtitle}>Productos</Text>
        {orden.products?.map((producto, index) => (
          <Text key={producto.numArt.id} style={styles.text}>Nombre: {producto.numArt.numArt} - Precio: ${producto.valorUniArt.toFixed(2)} - Cantidad: {producto.cantidad}</Text>
          ))}
        <Text style={styles.subtitle}>Resumen de la Orden</Text>
        <Text style={styles.text}>Valor Total: ${orden.valorTotal}</Text>
        <Text style={styles.text}>Creada: {formatDate(orden.created_at)}</Text>
        <Text style={styles.text}>Estado: {orden.status} el {formatDate(orden.updatedAt)}</Text>
      </View>
      
    </Page>
    
  </Document>
);

export default OrdenDeCompraPDF;
