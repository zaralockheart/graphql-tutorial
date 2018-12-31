import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {author} from "./author";


@Entity("book",{schema:"test"})
@Index("fk_book_author",["author_",])
export class book {

    @PrimaryGeneratedColumn({
        type:"mediumint", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:200,
        name:"title"
        })
    title:string;
        

   
    @ManyToOne(type=>author, author=>author.books,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'author_id'})
    author_:author | null;

}
