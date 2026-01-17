'use client'
import { Button } from "@/components/ui/button";
import { GitHubIcon, GoogleIcon } from "@/components/ui/CustomIcons";
import { Github, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function GoogleAuthButton(){

    const {pending} = useFormStatus();
    return <>
    {
        pending?<Button disabled variant={'outline'} className="w-full">
            <Loader2 className="size-4 animate-spin "/> please wait!</Button>:
            <Button variant={'outline'} type="submit" className="w-full"><GoogleIcon/> Sign in with Google</Button>
    }
    </>

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