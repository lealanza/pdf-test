import React from 'react';
import { Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    margin:'auto',
    width:'100%',
    height:'100vh',

  },
  borde:{
    margin:10,
    padding:10,
    width:'95%',
    height:'95%',
    border:"1px solid black",
    borderRadius:5,

  },
  header:{
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    border:"1px solid black",
    borderRadius:5,
    padding:10,
    margin:10,
    height:100
  },
  section: {
    margin: 10,
    padding: 10,
    border:"1px solid black",
    borderRadius:5,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 8,
    margin:1
  }, 
  watermark: {
    position: 'absolute',
    minWidth: '100%', // Ensure it covers full page width
    minHeight: '100%', // Ensure it covers full page height
    opacity: 0.1, // Make the logo transparent
    zIndex: -1, // Place the watermark behind other content
  },
  subsection:{
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  products:{
    height:600,
  },

  
  
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('es', options);
};

const OrdenDeCompraPDF = ({ orden }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.borde}>
    <Image src={'https://i.ibb.co/85NtSrj/Logo-Image.jpg'} alt='' style={{width:150, height:150, borderRadius:5, opacity:0.6, zIndex:'-1', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', margin:'auto' }}/>
    <View style={{fontSize:10, border:"1px solid black", margin:'0 auto', width:30, height:30, textAlign:"center",display:'flex', alignItems:'center', justifyContent:'center'}} >
        <Text>X</Text>
      </View>
     
    <Text style={{textAlign:'center', fontSize:6, marginTop:10}}>Documento no valido como factura</Text>
      <View style={styles.header}>
      <View  >
        
        <Text style={styles.subtitle}>Datos del Cliente</Text>
        <Text style={styles.text}>Nombre: {orden.cliente?.nombre || ''} {orden.cliente?.apellido || ''}</Text>
        <Text style={styles.text}>CUIT: {orden.cliente?.cuit || ''}</Text>
        <Text style={styles.text}>Teléfono: {orden.cliente?.telefono || ''}</Text>
        <Text style={styles.text}>Condición: {orden.cliente?.condicion || ''}</Text>
      </View >
      
      <View >
        <Text style={styles.text}>Guillermo Haidar</Text>
        <Text style={styles.text}>Guemes 2322</Text>
        <Text style={styles.text}>San Jeronimo Norte</Text>
        <Text style={styles.text}>tel: 324564556</Text>
      </View>
      </View>
     
      <View style={styles.products}>
        <Text style={styles.subtitle}>Productos</Text>
          <View style={{ flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text style={{ width: '40%', fontWeight: 'bold', fontSize:8, textAlign:'center' }}>Codigo</Text>
            <Text style={{ width: '40%', fontWeight: 'bold', fontSize:8, textAlign:'center' }}>Nombre</Text>
            <Text style={{ width: '30%', fontWeight: 'bold', fontSize:8, textAlign:'center' }}>Precio Unitario</Text>
            <Text style={{ width: '30%', fontWeight: 'bold', fontSize:8, textAlign:'center' }}>Cantidad</Text>
          </View>
          {orden.products?.map((producto, index) => (
            <View key={producto.product.id} style={{ flexDirection: 'row', marginBottom: 5}}>
              <Text style={{ width: '40%', fontSize:8, textAlign:'center' }}>{producto.product.codigoFab}</Text>
              <Text style={{ width: '40%', fontSize:8, textAlign:'center' }}>{producto.product.titleArt}</Text>
              <Text style={{ width: '30%', fontSize:8, textAlign:'center' }}>${producto.product.valorUniArt.toFixed(2)}</Text>
              <Text style={{ width: '30%', fontSize:8, textAlign:'center' }}>{producto.cantidad}</Text>
            </View>
          ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Resumen de la Orden</Text>     
        <View style={styles.subsection}>
                  <Text style={styles.text}>Valor Total: ${orden.valorTotal}</Text>
        <Text style={styles.text}>Creada: {formatDate(orden.created_at)}</Text>
        <Text style={styles.text}>Estado: {orden.status} el {formatDate(orden.updatedAt)}</Text>
      </View>
      </View>
      </View>
      
    </Page>
    
  </Document>
);

export default OrdenDeCompraPDF;
