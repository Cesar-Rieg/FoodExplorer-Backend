class DatabaseErrorTranslateService {
    GetDatabaseError(error) {
        if (!error) return;

        let sqlErrorCode = error.errno;
        let translatedError = this.Translate(sqlErrorCode);

        if (!translatedError) return;
        
        return `Ocorreu um erro no Banco de Dados.\r\nCódigo de erro: ${sqlErrorCode}\r\nMensagem: ${translatedError}`;
    }
    Translate(sqlErrorCode){
        let retorno;
        switch(sqlErrorCode){
            case 1: 
                retorno = 'Generic error';
                break;
            case 2: 
                retorno = 'Internal logic error in SQLite';
                break;  
            case 3: 
                retorno = 'Access permission denied';
                break;           
            case 4: 
                retorno = 'Callback routine requested an abort';
                break;
            case 5: 
                retorno = 'The database file is locked'; 
                break;        
            case 6: 
                retorno = 'A table in the database is locked';
                break
            case 7: 
                retorno = 'A malloc() failed';
                break;
            case 8: 
                retorno = 'Attempt to write a readonly database';
                break;
            case 9: 
                retorno = 'Operation terminated by sqlite3_interrupt()';
                break;
            case 10: 
                retorno = 'Some kind of disk I/O error occurred';
                break;
            case 11: 
                retorno = 'The database disk image is malformed';
                break;
            case 12: 
                retorno = 'Unknown opcode in sqlite3_file_control()';
                break;
            case 13: 
                retorno = 'Insertion failed because database is full';
                break;    
            case 14: 
                retorno = 'Unable to open the database file';
                break;    
            case 15: 
                retorno = 'Database lock protocol error';
                break;    
            case 16: 
                retorno = 'Internal use only';
                break;    
            case 17: 
                retorno = 'The database schema changed';
                break;    
            case 18: 
                retorno = 'String or BLOB exceeds size limit';
                break;    
            case 19: 
                retorno = 'Abort due to constraint violation';
                break;    
            case 20: 
                retorno = 'Data type mismatch';
                break;    
            case 21: 
                retorno = 'Library used incorrectly';
                break;    
            case 22: 
                retorno = 'Uses OS features not supported on host';
                break;    
            case 23: 
                retorno = 'Authorization denied';
                break;    
            case 24: 
                retorno = 'Not used';
                break;    
            case 25: 
                retorno = '2nd parameter to sqlite3_bind out of range';
                break;    
            case 26: 
                retorno = 'File opened that is not a database file';
                break;    
            case 27: 
                retorno = 'Notifications from sqlite3_log()';
                break;    
            case 28: 
                retorno = 'Warnings from sqlite3_log()';
                break;
            case 100:
                retorno = 'sqlite3_step() has another row ready';
                break;
            case 101:
                retorno = 'sqlite3_step() has finished executing';
                break;
            default: 
                retorno = null;
                break;
            }
            
        return retorno;
    }
}

module.exports = DatabaseErrorTranslateService;