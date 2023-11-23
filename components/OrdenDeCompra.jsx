import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image as PdfImage } from '@react-pdf/renderer';
import LogoImage from '../public/LogoImage.png';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
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
  img: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
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
      <img src={LogoImage} style={styles.img} alt=''/>
        <Text style={styles.title}>Orden de Compra</Text>
        <Text style={styles.subtitle}>Datos del Cliente</Text>
        <Text style={styles.text}>Nombre: {orden.cliente?.nombre || ''} {orden.cliente?.apellido || ''}</Text>
        <Text style={styles.text}>CUIT: {orden.cliente?.cuit || ''}</Text>
        <Text style={styles.text}>Teléfono: {orden.cliente?.telefono || ''}</Text>
        <Text style={styles.text}>Condición: {orden.cliente?.condicion || ''}</Text>

        <Text style={styles.subtitle}>Productos</Text>
        {orden.products?.map((producto, index) => (
          <Text key={producto.numArt.id} style={styles.text}>Nombre: {producto.numArt.nombre} - Precio: ${producto.valorUniArt.toFixed(2)} - Cantidad: {producto.cantidad}</Text>
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
