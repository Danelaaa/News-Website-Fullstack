import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import slugify from "slugify";
import { Exclude } from "class-transformer";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column("text")
    content:string;
    @Column()
    slug:string;
    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdOn:Date;
    @UpdateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    modifiedOn: Date;
    @Column()
    mainImageUrl:string;

    @Column()
    @Exclude()
    userId:number;

    @Column({default: 3})
    @Exclude()
    categoryId:number;

    @ManyToOne(()=>User,(user)=>user.posts,{
        eager:true
    })
    @JoinColumn({
        name:'userId',
        referencedColumnName:'id'
    })
    user: User

    @ManyToOne(()=>Category,(cat)=>cat.post,{
        eager:true
    })
    @JoinColumn({
        name:'categoryId',
        referencedColumnName:'id'
    })
    category:Category;


    @BeforeInsert()
    slugifyPost(){
         this.slug = slugify(this.title.substr(0,20),{
            lower: true,
            replacement:'_'
         });
    }
}
