import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { s3 } from './team.controller';
import { ExtendedApisError, WrongFormat } from '../exeptions/404';
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
if(!file.buffer){
  console.log("no file")
throw new  WrongFormat()
}
      let uploadedData = await s3.Upload(
          {
              buffer: file.buffer,
          },
          '/images/'
      );

      if (!uploadedData) {
          console.log(" no res from yandex");
          throw new ExtendedApisError()
      }
      if (Array.isArray(uploadedData)) {
          if (uploadedData.length > 0 && uploadedData[0].Location) {
              team.imageDataUrl.push(uploadedData[0].Location);
              team.imageDataUrl = [...team.imageDataUrl, uploadedData[0].Location];
          }
      } else if (uploadedData.Location) {
          team.imageDataUrl.push(uploadedData.Location);
      }
      const formattedAnswers = answers.map(answer => `• ${answer}`).join('\n');
      team.solved.push(nameOfLocation);
      team.results.push(result);
      team.answers.push(formattedAnswers);
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
async deleteTeam(id: number): Promise<void> {
    await this.teamRepository.delete(id);
}
}
