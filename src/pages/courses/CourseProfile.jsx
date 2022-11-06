import { useSelector } from 'react-redux'
import { Tabs } from 'antd'

export default function CourseProfile () {
  const { coursesData } = useSelector(state => state.courses)
  return (
    <div>
      <div className='text-xl mb-8'>{coursesData?.name}</div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='flex flex-col drop-shadow-md hover:drop-shadow-2xl transition col-span-1'>
          <div className='bg-pink-500 text-center text-xl text-white px-4 py-20 flex items-center justify-center hover:text-white'>
            {coursesData?.name}
          </div>
          <div className='bg-white p-8'>
            <div className='grid md:grid-cols-2 mb-2 md:mb-4'>
              <label className='text-slate-600'>Tavsif:</label>
              <p>{coursesData?.description}</p>
            </div>
            <div className='grid md:grid-cols-2 mb-2 md:mb-4'>
              <label className='text-slate-600'>Narxi:</label>
              <p>{coursesData?.price} so'm</p>
            </div>
            <div className='grid md:grid-cols-2 mb-2 md:mb-4'>
              <label className='text-slate-600'>Dars davomiyligi:</label>
              <p>{coursesData?.lesson_duration} daqiqa</p>
            </div>
            <div className='grid md:grid-cols-2 mb-2 md:mb-4'>
              <label className='text-slate-600'>Dars muddati:</label>
              <p>{coursesData?.month} oy</p>
            </div>
          </div>
        </div>
        <Tabs className='col-span-1 lg:col-span-2'>
          <Tabs.TabPane tab='Gurular' key='item-1'>
            <div className='grid gap-2'>
              <div className='rounded-sm flex flex-wrap gap-4 bg-orange-50 p-4 justify-between items-center'>
                <div className='grid gap-0.5'>
                  <div>
                    <span className='py-0.5 px-2 bg-orange-200 rounded-sm text-xs text-center'>
                      tesla
                    </span>
                  </div>
                  <span className='font-bold text-md'>Android 12-guruh</span>
                </div>
                <div className='grid gap-0.5 text-xs'>
                  <span>Toq kunlar</span>
                  <span>02.11.2022 - 12.12.2022</span>
                  <span>14:00</span>
                </div>
                <div>
                  <span className='bg-orange-500 rounded-sm text-white px-1 py-0.5'>
                    12
                  </span>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Materiallar' key='item-2'>
            <div className='rounded-sm flex flex-wrap gap-4 bg-pink-200 p-4 justify-between items-center'>
              Hech narsa topilmadi
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}
