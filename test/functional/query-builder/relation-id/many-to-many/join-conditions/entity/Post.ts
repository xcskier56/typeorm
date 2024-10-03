import { ManyToMany } from "../../../../../../../src/decorator/relations/ManyToMany"
import { Entity } from "../../../../../../../src/decorator/entity/Entity"
import { PrimaryGeneratedColumn } from "../../../../../../../src/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "../../../../../../../src/decorator/columns/Column"
import { Category } from "./Category"
import { DeleteDateColumn } from "../../../../../../../src"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToMany((type) => Category, (category) => category.posts)
    categories: Category[]

    @DeleteDateColumn()
    deletedAt: Date | null
}
