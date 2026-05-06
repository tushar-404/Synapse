import { CourseWithStructure } from '@/app/admin/courses/[courseId]/edit/CourseStructure';
import "server-only"
import { requireAdmin } from "./require-admin"
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string): Promise<CourseWithStructure> {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      status: true,
      level: true,
      slug: true,
      smallDescription: true,
      category: true,
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              Description: true,
              thumbnailKey: true,
              position: true,
              videoKey: true,
            }
          }
        }
      }
    }
  });

  if (!data) {
    notFound();
  }

  return data;
}

export type AdminCourseSingularType = CourseWithStructure;