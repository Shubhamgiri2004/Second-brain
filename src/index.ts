import express, { Request, Response } from "express";
import cors from "cors";
import { statusCodes } from "./constants/statusCodes";
import UserModel from "./models/user";
import { signValidation, contentValidation, UserType } from "./middleware/validation";


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from backend side written in backend")
})


//SignUp route
app.post("/signup", async (req, res) => {
    const parseResult = signValidation.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({
            message: "Wrong input form user"
        })
    }
    try {
        const { username, password} : UserType = parseResult.data;
        const existingUser = await UserModel.findOne({username});
        
        if(!existingUser) return res.json({
            message: "Username already exists."
        })

        const hashPassword = await UserModel.hashPassword(password);
        const userResponse = await UserModel.create({ username: username, password: hashPassword})
        if(!userResponse) return res.json({
            message: "User can't created"
        })

        const token = userResponse.generateAuthTokens();
        return res.send(statusCodes.Success).json({
            msg: "User created successfully",
            user: userResponse,
            token: token
        })
    } catch (e) {
        res.send(statusCodes.ServerError).json({
            message: "User can't created Internal server error occurred"
        })
    }
})


app.post("/signIn",  async (req, res)=>{

})



app.listen(PORT, () => {
    console.log(`Server is running at the port ${PORT}`)
});