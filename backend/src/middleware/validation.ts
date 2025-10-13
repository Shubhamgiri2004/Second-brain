import { z } from "zod";

export const signValidation = z.object({
    username : z.string().min(3, "Minimum length of the username should be 3").max(20, "Maximum length of the username will be 20 letters"),
    password : z.string().min(8, "Min password length should be 8 letters").max(12, "Maximum password length of the password be 12")
});

export const contentValidation = z.object({
    link : z.url("Link must be a valid url").min(4, "Url must be min character of 4 letters"),
    type : z.enum(["Image", "Video", "Url", "Tweet"]),
    title : z.string().min(3, "Minimum the word of title to be needed."),
    tags : z.array(z.string()).optional()
});

export type UserType = z.infer<typeof signValidation>
export type contentType = z.infer<typeof contentValidation>