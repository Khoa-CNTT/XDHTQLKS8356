import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Eventcalendar, setOptions, localeVi, Select, CalendarNav, CalendarPrev, CalendarToday, CalendarNext } from "@mobiscroll/react";
import { useMemo } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { roomDetailService } from "../../service/roomDetailService";
import { bookingService } from "../../service/bookingService";
import ModalDetail from "./ModalDetail";
import ModalBooking from "./ModalBooking";
import ModalRoom from "./ModalRoom";
setOptions({
    locale: localeVi,
    theme: "windows",
    themeVariant: "light",
});
const fomatDate = (date) => new Date(date).toLocaleDateString('en-CA')

const Timeline = () => {
    const [selectedView, setView] = useState("month");
    const [status, setStatus] = useState({
        booked: {
            title: "Đã đặt trước",
            color: "#f5942766",
            isChecked: false,
        },
        cancelled: {
            title: "Đã huỷ",
            color: "#1a99ee66",
            isChecked: false,
        },
        completed: {
            title: "Đã trả",
            color: "#8c867f66",
            isChecked: false,
        },
        pending: {
            title: "Đang sử dụng",
            color: "#43ff6466",
            isChecked: false,
        }
    })
    const [date, setDate] = useState({ start: null, end: null });
    const [bookingSchedule, setBookingSchedule] = useState([])
    const [room, setRoom] = useState([])
    const [openDetail, setOpenDetail] = useState(false)
    const [openBooking, setOpenBooking] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        bookingId: null,
        bookingDetailId: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            setRoom((await roomDetailService.getRoom()).map((item, index) => ({
                id: item.id,
                name: item.room_number,
            })))
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            await fetchSchedule()
        }
        fetchData()
    }, [date, status])
    const fetchSchedule = async () => {
        const checkedKeys = status
        ? Object.entries(status)
            .filter(([_, value]) => value.isChecked)
            .map(([key]) => key)
        : [];
        if (date) {
            const schedule = await bookingService.getSchedule(date.start, date.end, checkedKeys)
            console.log(schedule)
            if (schedule?.length > 0) {
                setBookingSchedule(schedule.map(i => ({
                    resource: i.room_detail_id,
                    start: i.checkin,
                    end: i.checkout,
                    text: i.booking_detail_id,
                    color: status[i.status].color,
                    booking_id: i.booking_id,
                    booking_detail_id: i.booking_detail_id
                })))
            } else setBookingSchedule([])
        }

    }

    const view = useMemo(() => {
        return {
            timeline: {
                type: selectedView,
                size: 1,
                maxEventStack: 2,
                eventList: false,
                rowHeight: "equal",
                eventHeight: "variable",
                resolutionHorizontal: "day",
            },
        }
    }, [selectedView])

    const headerTimeline = () => (
        <div className=" w-full">
            <div className="flex items-center">
                <CalendarNav />
                <div className="grow flex justify-end items-center">
                    <CalendarPrev />
                    <CalendarToday />
                    <CalendarNext />
                    <Select
                        data={[
                            { text: "Tuần", value: "week" },
                            { text: "Tháng", value: "month" },
                        ]}
                        value={selectedView}
                        onChange={(event) => setView(event.value)}
                        inputStyle="box"
                    />
                </div>
            </div>
            <div className="flex justify-center gap-4">
                {Object.keys(status).map(item => (
                    <div key={item} >
                        <input id={item} name="status" value={item} type="checkbox" className="peer hidden"
                            onChange={(e) => {
                                setStatus(prev => ({
                                    ...prev,
                                    [e.target.value]: {
                                        ...prev[e.target.value],
                                        isChecked: e.target.checked
                                    }
                                }))
                            }} />
                        <label htmlFor={item} className="flex gap-2 items-center peer-checked:underline">
                            <span className="rounded-full w-4 h-4" style={{ backgroundColor: status[item].color }}></span>
                            <div className={``}>
                                {status[item].title}
                            </div>
                        </label>


                    </div>

                ))}
            </div>
        </div>
    );

    const handleEventClick = useCallback((event) => {
        setOpenDetail(true)
        setBookingDetails({
            bookingId: event.event.booking_id,
            bookingDetailId: event.event.booking_detail_id,
        })
    }, []);
    return (
        <div
            className="w-full h-[800px] mx-auto border border-gray-100 rounded-md p-4 overflow-auto relative [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
            <div className="flex justify-end">
                <button onClick={() => setOpenBooking(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Đặt phòng
                </button>
            </div>
            <Eventcalendar
                renderHeader={headerTimeline}
                clickToCreate={false}
                dragToCreate={false}
                dragToMove={false}
                dragToResize={false}
                eventDelete={false}
                nowIndicator={true}
                view={view}
                data={bookingSchedule}
                resources={room}
                onEventClick={handleEventClick}
                onPageChange={(e) => {
                    setDate({
                        start: fomatDate(e.firstDay),
                        end: fomatDate(e.lastDay)
                    })
                }}
                onPageLoaded={(e) => {
                    const firstDay = fomatDate(e.firstDay)
                    const lastDay = fomatDate(e.lastDay)
                    if (firstDay !== date.start && lastDay !== date.end) {
                        setDate({
                            start: firstDay,
                            end: lastDay,
                        });
                    }
                }}
            />
            <ModalDetail
                isModalOpen={openDetail}
                setIsModalOpen={setOpenDetail}
                bookingDetailId={bookingDetails.bookingDetailId}
                bookingId={bookingDetails.bookingId}
            />
            <ModalBooking isModalOpen={openBooking} setIsModalOpen={setOpenBooking} />

        </div>
    );
};

export default Timeline;
