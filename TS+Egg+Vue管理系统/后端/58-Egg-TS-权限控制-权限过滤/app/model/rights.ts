/**
 * @desc 权限表
 */
import {Column, DataType, Model, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
@Table
export class Rights extends Model<Rights> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        comment: '权限ID',
    })
    id: number;

    @Column({
        type:DataType.STRING(255),
        field:'rights_name',
        allowNull:false,
        comment: '权限名称'
    })
    rightsName: string;

    @Column({
        type:DataType.STRING(255),
        field:'rights_desc',
        allowNull:false,
        comment: '权限描述',
    })
    rightsDesc: string;

    @Column({
        field:'rights_state',
        type:DataType.BOOLEAN,
        allowNull:true,
        defaultValue: true,
        comment: '权限是否可用',
    })
    rightsState: boolean;

    @Column({
        type:DataType.STRING(255),
        field:'rights_type',
        allowNull:false,
        comment: '权限类型'
    })
    rightsType: string;

    @Column({
        type:DataType.STRING(255),
        field:'rights_method',
        allowNull:true,
        comment: '请求方式',
    })
    rightsMethod: string;

    @Column({
        type:DataType.STRING(255),
        field:'rights_path',
        allowNull:true,
        comment: '权限地址',
    })
    rightsPath:string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: '权限的父级编号',
        defaultValue: 0
    })
    pid:number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: '权限的等级',
        defaultValue: 0
    })
    level:number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => Rights;
