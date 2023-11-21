const { compare } = require("bcryptjs");
const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");
const UsuarioRepository = require("../Repositories/UsuarioRepository.js");

class UsuarioValidator {
    async AdicionarUsuarioValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToNomeAsync(usuarioRequestDto);
        await this.ApplyRulesToEmailAsync(usuarioRequestDto);
        await this.ApplyRulesToSenhaAsync(usuarioRequestDto);
        await this.ExistsByEmailParaOutroUsuarioAsync(usuarioRequestDto);
    }

    async AlterarImagemDoUsuarioValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToIdAsync(usuarioRequestDto);
        await this.ApplyRulesToImagemIdAsync(usuarioRequestDto);
        await this.ExistsByIdAsync(usuarioRequestDto);
    }

    async AlterarUsuarioValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToIdAsync(usuarioRequestDto);
        await this.ApplyRulesToNomeAsync(usuarioRequestDto);
        await this.ApplyRulesToEmailAsync(usuarioRequestDto);
        await this.ExistsByIdAsync(usuarioRequestDto);
        await this.ExistsByEmailParaOutroUsuarioAsync(usuarioRequestDto);
    }

    async AlterarSenhaDoUsuarioValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToAlteracaoDeSenhaAsync(usuarioRequestDto);
    }

    async CompararNovaSenhaESenhaAnteriorValidateRequestAsync(usuarioRequestDto, usuarioContext) {
        await this.ApplyRulesToComparacaoDeSenhasAsync(usuarioRequestDto, usuarioContext);
    }

    async GetUsuarioByEmailValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToEmailAsync(usuarioRequestDto);
        await this.ExistsByEmailAsync(usuarioRequestDto);
    }

    async GetUsuarioByIdValidateRequestAsync(usuarioRequestDto) {
        await this.ApplyRulesToUsuarioRequestDto(usuarioRequestDto);
        await this.ApplyRulesToIdAsync(usuarioRequestDto);
        await this.ExistsByIdAsync(usuarioRequestDto);
    }


    // Apply Rules
    async ApplyRulesToAlteracaoDeSenhaAsync(usuarioRequestDto) {
        if ((usuarioRequestDto.Senha !== null && usuarioRequestDto.Senha?.trim() !== "" && usuarioRequestDto.Senha !== undefined)
            && (usuarioRequestDto.SenhaAnterior === null || usuarioRequestDto.SenhaAnterior?.trim() === "" || usuarioRequestDto.SenhaAnterior === undefined))
        {
            throw new ApiException('Para alterar a senha, é necessário informar a sua senha anterior.', HttpStatusCode.BadRequest);
        }

        if ((usuarioRequestDto.Senha === null || usuarioRequestDto.Senha?.trim() === "" || usuarioRequestDto.Senha === undefined)
            && (usuarioRequestDto.SenhaAnterior !== null && usuarioRequestDto.SenhaAnterior?.trim() !== "" && usuarioRequestDto.SenhaAnterior !== undefined))
        {
            throw new ApiException('Para alterar a senha, é necessário informar a sua nova senha.', HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToComparacaoDeSenhasAsync(usuarioRequestDto, usuarioContext) {
        let passwordMatched = await compare(usuarioRequestDto.SenhaAnterior, usuarioContext.Senha);
        if (!passwordMatched) {
            throw new ApiException('Para alterar a senha, é necessário que a senha anterior seja igual a sua senha atual.', HttpStatusCode.BadRequest);
        }

        return true;
    }
    
    async ApplyRulesToEmailAsync(usuarioRequestDto) {
        if (usuarioRequestDto.Email === null || usuarioRequestDto.Email?.trim() === "" || usuarioRequestDto.Email === undefined) {
            throw new ApiException("O Email do usuário é obrigatório.", HttpStatusCode.BadRequest);
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var regexMatched = usuarioRequestDto.Email.match(validRegex);
        if (regexMatched == null){
            throw new ApiException("O Email não está em um formato válido.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToIdAsync(usuarioRequestDto) {
        if (usuarioRequestDto.Id === null || usuarioRequestDto.Id?.trim() === "" || usuarioRequestDto.Id === undefined) {
            throw new ApiException("O Id do usuário é obrigatório.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToImagemIdAsync(usuarioRequestDto) {
        if (usuarioRequestDto.ImagemId === null || usuarioRequestDto.ImagemId?.trim() === "" || usuarioRequestDto.ImagemId === undefined) {
            throw new ApiException("Não foi possível validar a imagem do usuário.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToNomeAsync(usuarioRequestDto) {
        if (usuarioRequestDto.Nome === null || usuarioRequestDto.Nome?.trim() === "" || usuarioRequestDto.Nome === undefined) {
            throw new ApiException("O Nome do usuário é obrigatório.", HttpStatusCode.BadRequest);
        }

        return true;
    }    

    async ApplyRulesToSenhaAsync(usuarioRequestDto) {
        if (usuarioRequestDto.Senha === null || usuarioRequestDto.Senha?.trim() === "" || usuarioRequestDto.Senha === undefined) {
            throw new ApiException("A Senha do usuário é obrigatório.", HttpStatusCode.BadRequest);
        }

        if (usuarioRequestDto.Senha.length < 6) {
            throw new ApiException("A Senha do usuário deve conter no mínimo 6 caracteres.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToUsuarioRequestDto(usuarioRequestDto) {
        if (usuarioRequestDto === null || usuarioRequestDto === undefined) {
            throw new ApiException("O Dto de requisição do usuário não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ExistsByEmailAsync(usuarioRequestDto) {
        let _usuarioRepository = new UsuarioRepository();
        let usuario = await _usuarioRepository.GetUsuarioByEmailAsync(usuarioRequestDto.Email);

        if (!usuario || usuario === null || usuario === undefined) {
            throw new ApiException("Não foi possível encontrar o usuário informado.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ExistsByIdAsync(usuarioRequestDto) {
        let _usuarioRepository = new UsuarioRepository();
        let usuario = await _usuarioRepository.GetUsuarioByIdAsync(usuarioRequestDto.Id);

        if (!usuario || usuario === null || usuario === undefined) {
            throw new ApiException("Não foi possível encontrar o usuário informado.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ExistsByEmailParaOutroUsuarioAsync(usuarioRequestDto) {
        let _usuarioRepository = new UsuarioRepository();
        let usuario = await _usuarioRepository.GetUsuarioByEmailAsync(usuarioRequestDto.Email);

        if (!usuario || usuario === null || usuario === undefined) { return false; }

        if (usuarioRequestDto.Id !== usuario.Id){
            throw new ApiException("O Email informado já está sendo utilizado por outro usuário.", HttpStatusCode.BadRequest);
        }

        return false;
    }
}

module.exports = UsuarioValidator;