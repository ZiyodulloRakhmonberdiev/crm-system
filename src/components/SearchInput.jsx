import { Input } from 'antd'
export default function SearchInput () {
  const { Search } = Input
  return (
    <Search
      placeholder='Qidirish...'
      className='lg:ml-2'
      allowClear={true}
      style={{ maxWidth: 250 }}
    />
  )
}
