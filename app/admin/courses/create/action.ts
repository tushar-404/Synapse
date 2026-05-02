"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CourseLevel, CourseStatus } from "@/lib/generated/prisma/enums";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { headers } from "next/headers";

export async function CreateCourse(values: CourseSchemaType): Promise<ApiResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const validation = courseSchema.safeParse(values);

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid form data"
            };
        }

        const { courseStatus, level, ...rest } = validation.data;

        const data = await prisma.course.create({
            data: {
                ...rest,
                userId: session?.user.id as string,
                level: level as CourseLevel,
                status: courseStatus as CourseStatus,
            }
        });

        return {
            status: "success",
            message: "course created successfully",
        };

    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: "Something went wrong"
        };
    }
}