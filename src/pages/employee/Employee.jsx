import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Table, Modal, Drawer, Pagination } from 'antd'
import {
  PencilSquare,
  Trash,
  MicrosoftTeams,
  Layers
} from 'react-bootstrap-icons'

import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'
import AddEmployeeForm from './AddEmployeeForm'
import { v4 as uuidv4 } from 'uuid'
import {
  fetchingEmployees,
  fetchedEmployees,
  fetchedError,
  setEmployeesData
} from '../../redux/employeesSlice'

export default function Employees () {
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [visible, setVisible] = useState(false)

  const [modalType, setModalType] = useState('add')
  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)

  const dispatch = useDispatch()
  const { employees, loading, refreshEmployees } = useSelector(
    state => state.employees
  )

  // employees static data
  let dataSource = []
  employees?.map(item => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: item?.name,
      file: item?.file,
      name: (
        <Link
          to={`/employees/profile/${item?.id}`}
          onClick={() => dispatch(setEmployeesData(item))}
        >
          {item?.name}
        </Link>
      ),
      role: (
        <div className='flex flex-wrap gap-2'>
          {item?.role?.map((role) => (
          <>
            <span className='px-2 py-1 rounded-md bg-slate-200 text-xs text-gray-500  capitalize'>{role}</span>
          
          </>
        ))}
        </div>
      ),
      phone: item?.phone?.toLocaleString(),
      gender: item?.gender,
      salary: item?.salary,
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primary'
            onClick={() => {
              onEditEmployee(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='danger'
            onClick={() => {
              onDeleteEmployee(item)
            }}
          >
            <Trash />
          </IconButton>
        </div>
      )
    })
  })

  // Table headers
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 80
    },
    {
      key: '2',
      title: 'Ism',
      dataIndex: 'name',
      fixed: 'top',
      width: 250
    },
    {
      key: '3',
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Rollar',
      dataIndex: 'role',
      fixed: 'top'
    },
    {
      key: '5',
      title: 'Amallar',
      width: 120,
      dataIndex: 'actions'
    }
  ]
  // Actions with table
  const onDeleteEmployee = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q"
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(employee => employee.id !== record.id)
      //   })
      // }
    })
  }

  const onEditEmployee = employee => {
    setModalType('update')
    setVisible(true)
    setEditingEmployee({ ...employee })
  }

  // fetching employees
  useEffect(() => {
    dispatch(fetchingEmployees())
    axios
      .get(`/api/employees?page=${currentPage}`)
      .then(res => {
        dispatch(fetchedEmployees(res?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshEmployees, currentPage])
  return (
    <div>
      <div className='bg-white flex flex-col md:flex-row p-4 rounded-lg items-center justify-start gap-4'>
        <div className='text-2xl text-blue-400 bg-blue-50 p-2 rounded-md'>
          <Layers />
        </div>
        <p className='text-blue-400 text-2xl'>Hodimlar</p>
        <p className='text-blue-400'>Jami: {employees.length} ta</p>
      </div>
      <div className='flex justify-end'>
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType('add')
          }}
          className='my-4'
        >
          Yangi Hodim qo'shish
        </MyButton>
      </div>
      <Drawer
        open={visible}
        title={
          modalType === 'add' ? "Yangi hodim qo'shish" : 'Hodimni yangilash'
        }
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddEmployeeForm
          modalType={modalType}
          editingEmployee={editingEmployee}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
          y: 400
        }}
        pagination={false}
        rowKey={record => record.uid}
        
        size="small"
      ></Table>
      <br />
      <center>
        <Pagination
          pageSize={per_page ? per_page : 30}
          total={last_page * per_page}
          current={currentPage}
          onChange={(page, x) => {
            setCurrentPage(page)
            setPerPage(x)
          }}
        />
      </center>
    </div>
  )
}
