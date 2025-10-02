import express, { Request, Response } from "express";
import cors from "cors";
import { statusCodes } from "./constants/statusCodes";
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

    if (!parseResult) {
        return res.status(statusCodes.NotFound).json({
            message: "Wrong input form user"
        })
    }
    try {
        const { username, password} : UserType = parseResult.data;
        const existingUser = await UseModel.findOne({username});
        

    }
})




app.listen(PORT, () => {
    console.log(`Server is running at the port ${PORT}`)
});