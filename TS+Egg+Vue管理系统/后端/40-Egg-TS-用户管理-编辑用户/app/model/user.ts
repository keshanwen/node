/**
 * @desc 用户表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {OAuth} from './oauth';

@Table({
    modelName: 'user'
})
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        comment: '用户ID',
    })
    id: number;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户姓名',
        validate:{
            is: /^[A-Za-z0-9\-]{6,}$/
        }
    })
    username: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户邮箱',
        validate:{
            isEmail:true
        }
    })
    email: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户手机',
        validate:{
            is:/^1[3456789]\d{9}$/
        }
    })
    phone: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:false,
        unique:true,
        comment: '用户密码',
    })
    password: string;

    @Column({
        field:'user_state',
        type:DataType.BOOLEAN,
        allowNull:true,
        unique:false,
        comment: '用户是否可用',
    })
    userState: boolean;

    @Column({
        type:DataType.BOOLEAN,
        allowNull:true,
        unique:false,
        comment: '是否绑定授权账户',
    })
    github: boolean;

    @Column({
        field:'avatar_url',
        type:DataType.STRING,
        allowNull:true,
        unique:false,
        comment: '用户头像',
    })
    avatarURL: string;

    @HasMany(()=>OAuth)
    oauths:OAuth[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => User;
