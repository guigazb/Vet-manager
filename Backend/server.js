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

// imports de tabelas mapeadas no backend (nem sempre é igual ao frontend)

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
// app.use('/api/tabela', tabelaRoutes); por exemplo

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
        './routes/indicador/*.js',
        './routes/processo/*.js',
        './routes/publico/*.js',
        './routes/risco/*.js',
    ], // Caminho aos DOCs de API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Final da configuração com Swagger

// Gerenciamento de Error
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
