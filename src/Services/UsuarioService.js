const { hash, compare } = require("bcryptjs");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");
const GuidExtensions = require("../Extensions/GuidExtensions.js");
const UsuarioRepository = require("../Repositories/UsuarioRepository.js");
const PerfilDeUsuarioService = require("../Services/PerfilDeUsuarioService.js");
const UsuarioValidator = require("../Validators/UsuarioValidator.js");
const PerfilDeUsuarioConstants = require("../Constants/Discriminators/PerfilDeUsuarioConstants.js");

class UsuarioService {

    async AdicionarUsuarioAsync(usuarioRequestDto) {
        let _perfilDeUsuarioService = new PerfilDeUsuarioService();
        let _usuarioRepository = new UsuarioRepository();
        let _usuarioValidator = new UsuarioValidator();     
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        
        await _usuarioValidator.AdicionarUsuarioValidateRequestAsync(usuarioRequestDto);

        let perfilDeUsuarioClienteId = await _perfilDeUsuarioService.GetPerfilDeUsuarioByDiscriminatorAsync(PerfilDeUsuarioConstants.Cliente).then(x => x.Id);
        let usuarioDto = {
            Id: _guidExtensions.NewGuid(),
            Nome: usuarioRequestDto.Nome,
            Email: usuarioRequestDto.Email,
            Senha: await this.GeneratePasswordHash(usuarioRequestDto.Senha),
            PerfilDeUsuarioId: perfilDeUsuarioClienteId,
            DataDeCriacao: _dateTimeExtensions.DateTimeNow()
        };

        return await _usuarioRepository.AdicionarUsuarioAsync(usuarioDto);
    }

    async AlterarImagemDoUsuarioAsync(usuarioRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _usuarioRepository = new UsuarioRepository();
        let _usuarioValidator = new UsuarioValidator(); 
        
        await _usuarioValidator.AlterarImagemDoUsuarioValidateRequestAsync(usuarioRequestDto);

        let usuarioDto = {
            Id: usuarioRequestDto.Id,
            ImagemId: usuarioRequestDto.ImagemId,
            DataDeAlteracao: _dateTimeExtensions.DateTimeNow()
        };

        return await _usuarioRepository.AlterarImagemDoUsuarioAsync(usuarioDto);
    }

    async AlterarUsuarioAsync(usuarioRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _usuarioRepository = new UsuarioRepository();
        let _usuarioValidator = new UsuarioValidator();

        await _usuarioValidator.AlterarUsuarioValidateRequestAsync(usuarioRequestDto);
        
        let usuarioContext = await _usuarioRepository.GetUsuarioByIdAsync(usuarioRequestDto.Id);
        
        let alterouSenha = await this.VerificarSeOUsuarioRealizouAlteracaoDeSenhaAsync(usuarioRequestDto);
        if (alterouSenha) {
            await _usuarioValidator.AlterarSenhaDoUsuarioValidateRequestAsync(usuarioRequestDto);
            await _usuarioValidator.CompararNovaSenhaESenhaAnteriorValidateRequestAsync(usuarioRequestDto, usuarioContext);
        }

        let senhaCripto = alterouSenha
                ? await this.GeneratePasswordHash(usuarioRequestDto.Senha)
                : usuarioContext.Senha;
        
        let usuarioDto = {
            Id: usuarioContext.Id,
            Nome: usuarioRequestDto.Nome,
            Email: usuarioRequestDto.Email,
            Senha: senhaCripto,
            DataDeAlteracao: _dateTimeExtensions.DateTimeNow(),
            Excluido: false,
            DataDeExclusao: null
        };

        return await _usuarioRepository.AlterarUsuarioAsync(usuarioDto);
    }

    async GeneratePasswordHash(password){
        let salt = 8;
        return await hash(password, salt);
    }

    async GetUsuarioByEmailAsync(usuarioRequestDto) {
        let _usuarioRepository = new UsuarioRepository();
        let _usuarioValidator = new UsuarioValidator(); 

        await _usuarioValidator.GetUsuarioByEmailValidateRequestAsync(usuarioRequestDto);
        let usuarioContext = await _usuarioRepository.GetUsuarioByEmailAsync(usuarioRequestDto.Email);

        return usuarioContext;
    }

    async VerificarSeOUsuarioRealizouAlteracaoDeSenhaAsync(usuarioRequestDto) {
        if ((usuarioRequestDto.Senha !== null && usuarioRequestDto.Senha?.trim() !== "" && usuarioRequestDto.Senha !== undefined)
            || (usuarioRequestDto.SenhaAnterior !== null && usuarioRequestDto.SenhaAnterior?.trim() !== "" && usuarioRequestDto.SenhaAnterior !== undefined))
        {
            return true;
        }
        return false;
    }
}

module.exports = UsuarioService;