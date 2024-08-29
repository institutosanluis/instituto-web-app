import firebase from "firebase/app";
import "firebase/storage";


const updatePhoto = (file, categoria) => {
    return new Promise((resolve, reject) => {
        try {

            /*const { files } = refs;
            const file = files[0]; */
            if (file) {
                setTimeout(async () => {
                    var nameFile = Date.now() + "_" + file.name;
                    const response = await firebase
                        .storage()
                        .ref(`${categoria}/${nameFile}`)
                        .put(file);
                    const url = await response.ref.getDownloadURL();
                    var ref = response.metadata;
                    var idfoto = ref.name;
                    var result = { url: url, id: idfoto }
                    resolve(result)
                }, 10);

            } else {
                console.log("falta el archivo");

            }
        } catch (error) {
            reject(error)
        }
    })
}

/*const updatePhotoProfile = (file) => {
    return new Promise((resolve, reject) => {
        try {

            if (file) {
                setTimeout(async () => {
                    var nameFile = Date.now() + "_" + file.name;
                    const response = await firebase
                        .storage()
                        .ref(`Profile/${nameFile}`)
                        .put(file);
                    const url = await response.ref.getDownloadURL();
                    var ref = response.metadata;
                    var idfoto = ref.name;
                    var result = { url: url, id: idfoto }
                    resolve(result)
                }, 10);

            } else {
                console.log("falta el archivo");

            }
        } catch (error) {
            reject(error)
        }
    })
} */

export default updatePhoto