
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { FileInterceptor } from '@nestjs/platform-express';
import EasyYandexS3 from 'easy-yandex-s3';
import { Deleted } from './team.interface';
export const  s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY || "YCAJEmmhVKiQFxqCY0IXE02lH",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "YCMo3gC5oNmnCCC4Aby6G624qNdGD_9EPCYYiKgb",
  },
  Bucket: 'questsimages', // Название бакета
  debug: true, // Дебаг в консоли
});
@Controller('team')  
export class TeamController {
    constructor(private readonly TeamService: TeamService) {}
    @Post()
    async createTeam(
      @Body('name') name: string,
    ): Promise<Team> {
      return this.TeamService.createTeam(name);
    }
  @Post('/uploadPhotoUrls/:name')
  @UseInterceptors(FileInterceptor('file'))
   uploadImageUrls(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('location') nameOfLocation: string,
    @Body('result') result: string ,
    @Body ('answers') answers:string[]
  ): Promise<any> {
  console.log(name, file, nameOfLocation, result)
      return this.TeamService.uploadImageUrls(name, file, nameOfLocation, result,answers);
  }
  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.TeamService.getAllTeams();
  }
    @Get(':id')
    async getTeamById(@Param('id') id: number): Promise<Team> {
      return this.TeamService.getTeamById(id);
    }
    @Get('getByName/:name')
    async getTeamByName(@Param('name') name:string): Promise<Team> {
      return this.TeamService.getTeamByName(name);
    }
    @Delete(':id')  
    async deleteTeam(@Param('id') id: number): Promise<Deleted> {
      return this.TeamService.deleteTeam(id);
    }
}
