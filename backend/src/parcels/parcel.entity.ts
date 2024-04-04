import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parcel')
export class Parcel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @Column({ type: 'date', nullable: true })
  date: Date;
}
