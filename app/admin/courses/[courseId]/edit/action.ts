"use server"

import { requireAdmin } from "@/app/data/admin/require-admin"
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { CourseLevel, CourseStatus } from "@/lib/generated/prisma/enums";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
    detectBot({
        mode: "LIVE",
        allow:[]
    }),
).withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 10
    })
)



export async function editCourse(data : CourseSchemaType, courseId: string) : Promise<ApiResponse> {

    const user = await requireAdmin();

    try {
        const req = await request()

        const decision = await aj.protect(req, {
            fingerprint: user.user.id
        })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "You have been blocked :)"
                }
            }
            else {
                return {
                    status: "error",
                    message: "Bot detected 😈😈😈😈😈"
                }
            }
        }

        const result = courseSchema.safeParse(data);
        if(!result.success){
            return {
                status: "error",
                message: "Invalid data"
            }
        }

        const parsedData = result.data

        await prisma.course.update({
            where: {
                id: courseId,
                userId: user.user.id,
            },
            data: {
                title: parsedData.title,
                description: parsedData.description,
                fileKey: parsedData.fileKey,
                price: parsedData.price,
                duration: parsedData.duration,
                level: parsedData.level as CourseLevel,
                category: parsedData.category,
                smallDescription: parsedData.smallDescription,
                slug: parsedData.slug,
                status: parsedData.courseStatus as CourseStatus,
            },
        })
        return {
            status: "success",
            message: "Course updated successfully"
        }
    }
    catch(error) {
        console.log(error)
        return {
            status: "error",
            message: "Failed to update Course"
        }
    }
}

export async function reorderLessons(chpaterId: string, lessons: {id: string; position: number}[], courseId: string): Promise<ApiResponse> {
    try {
        if(!lessons || lessons.length === 0){
            return {
                status: "error",
                message: "no lessons provided for reordering"
            }
        }
        const updates = lessons.map((lesson) => prisma.lesson.update({
            where: {
                id: lesson.id,
                chapterId: chpaterId,
            },
            data: {
                position: lesson.position,

            }
        }))
        await prisma.$transaction(updates)

        revalidatePath(`/app/admin/courses/${courseId}/edit`)

        return {
            status: "success",
            message: "Lessons reordered successfully"
        }
    } 
    catch {
        return {
            status: "error",
            message: "Failed to reorder lessons"
        }
    }
}


export async function reorderChapters(courseId: string, chapters: {
    id: string,
    position: number
}[]): Promise<ApiResponse>{
    await requireAdmin()
    try {
        if(!chapters || chapters.length === 0) {
            return {
                status: "error",
                message: "No chapters proivided for reordering"
            }
        }
        const updates = chapters.map((chapter) => prisma.chapter.update({
            where: {
                id: chapter.id,
                courseId: courseId,
            },
            data: {
                position: chapter.position
            }
        }))
        await prisma.$transaction(updates);

        revalidatePath(`/app/admin/courses/${courseId}/edit`)
        return {
            status : "success",
            message: "Reordered successfully"
        }
    }
    catch {
        return {
            status: "error",
            message: "Failed to reorder chapters"
        }
    }
}