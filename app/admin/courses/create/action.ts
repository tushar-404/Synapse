"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { CourseLevel, CourseStatus } from "@/lib/generated/prisma/enums";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    detectBot({
        mode: "LIVE",
        allow:[]
    }),
).withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5
    })
)


export async function CreateCourse(values: CourseSchemaType): Promise<ApiResponse> {
    const session = await requireAdmin()

    try {
        const req = await request();

        const decision = await aj.protect(req, {
            fingerprint: session.user.id
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