import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const session = await requireUser();
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    if(!code){
        return Response.json('Hey you did not get a code',{
            status:400
        })
    }

    try{

        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret:nylasConfig.apiKey,
            clientId:nylasConfig.clientId,
            redirectUri:nylasConfig.redirectUri,
            code
        });
        const {grantId,email} = response;
        await prisma.user.update({
            where:{
                id:session.user?.id,
            },
            data:{
                grantId,
                grantEmail:email
            }
        })

    }catch(error){
        console.log('something went wrong', error)
    }

    redirect('/dashboard')
}
