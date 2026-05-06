import { Prisma } from "@/lib/generated/prisma/client"

export type CourseWithStructure = Prisma.CourseGetPayload<{
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
}>