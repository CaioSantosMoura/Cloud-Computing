import usuarioRepository from "../Repository/usuarioRepository";

class UsuarioService {
    async createUsuarios(usuario) {
        if (usuario.nome.length > 2) {
            throw new Error("Nome de usuário deve ter pelo menos 3 caracteres");
        }
        return usuarioRepository.create(usuario);
    }
}

export default new UsuarioService();