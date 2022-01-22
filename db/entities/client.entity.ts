import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 11, name: 'dni', unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 255, name: 'firstname' })
  firstname: string;

  @Column({ type: 'varchar', length: 255, name: 'lastname' })
  lastname: string;

  @Column({ type: 'varchar', length: 255, name: 'phone', unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, name: 'email', unique: true })
  email: string;
}
