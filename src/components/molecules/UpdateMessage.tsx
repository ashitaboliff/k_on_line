'use client'

import updateInfo from '@/static'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import { useState, useRef } from 'react'

const UpdateMessage = () => {
  const ReadMePopupRef = useRef<PopupRef>(undefined)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  const textNewLineFormat = (text: string) => {
    return text.split('\n').map((str, index) => {
      return (
        <span key={index}>
          {str}
          <br />
        </span>
      )
    })
  }

  return (
    <div className='flex justify-center'>
      <div role="alert" className="alert alert-info w-80" onClick={() => setIsPopupOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current text-bg-white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className='text-sm text-bg-white'>アップデートのお知らせ:{updateInfo.title}</span>
      </div>
      <Popup
        ref={ReadMePopupRef}
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="アップデートのお知らせ"
      >
        <div className="text-center">
          <p className='text-lg'>{updateInfo.title}</p>
          <p>更新日時: {updateInfo.created_at}</p>
          <div className="mt-4">
            <p>{textNewLineFormat(updateInfo.content)}</p>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-outline"
              onClick={() => setIsPopupOpen(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default UpdateMessage