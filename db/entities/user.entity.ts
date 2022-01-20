import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'username', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;
}
