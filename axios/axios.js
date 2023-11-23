import axios from "axios";

const url = 'https://ghbackend.vercel.app'

export const getVentas = async () => {
    try {
        const response = await axios.get(`${url}/notas/ventas/all`)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

export const obtenerDetalleOrden = async (id) => {
    try {
        const response = await axios.get(`${url}/notas/ventas/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        
    }

}