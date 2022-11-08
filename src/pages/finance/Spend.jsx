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
      date: '01.10.2022',
      type: 'Oylik',
      name: 'Ish haqi',
      receiver: 'mchj',
      sum: 500.0,
      employee: 'Bahrom Nazarov'
    },
    {
      id: 2,
      date: '01.10.2022',
      type: 'Oylik',
      name: 'Ish haqi',
      receiver: 'mchj',
      sum: 500.0,
      employee: 'Bahrom Nazarov'
    },
    {
      id: 3,
      date: '01.10.2022',
      type: 'Maosh',
      name: 'Ish haqi',
      receiver: 'mchj',
      sum: '3.000.000',
      employee: 'Bahrom Nazarov'
    }
  ])

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
      title: 'Sana',
      dataIndex: 'date',
      fixed: 'top',
      ...getColumnSearchProps('date')
    },
    {
      key: 2,
      title: 'Turkum',
      dataIndex: 'type',
      width: 140,
      fixed: 'top',
      ...getColumnSearchProps('type')
    },
    {
      key: 3,
      title: 'Nom',
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
      title: 'Oluvchi',
      dataIndex: 'receiver',
      fixed: 'top',
      ...getColumnSearchProps('receiver')
    },
    {
      key: 6,
      title: 'Hodim',
      dataIndex: 'employee',
      fixed: 'top',
      ...getColumnSearchProps('employee')
    },
    {
      key: 7,
      title: 'Amallar',
      fixed: 'top',
      render: record => {
        return (
          <span
            className='cursor-pointer text-red-500'
            onClick={() => {
              onDeleteStudent(record)
            }}
          >
            O'chirish
          </span>
        )
      }
    }
  ]
  const onDeleteStudent = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q",
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
        })
      }
    })
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }
  // Add a new teacher
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Yechib olinish</span>
      </Divider>
      <div className='mb-8 text-xl flex flex-col justify-start items-start bg-white rounded-2xl p-6 lg:p-12 flex-wrap space-y-4'>
        <span>Jami yechib olinishlar:</span>
        <span className='text-2xl font-bold lg:text-4xl'>10.900.000 so'm</span>
        <span>(01.10.2022 - 31.10.2022)</span>
      </div>
      <div className='flex flex-wrap gap-4'>
        <Button onClick={handleModal} className='w-auto'>
          Harajatlar qo'shish
        </Button>
        <DatePicker.RangePicker size={12} format='YYYY-MM-DD' />
      </div>
      {/* This modal for adding a new student */}
      <Modal
        title="Harajatlar qo'shish"
        visible={openModal}
        okText={<span className='text-sky-500 hover:text-white'>Qo'shish</span>}
        onCancel={() => {
          handleModal()
        }}
      >
        <Input placeholder='Ism Familiya' className='mb-2' />
        <Input placeholder='Email' className='mb-2' />
        <Input
          addonBefore='+998'
          placeholder='Telefon raqam'
          className='mb-2'
        />
      </Modal>
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
