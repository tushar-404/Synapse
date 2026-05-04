"use client"
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courseCategories, courseLevels, courseSchema, CourseSchemaType, courseStatus } from "@/lib/zodSchema";
import slugify from "slugify";
import { Loader2, PlusIcon, SparkleIcon } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichEditor from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { editCourse } from "../action";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";

interface iAppProps {
    data: AdminCourseSingularType
}

export function EditCourseForm({data}: iAppProps){
    const [pending, startTransition] = useTransition();
    const router = useRouter()
     const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema) as Resolver<CourseSchemaType>,
        defaultValues: {
          title: data.title,
          description: data.description,
          fileKey: data.fileKey,
          price: data.price ,
          duration: data.duration,
          level: data.level,
          category: data.category as CourseSchemaType['category'],
          smallDescription:data.smallDescription,
          slug: data.slug,
          courseStatus: data.status,
        },
      });
      function onSubmit(value: CourseSchemaType){
          startTransition(async () => {
            const {data: result, error} = await tryCatch(editCourse(value, data.id))
            if(error){
              toast.error("An unexpected errror occured. Please try again later.")
              return
            }
            if(result.status === 'success') {
              toast.success(result.message)
              form.reset()
              router.push("/admin/courses")
            }
            else if(result.status === "error"){
              toast.error(result.message)
              form.reset()
            }
          })
        }

    return(
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field }/>
                  </FormControl>
                </FormItem>
  )}/>
              <div className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name="slug"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field}/>
                      </FormControl>
                    </FormItem>
  )}
              />
              <Button type="button" onClick={() => {
                const titleValue = form.getValues("title")
                const slug = slugify(titleValue)
                form.setValue("slug", slug, {shouldValidate: true})
              }}
              className="w-fit">
                Generate Slug <SparkleIcon />
              </Button>
              </div>
              <FormField
              control={form.control}
              name="smallDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Small Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120]" placeholder="Small Description" {...field }/>
                  </FormControl>
                </FormItem>
  )}/>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichEditor field={field}/>
                  </FormControl>
                </FormItem>
  )}/>
          <FormField
              control={form.control}
              name="fileKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <Uploader onChange={field.onChange} value={field.value}/>
                  </FormControl>
                </FormItem>
  )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                              {category}
                          </SelectItem>
  ))}
                      </SelectContent>
                  </Select>
                </FormItem>
  )}/>

          <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Level"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseLevels.map((category) => (
                          <SelectItem key={category} value={category}>
                              {category}
                          </SelectItem>
  ))}
                      </SelectContent>
                  </Select>
                </FormItem>
  )}/>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (hours)</FormLabel>
                  <FormControl>
                    <Input type="Number"  placeholder="Duration"  {...field }/>
                  </FormControl>
                </FormItem>
  )}/>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="Number" placeholder="Price" {...field }/>
                  </FormControl>
                </FormItem>
  )}/>
              </div>
            <FormField
              control={form.control}
              name="courseStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                  onValueChange={field.onChange}
                  value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseStatus.map((category) => (
                          <SelectItem key={category} value={category}>
                              {category}
                          </SelectItem>
  ))}
                      </SelectContent>
                  </Select>
                </FormItem>
  )}/>
            <Button type="submit" disabled={pending}
            className="ml-117 cursor-pointer">
              {pending? (
                <>
                  Updating ...
                  <Loader2 className="animate-spin"/>
                </>
              ): (
                <>
                  Update Course <PlusIcon />
                </>
              )}
            </Button>
            </form>
          </Form>
    )
}