"use client"
import { buttonVariants, Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courseCategories, courseLevels, courseSchema, CourseSchemaType, courseStatus } from "@/lib/zodSchema";
import slugify from "slugify";
import { ArrowLeft, PlusIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichEditor from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";

export default function CourseCreation() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema) as Resolver<CourseSchemaType>,
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "Health",
      smallDescription: "",
      slug: "",
      courseStatus: "Draft",
    },
  });

  function onSubmit(value: CourseSchemaType){
    console.log(value)
  }



  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className={buttonVariants()}>
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
          <CardDescription>Provide basic information about the course</CardDescription>
        </CardHeader>
        <CardContent>
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
            <Button className="ml-117 cursor-pointer">
              Create Course <PlusIcon />
            </Button>
            </form>
          </Form>
      </CardContent>
      </Card>
    </>
  );
}
