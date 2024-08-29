import url from './api';
class api {


    async allNoso() {
        return await url.get("/api/noso/all")
    }

        //Trae las imagen de infraestructura
        async getPortada(value) {
            return await url.get(`/api/porta/modulo/${value}`)
        }

        async allAnuncios() {
            return await url.get(`/api/anun/all`)
        }

        async allNoticiasTop5() {
            return await url.get(`/api/noti/top5`)
        }

        async allNoticias() {
            return await url.get(`/api/noti/all`)
        }

        async getMensualidades() {
            return await url.get(`/api/nive/mensualidades`)
        }

        async allGaleriaNoti(id) {
            return await url.get(`/api/noti/galeria-noti/${id}`)
        }

        async getNiveles() {
            return await url.get(`/api/nive/niveles` )
        }
    
        async getRequisitosAll() {
            return await url.get(`/api/nive/requisitos` )
        }
    

        async allInfraestructura() {
            return await url.get(`/api/infra/all`)
        }

        async allAnuncioTotal() {
            return await url.get(`/api/anun/total`)
        }

        async allGrados() {
            return await url.get(`/api/nive/grados-basico`)
        }

        async allCarreraId(id) {
            return await url.get(`/api/nive/carreras/${id}`)
        }

        async allGradosCarreraId(id) {
            return await url.get(`/api/nive/grados-carrera/${id}`)
        }  

        async allCursosGrados(carrera, grado) {
            return await url.get(`/api/nive/cursos/${carrera}`)
        } 

        async allCarreras() {
            return await url.get(`/api/nive/carreras`)
        }
    

    //Trae la visión y mision
    async infoVMEstablecimiento() {
        return await url.get("/api/informacion/info-establecimiento")
    }

    //Trae las imagen de infraestructura
    async getInfraestructura() {
        return await url.get(`/api/fran/all`)
    }

        //Trae las imagen de infraestructura
        async getPositionFranja(modulo, posicion) {
            return await url.get(`/api/fran/franja/${modulo}/${posicion}`);
        }
    

    //Trae la agenda por fecha


    async getAgendFecha(data) {
        return await url.get(`/api/even/allNivelId/${data.nivel}/${data.fecha}` )
    }

    async getAgendAllNivel(id) {
        return await url.get(`/api/even/all/${id}` )
    }

    //Trae todos lo nivel para admin
    async getAllNiveles() {
        return await url.get(`/api/nive/all`)
    }


        //Trae todos las reseñas
        async getAllResenias() {
            return await url.get(`/api/resenias/allResenias`)
        }

    //Trae todos las portadas para admin
    async getAllPortadas() {
        return await url.get(`/api/portadas/all`)
    }

    //Trae  la portada para admin por id
    async getPortadasId(id) {
        return await url.get(`/api/portadas/getportada/${id}`)
    }


    //Trae las portadas
    async getPortadas(type) {
        return await url.get(`/api/informacion/portada/${type}`)
    }

    //Trae las Eventos Actividades
    async getEventosActividades() {
        return await url.get(`/api/informacion/eventosActividades`)
    }

    //Trae las Eventos Actividades
    async getAllEventosActividades() {
        return await url.get(`/api/informacion/alleventosActividades`)
    }

    //Trae las Carreras
    async getDiverCarreras() {
        return await url.get(`/api/informacion/carreras`)
    }

    //Trae las Grados
    async getBasicoGrados() {
        return await url.get(`/api/informacion/basico/grado`)
    }

    //Trae las Requisitos
    async getRequisitos() {
        return await url.get(`/api/informacion/requisitos`)
    }

    //Trae los CONTAMOS CON
    async getContamosCon() {
        return await url.get(`/api/informacion/contamoscon`)
    }

    async addCarrera(data) {
        return await url.post(`/api/informacion/agregar-carrera`, data)
    }

    async addPortada(data) {
        return await url.post(`/api/portadas/agregar-portada`, data)
    }

    async addResenia(data) {
        return await url.post(`/api/resenias/agregar`, data)
    }


    async addCaracteristicas(data) {
        return await url.post(`/api/informacion/agregar-caracteristicas`, data)
    }

    async addEventosActividades(data) {
        return await url.post(`/api/informacion/agregar-evento`, data)
    }

    //Agregar los cursos a cada Carrera
    async addCarreraGrado(data) {
        return await url.post(`/api/informacion/agregar-carrera-grado`, data)
    }


    //Trae los Admisiones
    async getNivelesAdmision() {
        return await url.get(`/api/admision/allAdmisiones`)
    }




    //Trae los Admisiones
    async getNivelGrado(_id,_idgrado) {
        return await url.get(`/api/niveles/nivel/${_id}/${_idgrado}`)
    }


    async addGrado(data) {
        return await url.post(`/api/informacion/agregar-grado`, data)
    }

    async addRequisitos(data) {
        return await url.post(`/api/informacion/agregar-requisitos`, data)
    }

    async addCarrera(data) {
        return await url.post(`/api/informacion/agregar-carrera`, data)
    }


    //DELETO FOTO FIREBSE
    async deletePhoto(valor) {
        console.log(valor)
        return await url.post('/api/informacion/delete_image', { id: valor.id, carpeta: valor.categoria })
    }

}
export default new api();