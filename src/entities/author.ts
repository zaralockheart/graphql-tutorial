import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {book} from "./book";


@Entity("author",{schema:"test"})
export class author {

    @PrimaryGeneratedColumn({
        type:"smallint", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(type=>book, book=>book.author_,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    books:book[];
    
}
