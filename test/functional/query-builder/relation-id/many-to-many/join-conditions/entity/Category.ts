import { ManyToMany } from "../../../../../../../src/decorator/relations/ManyToMany"
import { Entity } from "../../../../../../../src/decorator/entity/Entity"
import { PrimaryGeneratedColumn } from "../../../../../../../src/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "../../../../../../../src/decorator/columns/Column"
import { JoinTable } from "../../../../../../../src/decorator/relations/JoinTable"
import { Post } from "./Post"
import { PostCategory } from "./PostCategory"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany((type) => Post, (post) => post.categories)
    @JoinTable({
        name: "post_category",
        synchronize: false,
        junctionEntity: PostCategory,
        joinColumn: {
            name: "cid",
            referencedColumnName: "id",
        },
    })
    posts: Post[]
}
