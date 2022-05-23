import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as dotenv from "dotenv";
import { mailRouter } from "./routes/mail.router";
const app = express();
dotenv.config();


//Documentation
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Reto Final Etapa 1',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8090'
            }
        ]
    }, 
    apis: ['./dist/docs/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/mail',mailRouter)


// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});