import { SettingsForm } from '@/app/components/SettingsForm'
import { requireUser } from '@/app/lib/hooks'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'

const getData = async(id:string)=>{
  const data = await prisma.user.findUnique({
    where:{
      id
    },
    select:{
      name:true,
      email:true,
      image:true,

    }
  })

  if(!data){
    return notFound();
  }
  return data
}

const SettingsRoute = async() => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <div>
      <SettingsForm  email={data.email as string} 
      fullName={data.name as string} profileImage={data.image as string} />
    </div>
  )
}

export default SettingsRoute