"use client"

import { useCallback, useState } from "react"
import {FileRejection, useDropzone} from "react-dropzone"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"
import { RenderEmptyState } from "./RenderState"
import { toast } from "sonner"


interface UploaderState {
    id: string | null;
    file: File | null;
    uploading : boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: "image" | "video";
}

export function Uploader() {
    const [fileState, setFileState] = useState<UploaderState>({
        error: false,
        file: null,
        id: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        fileType: "image"
    })

    async function uploadFile(file: File) {
        setFileState((prev) => ({
            ...prev,
            uploading: true,
            progress: 0
        }))

        try {
            const preSignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                })
            })
            if(!preSignedResponse.ok) {
                toast.error("Failed to get presigned URL")
                setFileState((prev) => ({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true
                }))
                return
            }
            const { preSignedUrl, key } = await preSignedResponse.json()

            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.upload.onprogress = (event)=> {
                    if(event.lengthComputable) {
                        const percentageComputed = (event.loaded / event.total) * 100
                        setFileState((prev) => ({
                        ...prev,
                        progress: Math.round(percentageComputed)
                    }))
                    }
                    xhr.onload = ()=> {
                        if(xhr.status === 200 || xhr.status === 204) {
                            setFileState ((prev) => ({
                                ...prev,
                                progress: 100,
                                uploading: false,
                                key: key,
                            }))
                        }
                    }
                }
            })
        }
        catch {

        }
    }


    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
        if(acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            setFileState({
                file: file,
                uploading: false,
                progress: 0,
                objectUrl: URL.createObjectURL(file),
                error: false,
                id: uuidv4(),
                isDeleting: false,
                fileType: "image"
            })
        }
    }, [])

    function rejectedFiles(fileRejection : FileRejection[]) {
        if(fileRejection.length) {
            const tooManyFiles = fileRejection.find((rejection) =>
                rejection.errors[0].code === 'too-many-files'
            );
             const filesIsTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
    )

            if(filesIsTooBig) {
                toast.error("File size exceeds the limit")
            }
            if(tooManyFiles) {
                toast.error("Too many files are selected, max is 1")
            }

        }
    }


    const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept:{"image/*": []},
        maxFiles:1,
        multiple: false,
        maxSize: 5*1024*1024, // 5mb
        onDropRejected: rejectedFiles
    })

    return (
        <Card {...getRootProps()} className={cn(
            "relative border-2 border-dashed transition color duration-200 ease-in-out w-full h-64",
            isDragActive ? "border-primary bg-primary/10 border-solid" :
            'border-border hover:border-primary'
        )}>
            <CardContent className="flex items-center justify-center h-full w-full p-4">
                <input {...getInputProps()} />
                <RenderEmptyState isDragActive={isDragActive}/>

                 {/* <RenderErrorState /> */}
            </CardContent>
        </Card>
    )
}