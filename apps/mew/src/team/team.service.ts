import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { s3 } from './team.controller';
import { response } from 'express';
import {  NotCreated, NotFoundException } from '../exeptions/404';
import { formatArrToString } from '../utils/transfer';

@Injectable()
export class TeamService {
  constructor(
      @InjectRepository(Team)
      private readonly teamRepository: Repository<Team>,
  ) {}
// FIXME : исправить то что answers так странно добавляются изменить на лучший формат , а также добавить дату 

  async uploadImageUrls(name: string, file: Express.Multer.File, nameOfLocation: string, result: string, answers: string): Promise<Team> {
      const team = await this.teamRepository.findOne({ where: { name } });
      if (!team) {
          throw new Error(`Team with name ${name} not found.`);
      }

      if (!team.imageDataUrl || !team.solved || !team.results || !team.answers) {
          team.imageDataUrl = [];
          team.solved = [];
          team.results = [];
          team.answers = [];
      }
      if (team.solved.includes(nameOfLocation)) {
          return
      }

      let isUploaded = await s3.Upload(
          {
              buffer: file.buffer,
          },
          '/images/'
      );

      if (!isUploaded) {
          console.log("UPLOAD YANDEX  ERROR");
          return team;
      }

      if (Array.isArray(isUploaded)) {
          if (isUploaded.length > 0 && isUploaded[0].Location) {
              team.imageDataUrl.push(isUploaded[0].Location);
              team.imageDataUrl = [...team.imageDataUrl, isUploaded[0].Location];
          }
      } else if (isUploaded.Location) {
          team.imageDataUrl.push(isUploaded.Location);
      }
      team.solved.push(nameOfLocation);
      team.results.push(result);
      // Форматирование массива answers в красивую строку
  // const formattedAnswers = answers.map(answer => `• ${answer}`).join('\n');
  // team.answers.push(formattedAnswers);//[ 'книга', '1952', 'быстрота', 'водитеоь' ] книга,1952,быстрота,водитеоь
team.answers.push(formatArrToString(answers.split(',')))
      await this.teamRepository.save(team);
      console.log(team.answers,isUploaded,team)
      return team;
  }

async createTeam(name: string): Promise<Team | { teamAlreadyExists: boolean }> {
  const existingTeam = await this.teamRepository.findOne({ where: { name } });
  if (existingTeam) {
    throw new  NotCreated()
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
async deleteTeam(id: number): Promise<void> {
    await this.teamRepository.delete(id);
}
async getTeamByName(name: string): Promise<Team | null> {
    let team = await this.teamRepository.findOne({ where: { name } });
    if (!team) {
      throw new NotFoundException();
    }
    const uniqueSolved = [...new Set(team.solved)];
    const filteredTeam: Team = {
      ...team,
      solved: uniqueSolved,
      results: uniqueSolved.map(location => {
        const lastIndex = team.solved.lastIndexOf(location);
        return team.results[lastIndex] || '[]';
      }),
      imageDataUrl: uniqueSolved.map(location => {
        const lastIndex = team.solved.lastIndexOf(location);
        return team.imageDataUrl[lastIndex] || '[]';
      }),
      answers: uniqueSolved.map(location => {
        const lastIndex = team.solved.lastIndexOf(location);
        return team.answers[lastIndex] || '';
      })
    };
    await this.teamRepository.save(filteredTeam);
    return filteredTeam;
  }}
