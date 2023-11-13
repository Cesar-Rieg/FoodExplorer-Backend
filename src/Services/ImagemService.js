const GuidExtensions = require("../Extensions/GuidExtensions.js");
const DiskStorageService = require("../Services/DiskStorageService.js");
const ImagemRepository = require("../Repositories/ImagemRepository.js");
const ImagemValidator = require("../Validators/ImagemValidator.js");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");

class ImagemService {
    // Parâmetro imagemParaAdicionarRequestoDto contendo "Discriminator", "NomeDoArquivo", "UsuarioDeCadastroId"
    async AdicionarImagemAsync(imagemParaAdicionarRequestoDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        let _diskStorageService = new DiskStorageService();
        let _imagemRepository = new ImagemRepository();
        let _imagemValidator = new ImagemValidator();

        let nomeDoArquivoDaImagemAdicionada = await _diskStorageService.SalvarImagemAsync(imagemParaAdicionarRequestoDto.NomeDoArquivo);
        let imagemDto = {
            Id: _guidExtensions.NewGuid(),
            Discriminator: imagemParaAdicionarRequestoDto.Discriminator,
            NomeDoArquivo: nomeDoArquivoDaImagemAdicionada,
            DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeCadastroId: imagemParaAdicionarRequestoDto.UsuarioDeCadastroId
        };

        await _imagemValidator.AdicionarImagemValidateRequestAsync(imagemDto);
        await _imagemRepository.AdicionarImagemAsync(imagemDto);
        return imagemDto.Id;
    }

    // Parâmetro imagemParaDeletarRequestoDto contendo "Id", "NomeDoArquivo" e "UsuarioDeAlteracaoId"
    async DeletarImagemAsync(imagemParaDeletarRequestoDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _diskStorageService = new DiskStorageService();
        let _imagemRepository = new ImagemRepository();
        let _imagemValidator = new ImagemValidator();

        let imagemDto = {
            Id: imagemParaDeletarRequestoDto.Id,
            NomeDoArquivo: imagemParaDeletarRequestoDto.NomeDoArquivo,
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeExclusaoId: imagemParaDeletarRequestoDto.UsuarioDeAlteracaoId
        }
        await _imagemValidator.DeletarImagemValidateRequestAsync(imagemDto);
        
        await _diskStorageService.DeletarImagemAsync(imagemDto.NomeDoArquivo);
        await _imagemRepository.DeletarImagemAsync(imagemDto);
    }
}

module.exports = ImagemService;
