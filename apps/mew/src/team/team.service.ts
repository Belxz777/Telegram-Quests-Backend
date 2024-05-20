import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from './team.model';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel(Team) private readonly teamModel: typeof Team,
    ) {}
    async uploadImageUrls(id: number, file: string,nameOfLocation:string): Promise<Team> {
      const team = await this.teamModel.findByPk(id);

      if (!team) {
          throw new Error(`Team with id ${id} not found.`);
      }
   if(!file){
throw new Error(``)
   }
   console.log(file)
   if (!team.imageDataUrl || !team.solved) {
          team.imageDataUrl = []; 
          team.solved = []
      // Initialize the imageDataUrl array if it's not already initialized
      }
      team.imageDataUrl.push(file);
      team.solved.push(nameOfLocation)
      // team.imageDataUrl.join(file)
       team.save();  
       this.teamModel.update({imageDataUrl:team.imageDataUrl,solved:team.solved},{where:{id}})
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
