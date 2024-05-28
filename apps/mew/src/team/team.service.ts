import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from './team.model';
import { Url } from 'url';
import { s3 } from './team.controller';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel(Team) private readonly teamModel: typeof Team,
    ) {}
    async uploadImageUrls(name: string, file:Express.Multer.File,nameOfLocation:string,result:string): Promise<Team> {
      const team = await this.teamModel.findOne({where: { name: name}});
      if (!team) {
          throw new Error(`Team with id ${name} not found.`);
      }
    
   if (!team.imageDataUrl || !team.solved ||!team.results) {
          team.imageDataUrl = []; 
          team.solved = [];
          team.results = []
      // Initialize the imageDataUrl array if it's not already initialized
      }     if(!result){
console.log("no results")
      }
      if(team.solved.includes(nameOfLocation)){
console.log("solved")
      }
      let  ip = await s3.Upload(
        {
          buffer: file.buffer,
        },
        '/images/'
      );
    
      if (!ip) {
        console.log("ip")
        return
      }
    
      if (Array.isArray(ip)) {
        if (ip.length > 0 && ip[0].Location) {
          team.imageDataUrl.push(ip[0].Location)
          team.imageDataUrl.join(ip[0].Location)
        }
      } else if (ip.Location) {
        team.imageDataUrl.push(ip.Location)
      }
      team.solved.push(nameOfLocation)
      team.results.push(result)
      console.log(`добавлено ${team}`)
       team.save();  
      await this.teamModel.update({solved:team.solved,results:team.results,imageDataUrl:team.imageDataUrl},{where:{
        name:name
      }})
      return team;
  }
  
    async createTeam(name:string): Promise<Team> {
    const existingTeam = await this.teamModel.findOne({ where: { name } });
    if (existingTeam) {
      throw 'Team with this name already exists'
    }

        return this.teamModel.create({
            name:name
        });
      }
    
      async deleteTeam(id: number): Promise<void> {
        await this.teamModel.destroy({ where: { id } });
      }
    
      async getAllTeams(): Promise<Team[]> {
        return this.teamModel.findAll();
      }
    
      async getTeamById(id: number): Promise<Team> {
        return this.teamModel.findByPk(id);
      }
    
}
