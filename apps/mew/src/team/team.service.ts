import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { s3 } from './team.controller';

@Injectable()
export class TeamService {
  constructor(
      @InjectRepository(Team)
      private readonly teamRepository: Repository<Team>,
  ) {}

  async uploadImageUrls(name: string, file: Express.Multer.File, nameOfLocation: string, result: string): Promise<Team> {
      const team = await this.teamRepository.findOne({ where: { name } });
      if (!team) {
          throw new Error(`Team with name ${name} not found.`);
      }

      if (!team.imageDataUrl || !team.solved || !team.results) {
          team.imageDataUrl = [];
          team.solved = [];
          team.results = [];
      }

      if (!result) {
          console.log("no results");
      }

      if (team.solved.includes(nameOfLocation)) {
          console.log("solved");
      }

      let ip = await s3.Upload(
          {
              buffer: file.buffer,
          },
          '/images/'
      );

      if (!ip) {
          console.log("ip");
          return;
      }

      if (Array.isArray(ip)) {
          if (ip.length > 0 && ip[0].Location) {
              team.imageDataUrl.push(ip[0].Location);
              team.imageDataUrl = [...team.imageDataUrl, ip[0].Location];
          }
      } else if (ip.Location) {
          team.imageDataUrl.push(ip.Location);
      }

      team.solved.push(nameOfLocation);
      team.results.push(result);
      console.log(`добавлено ${team}`);

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

  async deleteTeam(id: number): Promise<void> {
      await this.teamRepository.delete(id);
  }

  async getAllTeams(): Promise<Team[]> {
      return this.teamRepository.find();
  }

  async getTeamById(id: number): Promise<Team> {
      return this.teamRepository.findOne({ where: { id } });
  }
}
