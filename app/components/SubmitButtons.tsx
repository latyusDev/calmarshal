'use client'
import { Button } from "@/components/ui/button";
import { GitHubIcon, GoogleIcon } from "@/components/ui/CustomIcons";
import { cn } from "@/lib/utils";
import { Github, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps{
    text:string;
    variant?:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    className?:string

}

export function GoogleAuthButton(){

    const {pending} = useFormStatus();
    return <>
    {
        pending?<Button disabled variant={'outline'} className="w-full ">
            <Loader2 className="size-4 animate-spin "/> please wait!</Button>:
            <Button variant={'outline'} type="submit" className="w-full"><GoogleIcon/> Sign in with Google</Button>
    }
    </>
}

export function SubmitButton({text,variant,className}:SubmitButtonProps){
    const {pending} = useFormStatus();

    return(
        <>
            {
                pending ? (
                    <Button disabled variant={'outline'} className={cn('w-full',className)}>
                        <Loader2 className="size-4 mr-2 animate-spin"/> Please wait...
                    </Button>
                ):(
                    <Button variant={variant} type="submit" className={cn('w-full',className)}>{text}</Button>
                )
            }
        </>
    )
}
export function  GithubAuthButton(){

    const {pending} = useFormStatus();
    return <>
    {
        pending?<Button disabled variant={'outline'} className="w-full">
            <Loader2 className="size-4 animate-spin "/> please wait!</Button>:
            <Button variant={'outline'} type="submit" className="w-full"><GitHubIcon/> Sign in with Github</Button>
    }
    </>

}