import { Matches, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(4)
  @MaxLength(20)
  @Column({ type: 'varchar', length: 255, name: 'username', unique: true })
  username: string;

  @MinLength(8)
  @MaxLength(32)
  @Column({ type: 'varchar', length: 255, name: 'password' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
