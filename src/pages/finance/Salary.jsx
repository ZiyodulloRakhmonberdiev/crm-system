import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, DatePicker, Divider, Space, Table, Modal } from 'antd'
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
      employee: 'Sardorov Akmal',
      job: "O'qituvchi",
      group: 'Android',
      students: '120',
      lessons: '45',
      sum: 500.0
    },
    {
      id: 2,
      employee: 'Sardorov Akmal',
      job: "O'qituvchi",
      group: 'Android',
      students: '120',
      lessons: '45',
      sum: 500.0
    },
    {
      id: 3,
      employee: 'Sardorov Akmal',
      job: "O'qituvchi",
      group: 'Android',
      students: '120',
      lessons: '45',
      sum: 500.0
    },
    {
      id: 4,
      employee: 'Sardorov Akmal',
      job: "O'qituvchi",
      group: 'Android',
      students: '120',
      lessons: '45',
      sum: 500.0
    }
  ])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }
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
      title: 'Hodim',
      dataIndex: 'employee',
      fixed: 'top',
      ...getColumnSearchProps('employee')
    },
    {
      key: 2,
      title: 'Kim',
      dataIndex: 'job',
      fixed: 'top',
      ...getColumnSearchProps('job')
    },
    {
      key: 3,
      title: 'Guruhlar',
      dataIndex: 'group',
      fixed: 'top',
      ...getColumnSearchProps('group')
    },
    {
      key: 4,
      title: "O'quvchilar",
      dataIndex: 'students',
      fixed: 'top',
      ...getColumnSearchProps('students')
    },
    {
      key: 5,
      title: 'Darslar soni',
      dataIndex: 'lessons',
      fixed: 'top',
      ...getColumnSearchProps('lessons')
    },
    {
      key: 6,
      title: 'Sum',
      dataIndex: 'sum',
      fixed: 'top',
      ...getColumnSearchProps('sum')
    }
  ]
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Oylik maosh</span>
      </Divider>
      <div className='flex flex-wrap gap-4'>
        Saralash
        <DatePicker.RangePicker size={12} format='YYYY-MM-DD' />
      </div>
      {/* This modal for adding a new student */}
      <Table
        className='mt-6'
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 850
        }}
      ></Table>
    </div>
  )
}
