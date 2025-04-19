import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base.service';

@Injectable()
export class SkillService extends BaseService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, updateSkillDto);
    return await this.skillRepository.save(skill);
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
