import imagemRepository from "../Repository/imagemRepository";

class ImagemService {

    async createImage(image) {
        if (image.titulo.length < 4) {
            throw new Error("Título deve ter pelo menos 5 caracteres");
        }
        return imagemRepository.create(image);
    }

}

export default new ImagemService();