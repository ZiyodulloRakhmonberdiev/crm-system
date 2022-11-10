import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Table, Modal, Drawer, Pagination } from 'antd'
import { PencilSquare, Trash, MicrosoftTeams } from 'react-bootstrap-icons'

import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'
import AddTeacherForm from './AddTeacherForm'
import { v4 as uuidv4 } from 'uuid'
import {
  fetchingTeachers,
  fetchedTeachers,
  fetchedError,
  setTeachersData
} from '../../redux/teachersSlice'

export default function Teachers () {
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [visible, setVisible] = useState(false)

  const [modalType, setModalType] = useState('add')
  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)

  const dispatch = useDispatch()
  const { teachers, loading, refreshTeachers } = useSelector(
    state => state.teachers
  )

  // teachers static data
  let dataSource = []
  teachers?.map(item => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: (
        <Link
          to={`/teachers/profile/${item?.id}`}
          onClick={() => dispatch(setTeachersData(item))}
        >
          {item?.name}
        </Link>
      ),
      phone: item?.phone?.toLocaleString(),
      gender: item?.gender,
      salary_percentage: item?.salary_percentage,
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primary'
            onClick={() => {
              onEditTeacher(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='danger'
            onClick={() => {
              onDeleteTeacher(item)
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
      title: '',
      dataIndex: 'id',
      width: 80
    },
    {
      key: '2',
      title: 'Имя',
      dataIndex: 'name',
      fixed: 'top'
    },
    {
      key: '3',
      title: 'Телефон',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Зарплата',
      dataIndex: 'salary_percentage',
      fixed: 'top'
    },
    {
      key: '5',
      title: 'Действие',
      width: 120,
      dataIndex: 'actions'
    }
  ]
  // Actions with table
  const onDeleteTeacher = record => {
    Modal.confirm({
      title: 'Вы уверены что хотите удалить?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена'
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(teacher => teacher.id !== record.id)
      //   })
      // }
    })
  }

  const onEditTeacher = teacher => {
    setModalType('update')
    setVisible(true)
    setEditingTeacher({ ...teacher })
  }

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers())
    axios
      .get(`/api/teachers?page=${currentPage}`)
      .then(res => {
        dispatch(fetchedTeachers(res?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshTeachers, currentPage])
  return (
    <div>
      <header className='bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8'>
        <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
          <MicrosoftTeams />
        </div>
        <div className='md:flex md:gap-4 items-center'>
          <p className='text-violet-400 text-2xl'>Учителя</p>
          <p className='text-violet-400'>Количество: {teachers.length}</p>
        </div>
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType('add')
          }}
          className='md:ml-auto'
        >
          Добавить
        </MyButton>
      </header>
      <Drawer
        open={visible}
        title={
          modalType === 'add'
            ? 'Добавить нового учителя'
            : 'Редактирование учителя'
        }
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddTeacherForm
          modalType={modalType}
          editingTeacher={editingTeacher}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000
        }}
        pagination={false}
        rowKey={record => record.uid}
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
