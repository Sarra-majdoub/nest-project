import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { SearchCvDto } from './dto/search-cv.dto';

@Injectable()
export class CvService extends BaseService<Cv> {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {
    super(cvRepository);
  }

  async createWithRelations(
    cvData: Partial<Cv>,
    userId: number,
    skillIds: number[],
  ): Promise<Cv> {
    const user = await this.userService.findOne(userId);
    const skills = await Promise.all(
      skillIds.map((id) => this.skillService.findOne(id)),
    );

    const cv = this.cvRepository.create({
      ...cvData,
      user,
      skills,
    });

    return this.cvRepository.save(cv);
  }

  async search(searchCvDto: SearchCvDto): Promise<Cv[]> {
    console.log('Search params:', searchCvDto);

    const { search, age } = searchCvDto;
    const query = this.repository.createQueryBuilder('cv');

    if (search) {
      query.where(
        '(LOWER(cv.name) LIKE LOWER(:search) OR LOWER(cv.firstname) LIKE LOWER(:search) OR LOWER(cv.job) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    
    if (age) {
      if (search) {
        query.orWhere('cv.age = :age', { age });
      } else {
        query.where('cv.age = :age', { age });
      }
    }
    const results = await query.getMany();
    console.log('Found CVs:', results); // Add this
    return results;
  }
}
