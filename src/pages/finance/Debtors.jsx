import { Table, Modal, Input, Select } from 'antd'
import { useState } from 'react'
import { CashStack, Chat, ExclamationCircle } from 'react-bootstrap-icons'
export default function Debtors () {
  // Search functions which is in the heading on the page
  const [searchText, setSearchText] = useState('')
  const [searchDebet, setSearchDebet] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'Umar Abdulazizov',
      course: ['android', 'english'],
      comment: "Shu oy to'laydi",
      phone: '88 855 86 85',
      debet: '500.00'
    },
    {
      id: 2,
      name: 'Yoqub Abdulazizov',
      course: ['android', 'english'],
      comment: "Shu oy to'laydi",
      phone: '88 855 13 49',
      debet: '1500.00'
    },
    {
      id: 3,
      name: 'Temur Abdulazizov',
      course: ['android', 'english'],
      comment: "Shu oy to'laydi",
      phone: '88 855 86 85',
      debet: '500.00'
    },
    {
      id: 4,
      name: 'Jahongir Abdulazizov',
      course: ['android', 'english'],
      comment: "Shu oy to'laydi",
      phone: '88 855 86 85',
      debet: '500.00'
    }
  ])

  // Table headers
  const columns = [
    {
      key: '2',
      title: 'Ism',
      dataIndex: 'name',
      fixed: 'top',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.email)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.phone)
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      }
    },
    {
      key: '4',
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '5',
      title: 'Kurslari',
      dataIndex: 'course',
      fixed: 'top',
      render: record => {
        return (
          <div className='flex gap-1 flex-wrap'>
            {record.map(c => (
              <span className='border rounded-sm text-xs border-violet-400 p-0.5'>
                {c}
              </span>
            ))}
          </div>
        )
      }
    },
    {
      key: '6',
      title: 'Qarz miqdori',
      dataIndex: 'debet',
      fixed: 'top',
      filteredValue: [searchDebet],
      onFilter: (value, record) => {
        return String(record.debet)
          .toLowerCase()
          .includes(value.toLowerCase())
      }
    },
    {
      key: '7',
      title: 'Izoh',
      dataIndex: 'comment',
      fixed: 'top'
    },
    {
      key: '8',
      title: 'Amallar',
      render: record => {
        return (
          <button
            className='flex items-center rounded-full p-2 relative hover:pl-9 lg:pl-9 hover:bg-violet-500 transition-all w-0 hover:w-auto lg:w-auto lg:bg-violet-400 outline-none'
            onClick={() => {
              onEditStudent(record)
            }}
          >
            <span className='p-2 rounded-full bg-white flex items-center justify-center mr-2 absolute -left-px inset-y-0 border border-violet-400'>
              <Chat className='text-violet-500' />
            </span>
            <span className='text-white text-xs'>Izoh qoldirish</span>
          </button>
        )
      },
      fixed: 'top'
    }
  ]

  const onEditStudent = record => {
    setIsEditing(true)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingStudent(null)
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='bg-white flex flex-col p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-red-400 bg-red-50 p-2 rounded-md'>
            <ExclamationCircle />
          </div>
          <p className='text-red-400 my-4'>Jami qarzdor o'quvchilar soni</p>
          <p className='text-red-400 text-2xl'>3 ta</p>
        </div>
        <div className='bg-white flex flex-col p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-slate-400 bg-slate-50 p-2 rounded-md'>
            <CashStack />
          </div>
          <p className='text-slate-400 my-4'>Jami qarzlar miqdori</p>
          <p className='text-slate-500 text-2xl'>4 600.000 so'm</p>
        </div>
      </div>
      <header className='flex flex-wrap gap-2 mb-8'>
        <div className='w-42 sm:mr-8'>
          <Input.Search
            placeholder='Ism yoki telefon orqali qidirish'
            onSearch={value => {
              setSearchText(value)
            }}
            onChange={e => {
              setSearchText(e.target.value)
            }}
            allowClear
            className='min-w-[200px] md:min-w-[250px]'
          />
        </div>
        <div className='w-42 sm:mr-8'>
          <Input.Search
            placeholder="Qarz miqdori bo'yicha qidirish"
            onSearch={value => {
              setSearchDebet(value)
            }}
            onChange={e => {
              setSearchDebet(e.target.value)
            }}
            allowClear
            className='min-w-[200px] md:min-w-[250px]'
          />
        </div>
      </header>
      <Table
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{
          x: 850,
          y: 400
        }}
      ></Table>
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText='Saqlash'
        cancelText='Yopish'
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setDataSource(pre => {
            return pre.map(student => {
              if (student.id === editingStudent.id) {
                return editingStudent
              } else {
                return student
              }
            })
          })
          resetEditing()
        }}
      >
        <Input
          value={editingStudent?.comment}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, comment: e.target.value }
            })
          }}
        />
      </Modal>
    </div>
  )
}
