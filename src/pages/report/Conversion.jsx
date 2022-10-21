import { Divider, DatePicker } from 'antd'

export default function Conversion () {
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Konversiya hisoboti</span>
      </Divider>
      <div>
        <DatePicker></DatePicker>
        <DatePicker></DatePicker>
      </div>
      <div className='flex flex-col bg-white w-1/2 mt-4'>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>Yangi arizalar:</span>
          <span>520</span>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>Kirish darsiga kelganlar:</span>
          <span>80</span>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>Qayta aloqaga chiqildi:</span>
          <span>38</span>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>
            Kirish darsidan so'ng to'lov qildi:
          </span>
          <span>12</span>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>Yangi arizalar:</span>
          <span>520</span>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4 text-lg border-b'>
          <span className='text-right'>Yangi arizalar:</span>
          <span>520</span>
        </div>
      </div>
    </div>
  )
}
