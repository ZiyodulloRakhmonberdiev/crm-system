import { Skeleton, Tooltip } from "antd";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/times").then((res) => {
      setTimes(res?.data?.data);
    });

    axios
      .get("/api/schedule")
      .then((res) => {
        setSchedule(res?.data?.data);
      })
      .finally(() => setLoading(false));
  }, []);
  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms());
    axios
      .get(`/api/rooms`)
      .then((res) => {
        dispatch(fetchedRooms(res?.data?.data?.data));
      })
      .catch(() => {
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
      <center className="border-b pb-2">
        <h3 className="text-lg">Расписание</h3>
      </center>
      {loading ? (
        <Skeleton active={true} />
      ) : (
        <div className="overflow-auto schedule__table-wrapper pb-8">
          <table className="relative">
            <tr>
              <td className="bg-gray-100 border-b">Кабинеты</td>
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
                <tr className="relative">
                  <td className=" bg-gray-100 border-b">{room?.name}</td>
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
                          colSpan={curr?.lesson_duration / 30}
                          className="relative p-1 border border-gray-100"
                          role="cell"
                        >
                          <div className="bg-cyan-300 w-full">
                            <div
                              // to={`/groups/${curr?.id}`}
                              className="p-2 shadow-md text-xs flex flex-wrap gap-1"
                            >
                              <span className="bg-cyan-500 rounded-sm p-1 text-white px-1 w-full">
                                {curr?.name}
                              </span>
                              {curr?.teachers?.length !== 0 ? (
                                <Tooltip title="Учителя">
                                  <span className="bg-pink-400 rounded-sm px-1 py-0.5 text-white">
                                    {curr?.teachers?.[0]?.name}
                                  </span>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <span
                                className="bg-white rounded-sm px-1 py-0.5 text-xs"
                                style={{ fontSize: 10 }}
                              >
                                {curr?.group_start_date} -{" "}
                                {curr?.group_end_date}{" "}
                              </span>
                            </div>
                          </div>
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
      )}
    </div>
  );
};

export default Schedule;
