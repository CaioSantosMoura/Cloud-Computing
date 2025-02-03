import usuarioRepository from "../Repository/usuarioRepository";

class UsuarioService {
    async createUsuarios(usuario) {
        if (usuario.nome.length > 2) {
            throw new Error("Nome de usuário deve ter pelo menos 5 caracteres");
        }
        return await usuarioRepository.create(usuario);
    }
}

export default new UsuarioService();