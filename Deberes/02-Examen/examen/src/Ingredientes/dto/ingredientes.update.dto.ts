import {IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ComidaEntity} from "../../Comida/comida.entity";

export class IngredientesUpdateDtoUpdateDto{

    @IsEmpty()
    identificadprIngrediente?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNumber()
    @IsOptional()
    cantidad:number;

    @IsNotEmpty()
    @IsString()
    descripcion:string;

    @IsString()
    tipo:string;

    @IsBoolean()
    opcional:boolean;

    @IsBoolean()
    refrigeracion:boolean;

    @IsNotEmpty()
    comidaId:ComidaEntity;

}
