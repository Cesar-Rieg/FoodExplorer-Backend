require("express-async-errors");
require("dotenv/config");

// Configurações do ambiente
const cors = require("cors");
const express = require("express");
const routes = require("./Routes/index.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


// Aplicar migrations
const RunMigrations = require("./Database/Sqlite/Migrations");
RunMigrations();


// Api Exception
const ApiException = require("./Exception/ApiException.js");
const DatabaseErrorTranslateService = require("./Services/DatabaseErrorTranslateService.js");
const HttpStatusCode = require("./HttpStatusCode/HttpStatusCode.js");
app.use((error, request, response, next) => {
    if(error instanceof ApiException){
        return response.status(error.StatusCode).json( {
            Status: "Error",
            StatusCode: error.StatusCode,
            Message: error.Message
        })
    }

    console.error(error);

    const _databaseErrorTranslateService = new DatabaseErrorTranslateService();
    const databaseError = _databaseErrorTranslateService.GetDatabaseError(error);
    
    return response.status(HttpStatusCode.InternalServerError).json({
        Status: "Error",
        StatusCode: HttpStatusCode.InternalServerError,
        Message: databaseError || "Internal server error",
        
    })
});


// Execução da aplicação
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});