const GuidExtensions = require("../Extensions/GuidExtensions.js");
const DiskStorageService = require("../Services/DiskStorageService.js");
const ImagemRepository = require("../Repositories/ImagemRepository.js");
const ImagemValidator = require("../Validators/ImagemValidator.js");

class ImagemService {
    async AdicionarImagemAsync(fileName, discriminator) {
        let _guidExtensions = new GuidExtensions();
        let _diskStorageService = new DiskStorageService();
        let _imagemRepository = new ImagemRepository();
        let _imagemValidator = new ImagemValidator();

        let nomeDoArquivo = await _diskStorageService.SalvarImagemAsync(fileName);
        let imagemDto = {
            Id: _guidExtensions.NewGuid(),
            Discriminator: discriminator,
            NomeDoArquivo: nomeDoArquivo
        };

        await _imagemValidator.AdicionarImagemValidateRequestAsync(imagemDto);
        await _imagemRepository.AdicionarImagemAsync(imagemDto);
        return imagemDto.Id;
    }
}

module.exports = ImagemService;
