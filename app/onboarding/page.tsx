'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState } from 'react'
import { onBoardingAction } from '../actions/action'
import {useForm} from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { onboardingSchema } from '@/lib/zodSchemas'
import { SubmitButton } from '../components/SubmitButtons'
const OnboardingRoute = () => {
    const [lastResult,action] = useActionState(onBoardingAction,undefined);
    const [form,fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData,{
                schema:onboardingSchema
            })
        },
        shouldValidate:'onBlur',
        shouldRevalidate:'onInput'
    })
    console.log(fields)


  return (
    <div className='min-h-screen w-screen flex items-center justify-center '>
        <Card className='w-full max-w-md'>
            <CardHeader className='w-full'>
                <CardTitle>Welcome to Cal<span className='text-primary'>Marshal</span></CardTitle>
                <CardDescription>We need the following information to set up your profile</CardDescription>
            </CardHeader>
           <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                 <CardContent className='flex flex-col gap-y-5 '>
                <div className='grid gap-y-2'>
                    <Label>Full Name</Label>
                     <Input
                        key={fields.fullName.key}
                        name={fields.fullName.name}
                        defaultValue={fields.fullName.initialValue}
                        placeholder="Yunus Uthman"
                        />

                </div> 
                     <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
                <div className='grid gap-y-2'>
                    <Label>Username</Label>
                    <div className='flex rounded-md'>
                        <span className='inline-flex items-center px-3 rounded-l-md
                         border border-r-0 border-muted text-sm bg-muted text-muted-foreground'>CalMarshal.com/</span>
                         <Input
                            key={fields.userName.key}
                            name={fields.userName.name}
                            defaultValue={fields.userName.initialValue}
                            placeholder="example-user-1"
                            className="rounded-l-none"
                            />


                    </div>
                     <p className='text-red-500 text-sm'>{fields.userName.errors}</p>

                </div>

            </CardContent>
            <CardFooter>
                {/* <Button className='w-full mt-8'>Submit</Button> */}
                <SubmitButton text='Submit' className='t-8'/>
            </CardFooter>
           </form>
        </Card>
    </div>
  )
}

export default OnboardingRoute