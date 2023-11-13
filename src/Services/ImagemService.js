const GuidExtensions = require("../Extensions/GuidExtensions.js");
const DiskStorageService = require("../Services/DiskStorageService.js");
const ImagemRepository = require("../Repositories/ImagemRepository.js");
const ImagemValidator = require("../Validators/ImagemValidator.js");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");

class ImagemService {
    async AdicionarImagemAsync(imagemRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        let _diskStorageService = new DiskStorageService();
        let _imagemRepository = new ImagemRepository();
        let _imagemValidator = new ImagemValidator();

        let nomeDoArquivoDaImagemAdicionada = await _diskStorageService.SalvarImagemAsync(imagemRequestDto.NomeDoArquivo);
        let imagemDto = {
            Id: _guidExtensions.NewGuid(),
            Discriminator: imagemRequestDto.Discriminator,
            NomeDoArquivo: nomeDoArquivoDaImagemAdicionada,
            DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeCadastroId: imagemRequestDto.UsuarioDeCadastroId
        };

        await _imagemValidator.AdicionarImagemValidateRequestAsync(imagemDto);
        await _imagemRepository.AdicionarImagemAsync(imagemDto);
        return imagemDto.Id;
    }

    async DeletarImagemAsync(imagemRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _diskStorageService = new DiskStorageService();
        let _imagemRepository = new ImagemRepository();
        let _imagemValidator = new ImagemValidator();

        let imagemDto = {
            Id: imagemRequestDto.Id,
            NomeDoArquivo: imagemRequestDto.NomeDoArquivo,
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeExclusaoId: imagemRequestDto.UsuarioDeAlteracaoId
        }
        await _imagemValidator.DeletarImagemValidateRequestAsync(imagemDto);
        
        await _diskStorageService.DeletarImagemAsync(imagemDto.NomeDoArquivo);
        await _imagemRepository.DeletarImagemAsync(imagemDto);
    }
}

module.exports = ImagemService;
