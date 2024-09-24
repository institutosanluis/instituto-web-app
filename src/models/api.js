import axios from "axios"

 const axiosInstance = axios.create({ 
    baseURL:'http://localhost:3000/'   /*'https://serverinsituto.onrender.com' */ ,// 'https://instituto-4b04a6f72af3.herokuapp.com/', // 'http://localhost:3000/', // 'https://instituto-4b04a6f72af3.herokuapp.com/',      /*  'http://localhost:3000/',*/
    //timeout: 100000, // Tiempo máximo de espera para una solicitud (opcional)
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*"
    }
});

// Interceptor de respuesta para manejar errores globalmente
axiosInstance.interceptors.response.use(
    response => {
      // Devuelve la respuesta si es exitosa
      return response;
    },
    error => {
      // Maneja los errores aquí
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        switch (error.response.status) {
          case 401:
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = '/';
            break;
          case 403:
            alert('No tienes permiso para realizar esta acción.');
            break;
          case 500:
            alert('Error del servidor, por favor intenta más tarde.');
            break;
          default:
            alert(`Error: ${error.response.status} - ${error.response.data}`);
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        alert('No se recibió respuesta del servidor.');
      } else {
        // Algo sucedió al configurar la solicitud
        alert(`Error en la configuración de la solicitud: ${error.message}`);
      }
  
      return Promise.reject(error);
    }
  );

  export default axiosInstance;