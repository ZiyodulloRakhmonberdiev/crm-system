import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Drawer, Pagination, Table } from 'antd'
import { PencilSquare, Trash, DoorOpen } from 'react-bootstrap-icons'

import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'
import AddRoomsForm from './AddRoomsForm'
import { v4 as uuidv4 } from 'uuid'
import {
  fetchingRooms,
  fetchedRooms,
  fetchedError
} from '../../redux/roomsSlice'

export default function Rooms () {
  const [editingRoom, setEditingRoom] = useState(null)
  const [visible, setVisible] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)

  const [modalType, setModalType] = useState('add')

  const dispatch = useDispatch()
  const { rooms, loading, refreshRooms } = useSelector(state => state.rooms)

  // rooms static data
  let dataSource = []
  rooms?.data?.map(item => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: item?.name,
      capacity: item?.capacity,
      branch_id: item?.id,
      room_id: item?.id,
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primaryOutlined'
            onClick={() => {
              onEditRoom(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='dangerOutlined'
            onClick={() => {
              onDeleteRoom(item)
            }}
          >
            <Trash />
          </IconButton>
        </div>
      )
    })
  })

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      render: record => {
        return <span className='pl-1'>{record}</span>
      }
    },
    {
      key: '2',
      title: 'Nomi',
      dataIndex: 'name',
      fixed: 'top'
    },
    {
      key: '3',
      title: "Xona sig'imi",
      dataIndex: 'capacity',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Amallar',
      fixed: 'top',
      width: 120,
      dataIndex: 'actions'
    }
  ]

  // Actions with table
  const onDeleteRoom = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q"
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(room=> room.id !== record.id)
      //   })
      // }
    })
  }

  const onEditRoom = room => {
    setModalType('update')
    setVisible(true)
    setEditingRoom({ ...room })
  }

  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms())
    axios
      .get(`/api/rooms`)
      .then(res => {
        dispatch(fetchedRooms(res?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshRooms])
  return (
    <div>
      <header className='bg-white flex flex-wrap flex-col md:flex-row p-4 rounded-lg items-center justify-start gap-4 mb-8'>
        <div className='text-2xl text-sky-400 bg-sky-50 p-2 rounded-md'>
          <DoorOpen />
        </div>
        <p className='text-sky-400 text-2xl'>Xonalar</p>
        <p className='text-sky-400'>Jami: {rooms?.data?.length} ta</p>
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType('add')
          }}
          className='md:ml-auto'
        >
          Yangi xona qo'shish
        </MyButton>
      </header>
      <Drawer
        open={visible}
        title={modalType === 'add' ? "Yangi xona qo'shish" : 'Xonani yangilash'}
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddRoomsForm
          modalType={modalType}
          editingRoom={editingRoom}
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
        className='overflow-auto'
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
