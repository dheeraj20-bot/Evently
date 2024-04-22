import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {DeleteConfirmation} from './DeleteConfirmation'

type CardProps ={
    event:IEvent
    hasOrderLink?:boolean
    hideprice?:boolean
}


const Card = ({event,hasOrderLink,hideprice}:CardProps) => {
   const {sessionClaims} = auth();
   const userId = sessionClaims?.userId as string

   const isEventCreator = userId === event?.organizer?._id.toString()

 
  return (
    <div className='group flex relative min-h-[380px] w-full 
    max-w-[400px] flex-col rounded-xl overflow-hidden
     bg-white shadow-md transition-all hover:shadow-lg lg:min-h-[438px] '>
       <Link href={`/events/${event._id}`}
       style={{backgroundImage:`url(${event.imageUrl})`}}
       className='flex-center flex-grow bg-green-50 bg-cover bg-center text-grey-500'
       />
        {isEventCreator && !hideprice && (
          <div className=' absolute right-2 top-2
          shadow-sm transition-all flex flex-col  gap-4 rounded-xl
           bg-white p-3'>
            <Link href={`/events/${event._id}/update`}>
               <Image
               src="/assets/icons/edit.svg"
               alt='edit'
               width={20}
               height={20}
               />
            </Link>
            <DeleteConfirmation eventId={event._id}/>
          </div>
        )}
         <Link href={`/events/${event._id}`}
       className='flex min-h-[230px] flex-col  p-5 gap-3 md:gap-4'
       >
       { !hideprice && <div className='flex gap-2 '>
          <span className='p-semibold-14 w-min text-green-800 rounded-full bg-green-100 px-4 py-1'>
            {event.isFree?'FREE':`${event.price}`}
          </span>
          <p className=' p-semibold-14 w-fit rounded-full bg-gray-500/10 px-4 py-1 text-grey-500'>
            {event.category?.name}
          </p>
        </div>}
        <p 
        className='p-medium-16 p-medium-18 text-grey-500'
        >{formatDateTime(event.startDateTime).dateTime}</p>
        
        <p className='p-medium-16 md:p-medium-20
         line-clamp-2 flex-1 text-black'>{event.title}</p>
           
           <div className='flex-between w-full'>
             <p className='p-medium-14 md:p-medium-16 text-grey-600'>
              {event.organizer?.firstName} {event.organizer?.lastName}
              </p>

              {hasOrderLink && (
                <Link href={`/orders?eventId=${event._id}`}
                className='flex gap-2'
                >
                  <p
                  className='text-primary-500'
                  >Order Details</p>
                  <Image
                  src="/assets/icons/arrow.svg"
                  alt='search'
                  width={10}
                  height={10}
                  />
                </Link>
              )}
           </div>
 
       </Link>
       
    </div>
  )
}

export default Card