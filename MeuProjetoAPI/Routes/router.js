import express from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import imagemRoutes from './imagemRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/usuario', usuarioRoutes);
app.use('/imagem', imagemRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
