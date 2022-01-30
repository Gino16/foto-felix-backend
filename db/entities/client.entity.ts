import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 11, name: 'dni', nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 255, name: 'firstname', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 255, name: 'lastname', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 255, name: 'phone', unique: true})
  phone: string;

  @Column({ type: 'varchar', length: 255, name: 'email', nullable: true })
  email: string;
}
