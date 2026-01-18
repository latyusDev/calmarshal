'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import { settingAction } from "../actions/action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingSchema } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface SettingsFormProps{
    fullName:string;
    email:string,
    profileImage:string
}

export function SettingsForm({email,fullName,profileImage}:SettingsFormProps){
    const [lastResult,action] = useActionState(settingAction,undefined);
    const [currentProfileImage,setCurrentProfileImage] = useState(profileImage)
    const [form,fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData,{
                schema:settingSchema
            })
        },
        shouldValidate:'onBlur',
        shouldRevalidate:'onInput',
    })

    const handleDeleteImage = ()=>{
        setCurrentProfileImage('');

    }
    return(
        <>
              <Card className='w-full'>
            <CardHeader className='w-full'>
                <CardTitle>Settings</CardTitle>
                <CardDescription> Manage your account settings!</CardDescription>
            </CardHeader>

            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input 
                        name={fields.fullName.name} 
                        key={fields.fullName.key}
                        defaultValue={fullName}
                        placeholder="Yunus Uthman"/>
                        <p className="text-sm text-red-600">{fields.fullName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input 
                        disabled
                        defaultValue={email} className="disabled:cursor-not-allowed"
                    type="email" placeholder="test@test.com"/>
                    </div>
                    <div className="grid gap-y-5">
                        <Label >Profile Image</Label>
                        <input type="hidden" 
                        name={fields.profileImage.name}
                        value={currentProfileImage}
                         key={fields.profileImage.key} />
                        {
                            currentProfileImage?(
                                <div className="relative size-16 ">
                                    <img src={currentProfileImage} alt="profile image" className="size-16 rounded-lg"/>
                                            <Button variant={'destructive'} type="button"
                                            size={'icon'} onClick={handleDeleteImage}
                                             className="absolute -top-3 -right-3"><X className="size-4"/></Button>
                                </div>
                            ):<UploadDropzone 
                            onClientUploadComplete={(res)=>{
                                setCurrentProfileImage(res[0].url)
                                toast.success('profile image uploaded successfully!')
                            }}
                            onUploadError={(error)=>{
                                console.log('something went wrong '+error)
                                toast.error(error.message)

                            }}
                            endpoint='imageUploader' />
                        }
                        <p className="text-sm text-red-600">{fields.profileImage.errors}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save Changes" className="w-auto mt-4 bg-primary p-5"/>
                </CardFooter>
            </form>
            </Card>
        </>
    )
}