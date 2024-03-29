export default {
    username: {
        type: 'string',
        trim: true,
        // 只能是数字或字母
        format: /^[A-Za-z0-9]{6,}$/,
        message: '用户名不符合要求'
    },
    password: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,}$/,
        message: '密码不符合要求'
    },
    email:{
        required:false,
        type:'string',
        trim:true,
        format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message:'邮箱验不符合要求'
    },
    phone:{
        required:false,
        type:'string',
        trim:true,
        format: /^1[3456789]\d{9}$/,
        message:'手机不符合要求'
    }
}
