const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    }, 
    email:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    }, 
    password:{
        type:String,
        require:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    follwers:{
        type:Array,
        default:[],
    },
    followins:{
        type:Array,
        default:[],
    },
    isAdmins:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
},
{Timestamp:true}
);

module.exports = mongoose.model("User", UserSchema);