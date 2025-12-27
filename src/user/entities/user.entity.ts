import { Letter } from 'src/letters/entities/letter.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash: string;

  @OneToMany(() => Letter, (Letter) => Letter.from)
  myLetters: Letter[];

  @OneToOne(() => Letter, (Letter) => Letter.to)
  sendedLetters: Letter[];
}
