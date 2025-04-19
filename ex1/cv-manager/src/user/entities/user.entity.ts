import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Pour garder des numbers
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;
  c;

  @Column() // Assurez-vous que cette ligne existe
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
