import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./_components/AdminCourseCard";
import { EmptyState } from "@/components/general/EmptyState";
import { Suspense } from "react";

export default async function CoursesPage(){
    return(
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold ">
                    Your Courses
                </h1>
                <Link href={"/admin/courses/create"}
                className={buttonVariants()}>
                    Create Courses
                </Link>
            </div>

            <div>
                Here You wil see all the courses
            </div>
            <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
                <RenderCourses />
            </Suspense>
            
        </div>
    )
}

async function RenderCourses() {
  const data = await adminGetCourses();

  return (data.length === 0 ? (
    <EmptyState
      title="No Courses found"
      description="Create a New Course to get started"
      buttonText="Create Course"
      href="/app/admin/courses/create"
    />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div> 
  )
)
}


function AdminCourseCardSkeletonLayout() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
            {Array.from({length: 4}).map((_, index) => (
                <AdminCourseCardSkeleton key={index}/>
            ))}
        </div>
    )
}