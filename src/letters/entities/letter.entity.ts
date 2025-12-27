import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Letter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  letter: string;

  @ManyToOne(() => User, (User) => User.sendedLetters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  from: User;

  @ManyToOne(() => User, (User) => User.myLetters, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    })
  to: User;

  @Column({ type: 'date', nullable: false })
  sendAt: Date;

  @Column({ type: 'date', nullable: true })
  readAt?: Date;
}
