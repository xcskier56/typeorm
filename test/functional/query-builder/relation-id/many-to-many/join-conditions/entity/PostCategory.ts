import { Entity } from "../../../../../../../src/decorator/entity/Entity"
import { PrimaryGeneratedColumn } from "../../../../../../../src/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "../../../../../../../src/decorator/columns/Column"
import { DeleteDateColumn } from "../../../../../../../src"

@Entity()
export class PostCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name: string

    @Column()
    postId: number

    @Column()
    cid: number

    @DeleteDateColumn()
    deletedAt: Date | null
}
