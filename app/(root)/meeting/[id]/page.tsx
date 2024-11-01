'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useGetCallBuyId } from '@/hooks/useGetCallById'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import Loader from '@/components/Loader'

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallBuyId(id)
  const { isLoaded } = useUser()

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete
            ? <MeetingRoom />
            : <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
