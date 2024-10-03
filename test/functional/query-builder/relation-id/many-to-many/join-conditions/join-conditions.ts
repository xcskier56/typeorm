import "reflect-metadata"
import { expect } from "chai"
import { DataSource } from "../../../../../../src/data-source/DataSource"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../../utils/test-utils"
import { Post } from "./entity/Post"
import { Category } from "./entity/Category"
import { PostCategory } from "./entity/PostCategory"

describe("query builder > relation-id > many-to-many > join-conditions", () => {
    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [__dirname + "/entity/*{.js,.ts}"],
            })),
    )
    beforeEach(() => reloadTestingDatabases(connections))
    after(() => closeTestingConnections(connections))

    it("should filter deleted join table rows when join condition is specified", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post1 = new Post()
                post1.title = "Post 1"
                await connection.manager.save(post1)

                const category1 = new Category()
                category1.name = "Category 1"
                await connection.manager.save(category1)

                const category2 = new Category()
                category2.name = "Category 2"
                await connection.manager.save(category2)

                const pc1 = new PostCategory()
                pc1.cid = category1.id
                pc1.postId = post1.id
                await connection.manager.save(pc1)

                const pc2 = new PostCategory()
                pc2.cid = category2.id
                pc2.postId = post1.id
                pc2.deletedAt = new Date()
                await connection.manager.save(pc2)

                const loadedPost = await connection.manager.find(Post, {
                    relations: {
                        categories: true,
                    },
                })

                // Since 1 postCategory is deleted, this should only return 1 category
                expect(loadedPost[0].categories.length).to.be.equal(1)
            }),
        ))
})
