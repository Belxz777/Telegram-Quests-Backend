import { ApiProperty } from "@nestjs/swagger"
export class CreateUserDto {
    @ApiProperty({example:1,description:'код зека'})
    readonly code : number
    @ApiProperty({example:'Krutoi ',description:'кликуха'})
    readonly clichka: string
    @ApiProperty({example:1,description:'возраст'})
readonly age : number
}
export class UpdateUserDto {
    @ApiProperty({example:'Krutoi ',description:'кликуха'})
    readonly clichka: string
    @ApiProperty({example:1,description:'возраст'})
readonly age : number
}