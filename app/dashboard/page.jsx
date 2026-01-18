import React from 'react'
import {requireUser} from '../lib/hooks';


export default async function DashboardPage(){

  const session = await requireUser()
  console.log(session)
  return (
    <div className='bg-muted/40 '>DashboardPage</div>
  )
}
