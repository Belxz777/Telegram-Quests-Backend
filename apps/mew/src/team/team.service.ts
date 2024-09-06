import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { s3 } from './team.controller';
import { Deleted } from './team.interface';

@Injectable()
export class TeamService {
  constructor(
      @InjectRepository(Team)
      private readonly teamRepository: Repository<Team>,
  ) {}
  async uploadImageUrls(name: string, file: Express.Multer.File, nameOfLocation: string, result: string,answers:string[]): Promise<Team> {
      const team = await this.teamRepository.findOne({ where: { name } });
      if (!team) {
          throw new Error(`Team with name ${name} not found.`);
      }
      if (!team.imageDataUrl || !team.solved || !team.results) {
          team.imageDataUrl = [];
          team.solved = [];
          team.results = [];
      }
      if (team.solved.includes(nameOfLocation)) {
          return
      }

      let uploadedData = await s3.Upload(
          {
              buffer: file.buffer,
          },
          '/images/'
      );

      if (!uploadedData) {
          console.log(" no res from yandex");
          return;
      }
      if (Array.isArray(uploadedData)) {
          if (uploadedData.length > 0 && uploadedData[0].Location) {
              team.imageDataUrl.push(uploadedData[0].Location);
              team.imageDataUrl = [...team.imageDataUrl, uploadedData[0].Location];
          }
      } else if (uploadedData.Location) {
          team.imageDataUrl.push(uploadedData.Location);
      }
      console.log(answers)
  Array.isArray(answers) ? answers.map(answer =>     team.answers.push(answer) ) :      team.answers.push(answers);
      team.solved.push(nameOfLocation);
      team.results.push(result);
      await this.teamRepository.save(team);
      return team;
  }
  async createTeam(name: string): Promise<Team> {
      const existingTeam = await this.teamRepository.findOne({ where: { name } });
      if (existingTeam) {
          throw 'Team with this name already exists';
      }
      const newTeam = this.teamRepository.create({ name });
      return this.teamRepository.save(newTeam);
  }
  async getAllTeams(): Promise<Team[]> {
      return this.teamRepository.find();
  }
  async getTeamById(id: number): Promise<Team> {
      return this.teamRepository.findOne({ where: { id } });
  }
  async getTeamByName(name:string): Promise<Team> {
    return this.teamRepository.findOne({ where: { name } });
}
async deleteTeam(id: number): Promise< Deleted> {
    const operation = await this.teamRepository.delete(id);
if(!operation){
    return {
        isDeleted:false,
        deletedId:id
    }
}
    return {
        isDeleted:true,
        deletedId:id
    }
}
}
