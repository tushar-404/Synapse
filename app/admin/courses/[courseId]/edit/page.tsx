import { adminGetCourse } from "@/app/data/admin/admin-get-course"

type Params = Promise<{courseId : string}>


export default async function EditRoute({params}: {params: Params}){
    const {courseId} = await params
    const data = await adminGetCourse( courseId )
    return (
        <div>
            <h1>Edit Course: <span>{data.title}</span></h1>
        </div>
    )
}