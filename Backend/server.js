import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

// Necessário para que Frontend possa acessar os dados do Backend
import cors from 'cors';

// Dotenv
import dotenv from 'dotenv';
dotenv.config()

// Tabelas do banco de dados - Público
import animalExameRoutes from './routes/public/animalExameRoutes.js';
import animalRoutes from './routes/public/animalRoutes.js';
import animalTratamentoRoutes from './routes/public/animalTratamentoRoutes.js';
import clienteRoutes from './routes/public/clienteRoutes.js';
import consultaRoutes from './routes/public/consultaRoutes.js';
import especialidadeRoutes from './routes/public/especialidadeRoutes.js';
import exameConsultaRoutes from './routes/public/exameConsultaRoutes.js';
import exameRoutes from './routes/public/exameRoutes.js';
import funcionarioRoutes from './routes/public/funcionarioRoutes.js';
import medicoEspecialidadeRoutes from './routes/public/medicoEspecialidadeRoutes.js';
import medicoRoutes from './routes/public/medicoRoutes.js';
import racaRoutes from './routes/public/racaRoutes.js';
import receitaRoutes from './routes/public/receitaRoutes.js';
import telefoneMedicoRoutes from './routes/public/telefoneMedicoRoutes.js';
import telefoneRoutes from './routes/public/telefoneRoutes.js';
import tipoAnimalRoutes from './routes/public/tipoAnimalRoutes.js';
import tratamentoConsultaRoutes from './routes/public/tratamentoConsultaRoutes.js';
import tratamentoRoutes from './routes/public/tratamentoRoutes.js';


const port = process.env.PORT || 8000;

// Recupera o nome do diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const cliente = process.env.APP_CLIENT;

app.use(cors({
    origin: cliente, 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    //,credentials: true  // Enable cookies if needed
}));

// Middleware Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Configura a pasta estática
app.use(express.static(path.join(__dirname, 'public')));

// Rotas

// Publico
app.use('/api/public/animalexame', animalExameRoutes); 
app.use('/api/public/animal', animalRoutes); 
app.use('/api/public/animaltratamento', animalTratamentoRoutes); 
app.use('/api/public/cliente', clienteRoutes); 
app.use('/api/public/consulta', consultaRoutes); 
app.use('/api/public/especialidade', especialidadeRoutes); 
app.use('/api/public/exameconsulta', exameConsultaRoutes); 
app.use('/api/public/exame', exameRoutes); 
app.use('/api/public/funcionario', funcionarioRoutes); 
app.use('/api/public/medicoespecialidade', medicoEspecialidadeRoutes);
app.use('/api/public/medico', medicoRoutes);
app.use('/api/public/raca', racaRoutes); 
app.use('/api/public/receita', receitaRoutes); 
app.use('/api/public/telefonemedico', telefoneMedicoRoutes); 
app.use('/api/public/telefone', telefoneRoutes); 
app.use('/api/public/tipoanimal', tipoAnimalRoutes);
app.use('/api/public/tratamentoconsulta', tratamentoConsultaRoutes);
app.use('/api/public/tratamento', tratamentoRoutes);

// Configurações necessárias para o Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
        },
    },
    apis: [
        './routes/public/*.js',
    ], // Caminho aos DOCs de API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Final da configuração com Swagger

// Gerenciamento de Error
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
