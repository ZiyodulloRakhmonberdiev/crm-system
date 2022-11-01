import { Divider, DatePicker } from 'antd'

export default function Messages () {
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Yuborilgan xabarlar</span>
      </Divider>
      <div>
        <DatePicker></DatePicker>
        <DatePicker></DatePicker>
      </div>
      <div className='flex flex-col mt-4'>
        <div className='p-4 flex justify-between items-start mb-2 rounded-lg bg-white'>
          <span className='border mr-2 rounded-lg text-blue-500 p-1'>
            System:
          </span>
          <span className='w-2/3'>
            Hurmatli Aslonov Firdavs. Siz o‘quv guruhiga qo‘shildingiz.
            O'qituvchi: Umida Teacher O'quv kunlari: Пн, Ср, Пт Vaqt: 18:00
            Kabinet: Tesla Sizni demo schoolda kutamiz!
          </span>
          <div className='flex items-center gap-2'>
            <span className='border rounded-lg text-red-500 p-1'>
              1 oluvchi
            </span>
            <span>14.10.2022 10:42</span>
          </div>
        </div>
        <div className='p-4 flex justify-between items-start mb-2 rounded-lg bg-white'>
          <span className='border mr-2 rounded-lg text-blue-500 p-1'>
            System:
          </span>
          <span className='w-2/3'>
            Hurmatli Aslonov Firdavs. Siz o‘quv guruhiga qo‘shildingiz.
            O'qituvchi: Umida Teacher O'quv kunlari: Пн, Ср, Пт Vaqt: 18:00
            Kabinet: Tesla Sizni demo schoolda kutamiz!
          </span>
          <div className='flex items-center gap-2'>
            <span className='border rounded-lg text-red-500 p-1'>
              1 oluvchi
            </span>
            <span>14.10.2022 10:42</span>
          </div>
        </div>
        <div className='p-4 flex justify-between items-start mb-2 rounded-lg bg-white'>
          <span className='border mr-2 rounded-lg text-blue-500 p-1'>
            System:
          </span>
          <span className='w-2/3'>
            Hurmatli Aslonov Firdavs. Siz o‘quv guruhiga qo‘shildingiz.
            O'qituvchi: Umida Teacher O'quv kunlari: Пн, Ср, Пт Vaqt: 18:00
            Kabinet: Tesla Sizni demo schoolda kutamiz!
          </span>
          <div className='flex items-center gap-2'>
            <span className='border rounded-lg text-red-500 p-1'>
              1 oluvchi
            </span>
            <span>14.10.2022 10:42</span>
          </div>
        </div>
      </div>
    </div>
  )
}
