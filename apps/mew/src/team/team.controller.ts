
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { FileInterceptor } from '@nestjs/platform-express';
import EasyYandexS3 from 'easy-yandex-s3';
export const  s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY ,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
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
    ): Promise<Team | { teamAlreadyExists: boolean }> {
      console.log(name)
      return this.TeamService.createTeam(name);
    }
  @Post('/uploadPhotoUrls/:name')
  @UseInterceptors(FileInterceptor('file'))
   uploadImageUrls(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('location') nameOfLocation: string,
    @Body('result') result: string ,
    @Body ('answers') answers:string[] ,
  ): Promise<any> {
  console.log(name, file, nameOfLocation, result)
      return this.TeamService.uploadImageUrls(name, file, nameOfLocation, result,answers);

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
    async deleteTeam(@Param('id') id: number): Promise<void> {
      return this.TeamService.deleteTeam(id);
    }
  
    @Get()
    async getAllTeams(): Promise<Team[]> {
      return this.TeamService.getAllTeams();
    }
  
}
