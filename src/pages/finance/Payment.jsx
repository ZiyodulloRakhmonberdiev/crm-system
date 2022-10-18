import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  Card,
  DatePicker,
  Divider,
  Select,
  Space,
  Table
} from 'antd'
import Highlighter from 'react-highlight-words'
import { useRef, useState } from 'react'

export default function Payment () {
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef(null)
  const [searchedColumn, setSearchedColumn] = useState('')

  // Table dataSource
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'Anvar Akbarxodjaev',
      date: '01.10.2022',
      sum: 500.0,
      paymentMethods: 'Cash'
    },
    {
      id: 2,
      name: 'Akmal Akbarxodjaev',
      date: '01.10.2022',
      sum: 500.0,
      paymentMethods: 'Click'
    },
    {
      id: 3,
      name: 'Iqbol Akbarxodjaev',
      date: '01.10.2022',
      sum: 500.0,
      paymentMethods: 'Payme'
    }
  ])

  const paymentMethods = [
    'Naqd',
    'Click',
    'Bank hisobi',
    'Apelsin',
    'Payme',
    'Karta orqali'
  ]
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div
        style={{
          padding: 8
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  // Table headers
  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      fixed: 'top'
    },
    {
      key: 2,
      title: 'Sana',
      dataIndex: 'date',
      width: 140,
      fixed: 'top',
      ...getColumnSearchProps('date')
    },
    {
      key: 3,
      title: 'Ism',
      dataIndex: 'name',
      fixed: 'top',
      ...getColumnSearchProps('name')
    },
    {
      key: 4,
      title: 'Sum',
      dataIndex: 'sum',
      fixed: 'top',
      ...getColumnSearchProps('sum')
    },
    {
      key: 5,
      title: `To'lov turi`,
      dataIndex: 'paymentMethods',
      fixed: 'top',
      ...getColumnSearchProps('paymentMethods')
    }
  ]
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Barcha to'lovlar</span>
      </Divider>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
        <div className='w-full text-xl flex flex-col justify-start items-start bg-white rounded-2xl p-6 lg:p-12 flex-wrap space-y-4'>
          <span>To'lovlar miqdori:</span>
          <span className='text-2xl font-bold lg:text-4xl'>
            52.555.000 so'm
          </span>
          <span>(01.10.2022 - 31.10.2022)</span>
        </div>
        <div
          hoverable={false}
          className='w-full text-xl flex flex-col justify-start items-start bg-white rounded-2xl p-8 lg:p-12 flex-wrap space-y-4'
        >
          <span>Sof foyda miqdori:</span>
          <span className='text-2xl font-bold lg:text-4xl'>6.555.000 so'm</span>
          <span>(01.10.2022 - 31.10.2022)</span>
        </div>
      </div>
      <header className='flex gap-2'>
        <Select mode='tabs' placeholder='Guruhlar holati' allowClear>
          {paymentMethods.map((course, index) => {
            return (
              <Select.Option key={index} value={course}>
                {course}
              </Select.Option>
            )
          })}
        </Select>
        <DatePicker.RangePicker size={12} format='YYYY-MM-DD' />
      </header>
      <Table
        className='mt-6'
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 850,
          y: 400
        }}
      ></Table>
    </div>
  )
}
