const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");
const ImagemConstants = require("../Constants/Discriminators/ImagemConstants.js");

class ImagemValidator {
    async AdicionarImagemValidateRequestAsync(imagemDto) {
        await this.ApplyRulesToIdAsync(imagemDto);
        await this.ApplyRulesToDiscriminatorAsync(imagemDto);
        await this.ApplyRulesToNomeDoArquivoAsync(imagemDto);
    }

    async DeletarImagemValidateRequestAsync(imagemDto) {
        await this.ApplyRulesToIdAsync(imagemDto);
        await this.ApplyRulesToNomeDoArquivoAsync(imagemDto);
    }

    async ApplyRulesToDiscriminatorAsync(imagemDto) {
        if (imagemDto.Discriminator === null || imagemDto.Discriminator?.trim() === "" || imagemDto.Discriminator === undefined) {
            throw new ApiException("O discriminator da imagem é obrigatório.", HttpStatusCode.BadRequest);
        }

        if (!Object.values(ImagemConstants).includes(imagemDto.Discriminator)) {
            throw new ApiException("O discriminator da imagem não é reconhecido pelo sistema.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToNomeDoArquivoAsync(imagemDto) {
        if (imagemDto.NomeDoArquivo === null || imagemDto.NomeDoArquivo?.trim() === "" || imagemDto.NomeDoArquivo === undefined) {
            throw new ApiException("O nome da imagem é obrigatório.", HttpStatusCode.BadRequest);
        }
       
        return true;
    }

    async ApplyRulesToIdAsync(imagemDto) {
        if (imagemDto.Id === null || imagemDto.NomeDoArquivo === undefined) {
            throw new ApiException("O Id da imagem é obrigatório.", HttpStatusCode.BadRequest);
        }

        if (imagemDto.Id.length != 36) {
            throw new ApiException("O Id da imagem não está em um formato válido.", HttpStatusCode.BadRequest);
        }
       
        return true;
    }
}

module.exports = ImagemValidator;