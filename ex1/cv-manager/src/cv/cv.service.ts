import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { SearchCvDto } from './dto/search-cv.dto';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService extends BaseService<Cv> {
  findAllForUser(userId: any) {
      throw new Error('Method not implemented.');
  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Cv)
    protected readonly repository: Repository<Cv>,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {
    super(repository);
  }
  
  // Implémentez la méthode manquante
  async createWithRelations(
    cvData: Partial<Cv>,
    userId: number,
    skillIds: number[],
  ): Promise<Cv> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const skills = await Promise.all(
      skillIds.map((id) => this.skillService.findOne(id)),
    );

    const cv = this.repository.create({
      ...cvData,
      user,
      skills,
    });

    return this.repository.save(cv);
  }

  async search(searchCvDto: SearchCvDto): Promise<Cv[]> {
    const { search, age } = searchCvDto;
    const query = this.repository.createQueryBuilder('cv');

    if (search) {
      query.where(
        '(LOWER(cv.name) LIKE LOWER(:search) OR LOWER(cv.firstname) LIKE LOWER(:search) OR LOWER(cv.job) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (age) {
      search 
        ? query.orWhere('cv.age = :age', { age })
        : query.where('cv.age = :age', { age });
    }

    return query.getMany();
  }

  async createForUser(createCvDto: CreateCvDto, userId: number): Promise<Cv> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repository.save({
      ...createCvDto,
      user,
    });
  }

  async updateForUser(id: number, updateCvDto: UpdateCvDto, userId: number) {
    const cv = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!cv) throw new NotFoundException('CV not found');
    if (cv.user.id !== userId) throw new ForbiddenException('Forbidden');

    await this.repository.update(id, updateCvDto);
    return this.findOne(id);
  }

  async deleteForUser(id: number, userId: number) {
    const cv = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!cv) throw new NotFoundException('CV not found');
    if (cv.user.id !== userId) throw new ForbiddenException('Forbidden');

    return this.repository.delete(id);
  }
}