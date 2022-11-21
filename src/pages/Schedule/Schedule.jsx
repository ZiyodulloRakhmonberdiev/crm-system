import { Skeleton } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import {
  fetchedError,
  fetchedRooms,
  fetchingRooms,
} from "../../redux/roomsSlice";
const Schedule = () => {
  const { rooms } = useSelector((state) => state.rooms);
  const [schedule, setSchedule] = useState([]);
  const [times, setTimes] = useState([]);
  const [mustDeleteTd, setMustDeleteTd] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get("/api/times").then((res) => {
      setTimes(res.data.data);
    });

    axios.get("/api/schedule").then((res) => {
      setSchedule(res.data.data);
    })
    .finally(() => setLoading(false))
  }, []);

  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms());
    axios
      .get(`/api/rooms`)
      .then((res) => {
        dispatch(fetchedRooms(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, []);

  useEffect(() => {
    rooms?.map((room, indx) => {
      times?.map((time, index) => {
        let startedIndex = null;
        let endIndex = null;
        const curr = schedule?.find((group) => {
          if (time.time === group.start_time && group.room.id === room.id) {
            startedIndex = index;
          } else if (
            time.time === group.end_time &&
            group.room.id === room.id
          ) {
            endIndex = index;
          }
          return time.time === group.start_time && group.room.id === room.id;
        });
        if (curr) {
          Array.from(Array(curr?.lesson_duration / 30).keys()).map((x, i) => {
            setMustDeleteTd((prev) => [
              ...prev,
              {
                roomIndex: indx,
                currIndex: index + i,
              },
            ]);
          });
        }
      });
    });
  }, [rooms, times, schedule]);

  return (
    <div>
      <center>
        <h3>Расписание</h3>
      </center>
      {
        loading ? (
          <Skeleton active={true} />
        ) : (
          <div className="w-full overflow-auto" style={{ minHeight: "50vh" }}>
        <table>
          <tr>
            <td width={150} className="px-4 py-2 bg-gray-100">
              Кабинет
            </td>
            {times?.map((time) => {
              return (
                <td className="px-4 py-2 border-r-2 border-gray-100">
                  {time.time}
                </td>
              );
            })}
          </tr>
          {rooms?.map((room, indx) => {
            return (
              <tr>
                <td className=" bg-gray-100 px-4 py-2">{room?.name}</td>
                {times?.map((time, index) => {
                  let startedIndex = null;
                  let endIndex = null;
                  const curr = schedule?.find((group) => {
                    if (
                      time.time === group.start_time &&
                      group.room.id === room.id
                    ) {
                      startedIndex = index;
                    } else if (
                      time.time === group.end_time &&
                      group.room.id === room.id
                    ) {
                      endIndex = index;
                    }
                    return (
                      time.time === group.start_time &&
                      group.room.id === room.id
                    );
                  });

                  if (curr) {
                    return (
                      <td
                        colspan={curr?.lesson_duration / 30}
                        className="relative p-1 border border-gray-100"
                        role="cell"
                      >
                        <Link to={`/groups/`}>
                          <div className="bg-green-400 p-2  shadow-md">
                            <span>{curr?.name}</span>
                          </div>
                        </Link>
                      </td>
                    );
                  } else {
                    if (
                      !mustDeleteTd.find(
                        (x) => x?.roomIndex === indx && x?.currIndex === index
                      )
                    ) {
                      return (
                        <td
                          style={{ width: "70px" }}
                          className="border border-gray-100"
                        ></td>
                      );
                    }
                  }
                })}
              </tr>
            );
          })}
        </table>
      </div>
        )
      }
    </div>
  );
};

export default Schedule;
