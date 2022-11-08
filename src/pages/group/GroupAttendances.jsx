import { Spin } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import axios from '../../axios/axios'
import { fetchedAtt, fetchingAtt, fetchingErrorAtt } from '../../redux/attendancesSlice'
moment.locale("ru")

const GroupAttendance = () => {
  const params = useParams()
  const { attendances, loading, error } = useSelector(state => state.attendances)
  const { groupData } = useSelector(state => state.groups)
  const [refreshing, setRefreshing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchingAtt())
    axios.get(`/api/groups/${params?.id}/attendance?from=${groupData?.group_start_date}&to=${groupData?.group_end_date}`)
      .then((res) => {
        dispatch(fetchedAtt(res.data))
      })
      .catch((err) => {
        dispatch(fetchingErrorAtt())
      })
  }, [refreshing])

  const handleSetAttendanceStudent = (attStatus, date, student_id, group_id) => {
    setUploading(true)
    axios.post("/api/groups/attendance", {
      student_id,
      
      group_id,
      status: attStatus,
      date
    })
    .then((res) => {
      console.log(res);
      setRefreshing(!refreshing)
    })
    .finally(() => setUploading(false))
  }

  const compareDate = (d1) => {
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

    return date1 > date2
  }

  if (error) return <center>Failed to fetch attendances!</center>
  return (
    <Spin spinning={loading}>
      <div className=''>
        <table className='overflow-auto'>
          <tr className=' overflow-auto flex bg-slate-100 px-2 py-1 rounded-md'>
            <th width="200" align='left'>Ism</th>
            {
              attendances?.days?.map((day) => (
                <th width="100">{moment(day?.data).format("DD MMM")}</th>
              ))
            }
          </tr>

          <tbody>
            {
              attendances?.students?.map((student) => (
                <tr className='flex p-2  border-b border-gray-100'>
                  <td width={200} className="bg-gray-100 rounded-md p-1">{student?.first_name} {student?.last_name}</td>
                  {
                    attendances?.days?.map((day) => {
                      const current = student.attendance.find((att) => att?.date === day?.data)
                      
                      return current ? (
                        <td width="100" align="center" className='flex items-center justify-center'>
                          {current.status === 0 ? (
                              <span className='bg-red-200 p-1 rounded-md'>Yo'q edi</span>
                            ) : (
                              <span className='bg-green-200 p-1 rounded-md'>Bor edi</span>
                            )}
                        </td>
                      ) : (
                        <td width="100" align="center" className='flex items-center justify-center'>
                            <button
                              disabled={uploading || compareDate(day.data)} 
                              onClick={() => {
                                handleSetAttendanceStudent(true, day?.data, student.id, params.id)
                              }}
                              className='p-1 bg-green-200 rounded-md disabled:opacity-70'>Bor</button>
                            <button 
                              disabled={uploading || compareDate(day.data)} 
                              onClick={() => {
                                handleSetAttendanceStudent(false, day?.data, student.id, params.id)
                              }}
                              className='p-1 bg-orange-300 rounded-md disabled:opacity-70'>Yo'q</button>

                        </td>
                      )
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Spin>
  )
}

export default GroupAttendance