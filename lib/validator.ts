import { z } from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(2,"Username must be at least 2 characters.",),
    description: z.string().min(3,"Description must be at least 2 characters.",).max(400,"Description must be less than 400"),
    location:z.string().min(2,"Location must be at least 2 characters.",).max(400,'Location must be at least 400 characters'),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url()
})