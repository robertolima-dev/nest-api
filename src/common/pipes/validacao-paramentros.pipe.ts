import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'

export class ValidacaoParametrosPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado!`)
        } else {
            return value
        }
    }
}