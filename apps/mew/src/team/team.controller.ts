
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Team } from './team.model';
import { TeamService } from './team.service';
import { FileInterceptor } from '@nestjs/platform-express';
import EasyYandexS3 from 'easy-yandex-s3';
export const  s3 = new EasyYandexS3({
  auth: {
    accessKeyId: 'YCAJEmmhVKiQFxqCY0IXE02lH',
    secretAccessKey: 'YCMo3gC5oNmnCCC4Aby6G624qNdGD_9EPCYYiKgb',
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
  // @Post('/uploadPhotos/:id')
  // @UseInterceptors(FileInterceptor('photo'))
  // async uploadImages(
  //     @Param('id') id: number,
  //     @UploadedFile() file
  //   ): Promise<void> {
  //     return this.TeamService.uploadImages(id, file);
  //   }
  @Post('/uploadPhotoUrls/:name')
  @UseInterceptors(FileInterceptor('file'))
   uploadImageUrls(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('location') nameOfLocation: string,
    @Body('result') result: string
  ): Promise<any> {
  console.log(name, file, nameOfLocation, result)
      return this.TeamService.uploadImageUrls(name, file, nameOfLocation, result);

  }
      @Post('/upload')
      @UseInterceptors(FileInterceptor('file'))
      uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     let ip = this.s3.Upload(
    //       {
    //         buffer: file.buffer,
    //       },
    //       '/images/'
    //     );
    // ip.then((response) => {
    //   if (Array.isArray(response)) {
    //     response.forEach(data => {
    //       if (data && typeof data === 'object' && 'Location' in data) {
    //         console.log(data.Location);
    //       }
    //     });
    //   } else if (response && typeof response === 'object' && 'Location' in response) {
    //     console.log(response.Location);
    //   }
    // })
      }
    @Delete(':id')  
    async deleteTeam(@Param('id') id: number): Promise<void> {
      return this.TeamService.deleteTeam(id);
    }
  
    @Get()
    async getAllTeams(): Promise<Team[]> {
      return this.TeamService.getAllTeams();
    }
  
    @Get(':id')
    async getTeamById(@Param('id') id: number): Promise<Team> {
      return this.TeamService.getTeamById(id);
    }
}
