import { IsNotEmpty } from "class-validator";

export class CreateRolDto {
    @IsNotEmpty({message:"el nombre no puede estar vacio"})
    name: string
}
