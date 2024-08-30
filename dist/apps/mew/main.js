/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const quests_module_1 = __webpack_require__(6);
const quests_entity_1 = __webpack_require__(9);
const team_module_1 = __webpack_require__(14);
const team_entity_1 = __webpack_require__(11);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.URL,
                entities: [quests_entity_1.Quest, team_entity_1.Team],
                autoLoadEntities: true,
                ssl: true,
                synchronize: true,
                logging: true,
            }),
            quests_module_1.QuestModule,
            team_module_1.TeamModule
        ]
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuestModule = void 0;
const common_1 = __webpack_require__(3);
const quest_service_1 = __webpack_require__(7);
;
const quests_entity_1 = __webpack_require__(9);
const quests_controller_1 = __webpack_require__(12);
const typeorm_1 = __webpack_require__(4);
const team_entity_1 = __webpack_require__(11);
let QuestModule = class QuestModule {
};
exports.QuestModule = QuestModule;
exports.QuestModule = QuestModule = __decorate([
    (0, common_1.Module)({
        controllers: [quests_controller_1.QuestsController],
        providers: [quest_service_1.QuestService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([quests_entity_1.Quest, team_entity_1.Team])
        ]
    })
], QuestModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuestService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(8);
const quests_entity_1 = __webpack_require__(9);
const team_entity_1 = __webpack_require__(11);
let QuestService = class QuestService {
    constructor(questRepository, teamRepository) {
        this.questRepository = questRepository;
        this.teamRepository = teamRepository;
    }
    async createNewQuest(dto) {
        const quest = this.questRepository.create(dto);
        return this.questRepository.save(quest);
    }
    async getAllQuests() {
        return this.questRepository.find();
    }
    async deleteQuest(id) {
        await this.questRepository.delete(id);
    }
    async updateQuest(dto, id) {
        const quest = await this.questRepository.findOne({ where: { id } });
        if (!quest) {
            throw new Error('Quest not found');
        }
        Object.assign(quest, dto);
        return this.questRepository.save(quest);
    }
    async getAllQuestsbyIP(lat, lon) {
        const quest = await this.questRepository.find({ where: { lat, lon } });
        return quest;
    }
    async getAllTeamQuests(team) {
        const thisTeam = await this.teamRepository.findOne({ where: { name: team } });
        if (!thisTeam) {
            throw new Error('Team not found');
        }
        const quests = await this.questRepository.find();
        const final = [...new Set(quests.map(quest => quest.quizIn))];
        const uniqueValues = final.filter(value => !thisTeam.solved.includes(value));
        const questsToReturn = await this.questRepository.find({
            where: { quizIn: (0, typeorm_2.In)(uniqueValues) },
        });
        const locations = [];
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
    }
    async getAllQuestsbyQuizIn(quizIn) {
        return this.questRepository.find({ where: { quizIn } });
    }
    async getAllQuestsbyQuizId(quizId) {
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
    }
};
exports.QuestService = QuestService;
exports.QuestService = QuestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quests_entity_1.Quest)),
    __param(1, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], QuestService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Quest = void 0;
