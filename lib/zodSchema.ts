
import {z} from "zod"

export const courseLevels = [
    "Beginner", "Intermediate", "Advanced"
]

export const courseCategories = [
    "Development", "Business", "Finance", "IT and Software", "Office productivity",
    "Personal Development", "Design", "Marketing", "Health", "Music", "Teaching and Academics "
] as const

export const courseStatus = [
  "Draft",
  "Publishes",
  "Acrhieved"
] as const

export const courseSchema = z.object({
    title: z.string().max(100, {"message": "Title must not exceed by 100 characters"}).min(3, {"message" : "Title must contain min 3 characters"}),
    description: z.string().min(3, {"message" : "Description must contain min 3 characters"}),

    fileKey: z.string().min(1, {"message" : "File is required"}),

    price: z.coerce.number().min(1, {"message" : "Price must be min 100 rupeees" }),

    duration: z.coerce.number().min(1, {"message" : "Duartion must be of min 1 hour"}).max(500, {"message": "Duration must not exceed  by 500 hour"}),

    level: z.enum(courseLevels, {"message" : "Level is required"}),
    category: z.enum(courseCategories, {
        message: "Category is required"
    }),
    smallDescription: z.string().min(3, {"message": "Must contain min 3 characters"}).max(200, {"message": "Must not exceed by 200 characters"}),

    slug: z.string().min(3, {"message": "Must be at least 3 character long"}),

    courseStatus: z.enum(courseStatus, {
        "message": "Status is Required"
    })
})

export type CourseSchemaType = z.infer<typeof courseSchema>


