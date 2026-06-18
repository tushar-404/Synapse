import { getAllCourses } from "@/app/data/course/get-all-courses"
import { PublicCourseCard, PublicCourseCardSkeleton } from "../_components/PublicCourseCard"
import { Suspense } from "react"

export default function PublicCoursesRoute() {
  return(
    <div className="mt-5"> 
      <h1 className="fontbold text-2xl text-muted-foreground mb-5">Expolore Courses</h1>
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
      
    </div>
  )
}

async function RenderCourses() {
  const courses = await getAllCourses()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
          <PublicCourseCard key={course.id} data={course}/>
      ))}
    </div>
  )
}
function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}