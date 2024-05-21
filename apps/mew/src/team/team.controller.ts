
import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Team } from './team.model';
import { TeamService } from './team.service';
import { FileInterceptor } from '@nestjs/platform-express';
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
    async uploadImageUrls(
        @Param('name') name: string,
        @Body('url') file: string,
        @Body('location') nameOfLocation: string
      ): Promise<Team> {
      return this.TeamService.uploadImageUrls(name, file,nameOfLocation);
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
