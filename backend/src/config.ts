import  { z } from "zod";
import "dotenv/config"

//making a envSchema
const envSchema = z.object({
    JWT_SECRET : z.string().min(3, "Minimum length of the secret key should be 3"),
    DB_URL : z.string().min(3, "Minimum length of the DB_URL is 3"),
    PORT : z.string().transform(Number)
})

const parsed = envSchema.parse(process.env);

export const config = {
    JWT_SECRET : parsed.JWT_SECRET,
    DB_URl : parsed.DB_URL,
    PORT : parsed.PORT
}