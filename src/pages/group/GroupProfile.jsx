import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DashLg, PencilSquare, Trash } from 'react-bootstrap-icons'
import { Drawer, Tabs } from 'antd'
import { IconButton } from '../../UI/IconButton.style'
import { changeUpdateGroupData } from '../../redux/groupsSlice'
import AddGroupForm from './AddGroupForm'
import GroupAttendance from './GroupAttendances'

export default function GroupProfile () {
  const { groupData } = useSelector(state => state.groups)
  const [editingGroup, setEditingGroup] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState('add')
  const dispatch = useDispatch()
  const onEditGroup = group => {
    setModalType('update')
    setVisible(true)
    setEditingGroup({ ...group })
  }

  const changeUpdateGroupDataFunc = data => {
    dispatch(changeUpdateGroupData(data))
  }

  return (
    <>
      <Drawer
        open={visible}
        title={
          modalType === 'add' ? 'Добавить новую группу' : 'Изменить группу'
        }
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddGroupForm
          changeUpdateGroupDataFunc={changeUpdateGroupDataFunc}
          modalType={modalType}
          editingGroup={editingGroup}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <div className='text-xl mb-8 bg-white p-4 rounded-lg'>
        {groupData?.name}
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='flex flex-col drop-shadow-md hover:drop-shadow-2xl transition col-span-1'>
          <div className='absolute top-4 right-4'>
            <div className='flex flex-col gap-2'>
              <IconButton
                color='primaryOutlined'
                onClick={() => {
                  onEditGroup(groupData)
                }}
              >
                <PencilSquare />
              </IconButton>
              <IconButton color='dangerOutlined'>
                <Trash />
              </IconButton>
            </div>
          </div>
          <div className='bg-white p-8'>
            <span className='text-white bg-cyan-400 px-4 py-2 rounded-md'>
              {groupData?.name}
            </span>
            <div className='grid mb-2 md:mb-4 mt-4'>
              <label className='text-slate-600'>Цена:</label>
              {groupData?.price == null ? (
                'Не установлен'
              ) : (
                <p>{groupData?.price} UZS</p>
              )}
            </div>
            <div className='grid mb-2 md:mb-4'>
              <label className='text-slate-600'>Время:</label>
              <p>{groupData?.time?.time}</p>
            </div>
            <div className='grid mb-2 md:mb-4'>
              <label className='text-slate-600'>Кабинеты:</label>
              <p>{groupData?.room?.name}</p>
            </div>
            <div className='grid mb-2 md:mb-4'>
              <label className='text-slate-600'>Даты обучения:</label>
              <div className='flex items-center flex-wrap text-xs gap-1'>
                <span>{groupData?.group_start_date} </span>
                <DashLg />
                <span> {groupData?.group_end_date}</span>
              </div>
            </div>
            <div className='grid mb-2 md:mb-4 p-4 border drop-shadow-md'>
              <label className='text-slate-600'>
                Дата ближайшего списания оплаты: 11.11.2022
              </label>
            </div>
            <hr />
            <div className='grid text-xs py-4 gap-1'>
              <div className='flex justify-between flex-wrap'>
                <span className='bg-slate-100 rounded-md p-1'>Ali Akbarov</span>
                <span className='p-1'>93 370 00 00</span>
              </div>
              <div className='flex justify-between flex-wrap'>
                <span className='bg-slate-100 rounded-md p-1'>
                  Umar Akbarov
                </span>
                <span className='p-1'>93 370 77 77</span>
              </div>
            </div>
          </div>
        </div>
        <Tabs className='col-span-1 lg:col-span-2'>
          <Tabs.TabPane tab='Посещаемость' key='item-1'>
            <div className='grid gap-2'>
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
                {
                  groupData?.active ? (
                    <div className='bg-white rounded-md px-6 py-4 overflow-x-auto '>
                      <GroupAttendance />
                    </div>
                  ) : (
                    <div className='text-center shadow-md rounded-md flex flex-wrap gap-4 bg-pink-200 p-4 justify-between items-center'>
                      Группа не активна
                    </div>
                  )
                }
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='История' key='item-2'>
            <div className='rounded-sm flex flex-wrap gap-4 bg-pink-200 p-4 justify-between items-center'>
              Ничего не найдено
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  )
}
