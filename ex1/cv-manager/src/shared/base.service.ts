import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(
    protected readonly repository: Repository<T>
  ) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOneBy({ id } as any);
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    await this.repository.update(id, entity);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}