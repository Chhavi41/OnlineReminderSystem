import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
import bcrypt  from 'bcryptjs';
import validator from "validator";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;


// <IUser>, It tells TypeScript what shape the documents in this schema will have.
// This lets Mongoose infer the types of fields (and this) automatically.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v:string) {
                return validator.isEmail(v)
            }
        }
    },
    password: {
        type: String,
        required: true,
        select: false, //  to prevent the password field from being returned by default in query results.
    }
}, {
    timestamps: true
});


// InferSchemaType → Automatically infers fields from the schema.
// HydratedDocument<IUser> → Adds Mongoose document instance methods to this.

interface IuserMethods {
    getJWT(): string,
    verifyPassword(passwordInput:string): Promise<boolean>
}
type Iuser = InferSchemaType<typeof userSchema> & IuserMethods

userSchema.pre('save', async function(this:HydratedDocument<Iuser>) {
    if (this.isModified('password')) {
        this.password =  await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.getJWT = async function () {
    console.log("process.env.JWT_SECRET raw:", process.env.JWT_SECRET);
    console.log('57: ', secret)
    const token = await jwt.sign({_id: this._id}, secret!, {
        expiresIn: "7d"
    });
    return token;
}

userSchema.methods.verifyPassword = async function (this:HydratedDocument<Iuser>, passwordInput:string) {
    const passwordHash = this.password;
    const isPasswordValid = bcrypt.compare(passwordInput, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model<Iuser>("User", userSchema);
export default User;