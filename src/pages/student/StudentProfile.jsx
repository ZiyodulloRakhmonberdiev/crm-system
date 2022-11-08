import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tabs, Table, Modal, Select, DatePicker, message, Spin } from 'antd'
import {
  CashStack,
  Envelope,
  Flag,
  TelephoneFill,
  Trash
} from 'react-bootstrap-icons'

import { EditOutlined, TeamOutlined } from '@ant-design/icons'
import { IconButton } from '../../UI/IconButton.style'
import { fetchedGroups, fetchingGroups } from '../../redux/groupsSlice'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { setUserGroupData } from '../../redux/studentsSlice'
import { useParams } from 'react-router-dom'

export default function StudentProfile () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { userData, userGroupData, refreshStudentsData } = useSelector(
    state => state.students
  )
  const params = useParams()
  const { groups } = useSelector(state => state.groups)
  const dispatch = useDispatch()
  const url = '/api/groups/add-student'

  const [group, setGroup] = useState({
    group_id: null,
    start_date: '',
    student_id: userData.id
  })
  const columns = [
    {
      key: '1',
      title: 'Sana',
      dataIndex: 'id',
      fixed: 'top'
    },
    {
      key: '2',
      title: 'Miqdor',
      dataIndex: 'name',
      fixed: 'top'
    },
    {
      key: '3',
      title: 'Izoh',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Hodim',
      dataIndex: 'address',
      fixed: 'top'
    }
  ]
  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups())
    axios.get(`/api/groups`).then(res => {
      dispatch(fetchedGroups(res?.data?.data?.data))
    })
  }, [])

  function submit (e) {
    e.preventDefault()
    const { group_id, start_date } = group
    if (group_id && start_date) {
      setUploading(true)
      axios
        .post(url, {
          group_id: group.group_id,
          student_id: params.id,
          start_date: group.start_date
        })
        .then(() => {
          setGroup({
            group_id: '',
            start_date: ''
          })
          message.success("Foydalanuvchi muvaffaqiyatli qo'shildi")
          dispatch(refreshStudentsData())
        })
        .catch(err => {
          console.log(err)
          if (err.response.data.data.student_id) {
            message.error('Этот студент уже есть в этой группе!')
          } else {
            message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
          }
        })
        .finally(() => setUploading(false))
    } else {
      message.error("Barcha maydonni to'ldiring!")
    }
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const compareDate = (d1, d2) => {
    let now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();
    if (month < 10) 
    month = "0" + month;
    if (day < 10) 
    day = "0" + day;
    let today = now.getFullYear() + '-' + month + '-' + day;
    
    let date1 = new Date(d1).getTime()
    let date2 = new Date(today).getTime()
    let date3 = new Date(d2).getTime()

    if (date1 >= (date2 + 100000000) || date1 < date3) return true 
  }

  return (
    <div className='grid grid-cols-6 gap-12'>
      <div className='col-span-6 md:col-span-2'>
        <p className='text-xl mb-4'>
          {userData?.first_name} {userData?.last_name}
        </p>
        <div className='rounded-sm bg-white px-6 py-8 drop-shadow-md'>
          <div className='grid mb-2 md:mb-4'>
            <label className='text-xl mb-2'>
              {userData?.first_name} {userData?.last_name}
            </label>
            <p className='text-slate-400 text-xs'>(id: {userData?.id})</p>
          </div>
          <div className='grid mb-2 md:mb-4'>
            <label className='mb-2'>Balans</label>
            <p className='text-red-400'>
              {userData?.balance ? userData?.balance : 'Информация не введена'}
            </p>
          </div>
          <div className='grid mb-2 md:mb-4'>
            <label className='mb-2'>Aloqa vositalari</label>
            <div>
              <p className='text-xs mb-1'>Telefon:</p>
              <span className='text-xs border border-green-400 rounded-sm p-1 flex items-center justify-center gap-1 w-36'>
                <TelephoneFill className='text-green-400' />
                {userData?.phone}
              </span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <IconButton color='success'>
              <EditOutlined />
            </IconButton>
            <IconButton color='primary'>
              <Envelope />
            </IconButton>
            <IconButton color='success'>
              <CashStack />
            </IconButton>
            <IconButton color='primary' onClick={showModal}>
              <TeamOutlined />
            </IconButton>
            <IconButton color='success'>
              <Flag />
            </IconButton>
            <IconButton color='danger'>
              <Trash />
            </IconButton>
          </div>
        </div>
      </div>
      <Modal
        title='Добавить студента в группу'
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Select
          value={group?.group_id}
          onChange={e => {
            setGroup({ ...group, group_id: e })
          }}
          placeholder='Выберите группу'
          className='w-full mb-1'
          showSearch={true}
        >
          {groups.map((item, index) => {
            return (
              <Select.Option value={item?.id} key={index}>
                <button
                  onClick={() => {
                    dispatch(setUserGroupData(item))
                  }}
                >
                  {item.name}
                </button>
              </Select.Option>
            )
          })}
        </Select>
        <div>
          {group.group_id && (
            <p className='mb-4 text-xs'>
              Дата начала группы {userGroupData?.group_start_date}
            </p>
          )}
        </div>
        <div className='w-full mb-4'>
          {group.group_id && (
            <DatePicker
              className='w-full'
              onChange={(date, dateString) => {
                setGroup({ ...group, start_date: dateString })
              }}
              disabledDate={(currentDate) => compareDate(currentDate.toDate(), userGroupData?.group_start_date)}
            />
          )}
        </div>
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary' onClick={submit}>
            Добавить
          </MyButton>
        </Spin>
      </Modal>
      <Tabs className='col-span-6 md:col-span-4'>
        <Tabs.TabPane tab='Profil' key='item-1'>
          <label className='text-lg block w-full mb-2'>Группы</label>
          <div className='grid gap-2 mb-4'>
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
          <label className='text-lg block w-full'>Платежи</label>
          <Table columns={columns} className='overflow-auto mt-2'></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tarix' key='item-2'>
          <div className='bg-orange-50 p-4'>Qaydlar mavjud emas</div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