const swagger_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(8);
let Quest = class Quest {
};
exports.Quest = Quest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'айди вопроса' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: '' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quest.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Боксер', description: 'правильный ответ' }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Quest.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["", ""], description: 'Массив вариантов' }),
    (0, typeorm_1.Column)('simple-array', { nullable: true, default: ',' }),
    __metadata("design:type", Array)
], Quest.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '55.00323', description: 'координаты широта' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", Number)
], Quest.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '52.332332', description: 'координаты долгота' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", Number)
], Quest.prototype, "lon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Roman', description: 'автор теста' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Quest.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Смешарики', description: 'все тесты в одном квизе' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Quest.prototype, "quizIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'айди квиза' }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Quest.prototype, "quizId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'История', description: 'Категория теста' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Quest.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '', nullable: true }),
    __metadata("design:type", String)
], Quest.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Quest.prototype, "rebus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Quest.prototype, "todo", void 0);
exports.Quest = Quest = __decorate([
    (0, typeorm_1.Entity)()
], Quest);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Team = void 0;
const swagger_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(8);
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Супер', description: 'название комнаты' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true, default: [] }),
    __metadata("design:type", Array)
], Team.prototype, "solved", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true, default: [] }),
    __metadata("design:type", Array)
], Team.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true, default: [] }),
    __metadata("design:type", Array)
], Team.prototype, "imageDataUrl", void 0);
exports.Team = Team = __decorate([
    (0, typeorm_1.Entity)('teams')
], Team);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuestsController = void 0;
const common_1 = __webpack_require__(3);
const create_quest_1 = __webpack_require__(13);
const quest_service_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(10);
const quests_entity_1 = __webpack_require__(9);
const common_2 = __webpack_require__(3);
const create_quest_2 = __webpack_require__(13);
let QuestsController = class QuestsController {
    constructor(QuestService) {
        this.QuestService = QuestService;
    }
    create(QuestDto) {
        const isTodo = QuestDto.todo;
        const isRebus = QuestDto.rebus;
        if (isRebus) {
            return this.QuestService.createNewQuest(QuestDto);
        }
        return this.QuestService.createNewQuest(QuestDto);
    }
    getAllQuests() {
        return this.QuestService.getAllQuests();
    }
    getAllQuestsbyIP(lat, lon) {
        return this.QuestService.getAllQuestsbyIP(lat, lon);
    }
    getAllQuestsbyTeam(team) {
        return this.QuestService.getAllTeamQuests(team);
    }
    getAllQuestsbyQuizIn(quizName) {
        return this.QuestService.getAllQuestsbyQuizIn(quizName);
    }
    getAllQuestsbyQuizId(quizId) {
        console.log(quizId);
        return this.QuestService.getAllQuestsbyQuizId(quizId);
    }
    deleteQuest(id) {
        return this.QuestService.deleteQuest(id);
    }
    async updateQuest(id, updateQuestData) {
        const updatedQuest = await this.QuestService.updateQuest(updateQuestData, id);
        console.log(updatedQuest, 'юсер адатне');
        return updatedQuest;
    }
};
exports.QuestsController = QuestsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Это апишка для добавления Questov' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [quests_entity_1.Quest] }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_quest_1.CreateQuestDto !== "undefined" && create_quest_1.CreateQuestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Это апишка для поиска всех Questov' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [quests_entity_1.Quest] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "getAllQuests", null);
__decorate([
    (0, common_1.Get)('byCoordinates/:lat/:lon'),
    __param(0, (0, common_2.Param)('lat')),
    __param(1, (0, common_2.Param)('lon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "getAllQuestsbyIP", null);
__decorate([
    (0, common_1.Get)('questsForTeam/:team'),
    __param(0, (0, common_2.Param)('team')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], QuestsController.prototype, "getAllQuestsbyTeam", null);
__decorate([
    (0, common_1.Get)('byName/:quizName'),
    __param(0, (0, common_2.Param)('quizName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "getAllQuestsbyQuizIn", null);
__decorate([
    (0, common_1.Get)('byId/:quizId'),
    __param(0, (0, common_2.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "getAllQuestsbyQuizId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], QuestsController.prototype, "deleteQuest", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof create_quest_2.UpdateQuestDto !== "undefined" && create_quest_2.UpdateQuestDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "updateQuest", null);
exports.QuestsController = QuestsController = __decorate([
    (0, common_1.Controller)('Quests'),
    __metadata("design:paramtypes", [typeof (_a = typeof quest_service_1.QuestService !== "undefined" && quest_service_1.QuestService) === "function" ? _a : Object])
], QuestsController);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateQuestDto = exports.CreateQuestDto = void 0;
const swagger_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(8);
let CreateQuestDto = class CreateQuestDto {
};
exports.CreateQuestDto = CreateQuestDto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Кто является главным героем фильма Уран', description: 'вопрос' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Боксер', description: 'правильный ответ' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Клоун', 'Бизнессмен', 'Heудачник'], description: 'Массив вариантов' }),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], CreateQuestDto.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'easy', description: 'сложность' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "hardness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '55.00323', description: 'координаты широта' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '52.332332', description: 'координаты долгота' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "lon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Roman', description: 'автор теста' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Смешарики', description: 'все тесты в одном квизе' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "quizIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'айди квиза' }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "quizId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'История', description: 'Категория теста' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CreateQuestDto.prototype, "rebus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CreateQuestDto.prototype, "todo", void 0);
exports.CreateQuestDto = CreateQuestDto = __decorate([
    (0, typeorm_1.Entity)()
], CreateQuestDto);
let UpdateQuestDto = class UpdateQuestDto {
};
exports.UpdateQuestDto = UpdateQuestDto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UpdateQuestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Кто является главным героем фильма Уран', description: 'вопрос' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Боксер', description: 'правильный ответ' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Клоун', 'Бизнессмен', 'Heудачник'], description: 'Массив вариантов' }),
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], UpdateQuestDto.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'easy', description: 'сложность' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "hardness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '55.00323', description: 'координаты широта' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", Number)
], UpdateQuestDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '52.332332', description: 'координаты долгота' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", Number)
], UpdateQuestDto.prototype, "lon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Roman', description: 'автор теста' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Смешарики', description: 'все тесты в одном квизе' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "quizIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'История', description: 'Категория теста' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UpdateQuestDto.prototype, "categorie", void 0);
exports.UpdateQuestDto = UpdateQuestDto = __decorate([
    (0, typeorm_1.Entity)()
], UpdateQuestDto);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamModule = void 0;
const common_1 = __webpack_require__(3);
const team_entity_1 = __webpack_require__(11);
const team_controller_1 = __webpack_require__(15);
const team_service_1 = __webpack_require__(16);
const typeorm_1 = __webpack_require__(4);
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([team_entity_1.Team])],
        controllers: [team_controller_1.TeamController],
        providers: [team_service_1.TeamService],
    })
], TeamModule);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamController = exports.s3 = void 0;
const common_1 = __webpack_require__(3);
const team_service_1 = __webpack_require__(16);
const platform_express_1 = __webpack_require__(17);
const easy_yandex_s3_1 = __webpack_require__(18);
exports.s3 = new easy_yandex_s3_1.default({
    auth: {
        accessKeyId: 'YCAJEmmhVKiQFxqCY0IXE02lH',
        secretAccessKey: 'YCMo3gC5oNmnCCC4Aby6G624qNdGD_9EPCYYiKgb',
    },
    Bucket: 'questsimages',
    debug: true,
});
let TeamController = class TeamController {
    constructor(TeamService) {
        this.TeamService = TeamService;
    }
    async createTeam(name) {
        return this.TeamService.createTeam(name);
    }
    uploadImageUrls(name, file, nameOfLocation, result) {
        console.log(name, file, nameOfLocation, result);
        return this.TeamService.uploadImageUrls(name, file, nameOfLocation, result);
    }
    uploadFile(file) {
    }
    async deleteTeam(id) {
        return this.TeamService.deleteTeam(id);
    }
    async getAllTeams() {
        return this.TeamService.getAllTeams();
    }
    async getTeamById(id) {
        return this.TeamService.getTeamById(id);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], TeamController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Post)('/uploadPhotoUrls/:name'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('location')),
    __param(3, (0, common_1.Body)('result')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object, String, String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TeamController.prototype, "uploadImageUrls", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof Express !== "undefined" && (_f = Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], TeamController.prototype, "deleteTeam", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], TeamController.prototype, "getAllTeams", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], TeamController.prototype, "getTeamById", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.Controller)('team'),
    __metadata("design:paramtypes", [typeof (_a = typeof team_service_1.TeamService !== "undefined" && team_service_1.TeamService) === "function" ? _a : Object])
], TeamController);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(8);
const team_entity_1 = __webpack_require__(11);
const team_controller_1 = __webpack_require__(15);
let TeamService = class TeamService {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async uploadImageUrls(name, file, nameOfLocation, result) {
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
        let ip = await team_controller_1.s3.Upload({
            buffer: file.buffer,
        }, '/images/');
        if (!ip) {
            console.log("ip");
            return;
        }
        if (Array.isArray(ip)) {
            if (ip.length > 0 && ip[0].Location) {
                team.imageDataUrl.push(ip[0].Location);
                team.imageDataUrl = [...team.imageDataUrl, ip[0].Location];
            }
        }
        else if (ip.Location) {
            team.imageDataUrl.push(ip.Location);
        }
        team.solved.push(nameOfLocation);
        team.results.push(result);
        console.log(`добавлено ${team}`);
        await this.teamRepository.save(team);
        return team;
    }
    async createTeam(name) {
        const existingTeam = await this.teamRepository.findOne({ where: { name } });
        if (existingTeam) {
            throw 'Team with this name already exists';
        }
        const newTeam = this.teamRepository.create({ name });
        return this.teamRepository.save(newTeam);
    }
    async deleteTeam(id) {
        await this.teamRepository.delete(id);
    }
    async getAllTeams() {
        return this.teamRepository.find();
    }
    async getTeamById(id) {
        return this.teamRepository.findOne({ where: { id } });
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TeamService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("easy-yandex-s3");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
async function bootstrap() {
    const port = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Используйте этот бекенд для админки ")
        .setDescription('что бы его рзадеплоить нужно соаздать psg admin')
        .setVersion('1.0.1.')
        .addTag("Bell -x")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/doc', app, document);
    await app.listen(port);
    console.log(`listening on port ${port}`);
    if (false) {}
}
bootstrap();

})();

/******/ })()
;