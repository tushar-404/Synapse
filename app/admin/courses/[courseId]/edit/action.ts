"use server"

import { requireAdmin } from "@/app/data/admin/require-admin"
import { prisma } from "@/lib/db";
import { CourseLevel, CourseStatus } from "@/lib/generated/prisma/enums";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";

export async function editCourse(data : CourseSchemaType, courseId: string) : Promise<ApiResponse> {
    const user = await requireAdmin();

    try {
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
                ...parsedData,
                level: parsedData.level as CourseLevel,
                status: parsedData.courseStatus as CourseStatus,
            },
        })
        return {
            status: "success",
            message: "Course updated successfully"
        }
    }
    catch {
        return {
            status: "error",
            message: "Failed to update Course"
        }
    }
}