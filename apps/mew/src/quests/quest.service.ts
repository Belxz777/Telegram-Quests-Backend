import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Quest } from './quests.entity';
import { Team } from '../team/team.entity';
import { CreateQuestDto, UpdateQuestDto } from './dto/create-quest';
import { Deleted } from '../team/team.interface';

interface QuestsProposed {
    lat: number;
    lon: number;
    name: string;
    id: number;
}

@Injectable()
export class QuestService {
    constructor(
        @InjectRepository(Quest)
        private questRepository: Repository<Quest>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>
    ) {}
    async createNewQuest(dto: CreateQuestDto): Promise<Quest> {
        const quest: Quest = this.questRepository.create(dto);
        return this.questRepository.save(quest);
    }
    async getAllQuests(): Promise<Quest[] | Quest> {
        return this.questRepository.find();
    }
    async deleteQuest(id: number): Promise< Deleted> {
       const isOkay =  await this.questRepository.delete(id);
       if(!isOkay){
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
    async updateQuest(dto: UpdateQuestDto, id: number): Promise<Quest> {
        const quest = await this.questRepository.findOne({ where: { id } });
        if (!quest) {
            throw new Error('Quest not found');
        }
        Object.assign(quest, dto);
        return this.questRepository.save(quest);
    }
    async getAllQuestsbyAddress(lat:  number, lon: number): Promise<Quest[]> {
        const quest = await this.questRepository.find({ where: { lat, lon } });
        return quest
    }
    async getAllTeamQuests(team: string): Promise<QuestsProposed[]> {
        const thisTeam = await this.teamRepository.findOne({ where: { name: team } });
        if (!thisTeam) {
            throw new Error('Team not found');
        }
            const quests = await this.questRepository.find();
            const final = [...new Set(quests.map(quest => quest.quizIn))];
            const uniqueValues = final.filter(value => !thisTeam.solved.includes(value));
        
            let questsToReturn;
            if (uniqueValues.length === 1) {
                const lastQuizId = 2;
                const allQuestsCompleted = final.every(quizId => quizId === lastQuizId.toString() || thisTeam.solved.includes(quizId));
            
                if (allQuestsCompleted) {
                    questsToReturn = await this.questRepository.find({
                        where: { quizId: lastQuizId },
                    });
                } else {
                    questsToReturn = [];
                }
            } else {
                questsToReturn = await this.questRepository.find({
                    where: { quizIn: In(uniqueValues) },
                });
            }
        const locations: QuestsProposed[] = [];
        questsToReturn.forEach(item => {
            if (!locations.some(location => location.name === item.quizIn)) {
                locations.push({
                    lat: Number(item.lat),
                    lon: Number(item.lon),
                    name: item.quizIn,
                    id: Number(item.quizId)
                });
            }
        });
        return locations;
    }    async getAllQuestsbyQuizIn(quizIn: string): Promise<Quest[]> {
        return this.questRepository.find({ where: { quizIn } });
    }
    async getAllQuestsbyQuizId(quizId: number): Promise<{
        lat: number;
        lon: number;
        quizId: number;
        quizIn: string;
    }> {
        const quest = await this.questRepository.findOne({ where: { quizId } });
        if (!quest) {
            throw new Error('Quest not found');
        }
        return {
            lat: Number(quest.lat),
            lon: Number(quest.lon),
            quizId: quest.quizId,
            quizIn: quest.quizIn
        };
    }}
