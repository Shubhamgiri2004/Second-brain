import express, { Request, Response } from "express";
import cors from "cors";
import { statusCodes } from "./constants/statusCodes";
import UserModel from "./models/user";
import { auth } from "./middleware/auth";
import { getYoutubeVideoId, extractTweet, generateRandomString } from "./util";
import { signValidation, contentValidation, UserType, contentType } from "./middleware/validation";
import ContentModel from "./models/content";
import mongoose from "mongoose";
import linkModel from "./models/link";
import { userInfo } from "os";
import { map } from "zod";


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
        const { username, password } = parseResult.data;
        const existingUser = await UserModel.findOne({ username });

        if (!existingUser) return res.json({
            message: "Username already exists."
        })

        const hashPassword = await UserModel.hashPassword(password);
        const userResponse = await UserModel.create({ username: username, password: hashPassword })
        if (!userResponse) return res.json({
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


app.post("/signIn", async (req, res) => {
    const parseResult = signValidation.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({
            message: "User can't be find. Please login again"
        })
    }

    try {
        const { username, password } = parseResult.data;
        const userResponse = await UserModel.findOne({ username }).select("+password");

        if (!userResponse) {
            return res.status(statusCodes.NotFound).json({
                message: "user can't find "
            })
        }

        const match = await userResponse.matchPassword(password);
        if (!match) {
            return res.status(statusCodes.NotFound).json({
                msg: "password didn't matched that you entered"
            })
        }

        const token = await userResponse.generateAuthTokens();
        res.status(statusCodes.Success).json({
            msg: "Signin successfully",
            user: userResponse,
            token: token
        })

    } catch (e) {
        res.status(statusCodes.ServerError).json({
            message: "Login failed an server error occurred."
        })
    }
})

//To post content Route
app.post("/content", auth, async (req, res) => {
    const parseResult = contentValidation.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({
            msg: "Wrong Input",
            error: parseResult.error
        });
    }

    try {
        const userId = req.userId;
        const { link, title, type, tags }: contentType = parseResult.data;
        let contentResponse, tagIds;

        if (!tags || tags.length === 0 || tags[0] === "") {
            let newLink: string | null = link;
            if (type === "Video") {
                const resp = getYoutubeVideoId(link)
                if (resp === null) {
                    res.status(statusCodes.NotFound).json({
                        message: "Content not created"
                    })
                } else {
                    newLink = resp;
                }
            }
            else if (type == "Tweet") {
                newLink = extractTweet(link);
                if (newLink == null) {
                    return res.status(statusCodes.NotFound).json({
                        msg: "Tweet link can't be null"
                    })
                }
                contentResponse = await ContentModel.create({ userId, link: newLink, type, tags: tagIds });
            }
            if (!contentResponse) {
                return res.status(statusCodes.NotFound).json({
                    message: "Content Not created"
                })
            }

            if (contentResponse) {
                return res.status(statusCodes.Success).json({
                    message: "Content created Successfully",
                    Content: contentResponse
                })
            }
        }
    } catch (error) {
        res.status(statusCodes.ServerError).json({
            message: "A server error occurred"
        })
    }
})


// T0 get content
app.get("/content", auth, async (req, res) => {

    try {
        const userId = req.userId;
        const contentRes = await ContentModel.find({ userId }).populate("userId tags");
        if (!contentRes.length) {
            return res.status(statusCodes.NotFound).json({
                message: "Content Not found"
            })
        }

        const content = contentRes.map((x) => ({
            title: x.title,
            link: x.link,
            type: x.type,
            id: x._id,
            tags: (x.tags ?? []).map((t) =>
                typeof t === "object" && "tag" in t ? t.tag : String(t)
            ),
            timeStamp: new Date(x.createdAt ?? new Date()).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),

        }));

        return res.status(statusCodes.Success).json({
            message: "Content fetched successfully",
            content
        });
    } catch (error) {
        res.status(statusCodes.ServerError).json({
            message: "Server error occurred"
        })
    }
})


// to delete 
app.delete("/delete", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const { contentId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(statusCodes.NotFound).json({
                message: "content not found"
            });
        };
        await ContentModel.deleteOne({ _id: contentId, userId });
        res.status(statusCodes.Success).json({
            message: "Content deleted with specific id"
        })
    } catch (error) {
        res.status(statusCodes.ServerError).json({
            message: "Server error occurred"
        })
    }
})


// To share
app.post("/brain/share", auth, async (req, res) => {

    try {
        const userId = req.userId;
        const share = req.body.share;

        if (share) {
            const existShare = await linkModel.findOne({ userId });
            if (!existShare) {
                return res.status(statusCodes.NotFound).json({
                    message: "content doesn't exists"
                });
            }
            const link = generateRandomString(10);
            const Response = await linkModel.create({ link, userId });
            if (Response) {
                res.status(statusCodes.Success).json({
                    message: "Link created successfully",
                    link: Response.link
                })
            } else {
                await linkModel.deleteOne({ userId });
                res.status(statusCodes.NotFound).json({
                    message: "Link deleted successfully"
                })
            }
        }
        return res.status(statusCodes.NotFound).json({
            message: "server error occurred"
        })

    } catch (error) {
        res.status(statusCodes.ServerError).json({
            message: "An Internal Server Error Occurred"
        })
    }
})


// To share Link
app.get("/brain/:shareLink", auth, async (req, res) => {
    try {
        const link = req.params.shareLink;
        const linkRes = await linkModel.findOne({ link }).populate("userId", "username");

        if (!linkRes || !linkRes.userId || typeof linkRes.userId !== "object" || !("username" in linkRes.userId)) {
            return res.status(statusCodes.NotFound).json({
                msg: "Wrong link entered"
            })
        }

        const userId = linkRes.userId._id;
        const contentRes = await ContentModel.find({ userId }).populate("userId tags", "username tags");
        const content = contentRes.map((x) => ({
            title: x.title,
            link: x.link,
            type: x.type,
            id: x._id,
            tags: x.tags
                ? x.tags.map((t) => (typeof t === "object" && "tag" in t ? t.tag : t.toString()))
                : [],
        }))

        const username = (linkRes.userId as { username: string }).username;
        res.status(statusCodes.Success).json({
            message : "content fetched successfully",
            username,
            content
        })

    } catch (error) {
        res.status(statusCodes.ServerError).json({
            message: "Internal server Error occurred"
        });
    };
})








app.listen(PORT, () => {
    console.log(`Server is running at the port ${PORT}`)
});