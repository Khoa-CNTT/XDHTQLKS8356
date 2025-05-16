import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import axios from "axios";
import { useParams } from "react-router";
import { bookingService } from "../../../service/bookingService";


const BookingService = () => {
    const [selectedService, setSelectedService] = useState([])
    const { bookingId } = useParams()
    const [data, setData] = useState({});
    const [bookingDetail, setBookingDetail] = useState()
    const [total, setTotal] = useState({
        totalService: 0,
        totalPaid: 0,
        service: {},
        paid: {},
    });

    const fetchData = async () => {
        if (bookingId) {
            const data = await bookingService.getBookingDetail(bookingId)
            if (data) {
                setData(data)
                if(!bookingDetail) setBookingDetail(data.details[0] || null)
                else setBookingDetail(data.details.find(
                    (detail) => detail.booking_detail_id === bookingDetail.booking_detail_id) || null
                );
            }
        }
    };

    useEffect(() => {
        fetchData()
    }, [bookingId])

    const groupRoom = () => ({
        ...data,
        details: data?.details ? Object.values(
            data.details.reduce((acc, detail) => {
                if (!acc[detail.room_name]) {
                    acc[detail.room_name] = {
                        room_name: detail.room_name,
                        detail: [],
                    };
                }
                acc[detail.room_name].detail.push(detail);
                return acc;
            }, {})
        ) : []
    })

    const handleBookingDetail = (detail) => {
        setBookingDetail(detail);
    };

    const handleServiceSelection = (service, quantity) => {
        const index = selectedService.findIndex(
            (item) =>
                item.BookingDetailId === bookingDetail.booking_detail_id &&
                item.ServiceId === service.id
        );
        if (index === -1) {
            setSelectedService([
                ...selectedService,
                {
                    BookingDetailId: bookingDetail.booking_detail_id,
                    ServiceId: service.id,
                    quantity: 1,
                    price: service.price,
                    total_price: service.price,
                    service_name: service.service_name
                },
            ]);
        } else {
            const updatedService = [...selectedService];
            updatedService[index] = {
                ...updatedService[index],
                quantity: quantity,
                total_price: updatedService[index].price * (quantity || 1),
            };
            setSelectedService(updatedService);
        }
    };

    useEffect(() => {
        const totalService = selectedService.reduce((acc, { BookingDetailId, total_price }) => {
            acc[BookingDetailId] = (acc[BookingDetailId] || 0) + total_price
            return acc
        }, {})
        const totalPaid = data?.details?.reduce((acc, detail) => {
            const serviceTotal = detail.services
                ? detail.services.reduce((sum, service) => sum + service.price * service.quantity, 0)
                : 0;
            acc[detail.booking_detail_id] = detail.price + serviceTotal;

            return acc;
        }, {});
        setTotal({
            service: totalService || {},
            paid: totalPaid || {},
            totalService: totalService ? Object.values(totalService).reduce((sum, value) => sum + value, 0) : 0,
            totalPaid: totalPaid ? Object.values(totalPaid).reduce((sum, value) => sum + value, 0) : 0,
        })
    }, [selectedService, data]);

    console.log(bookingDetail?.booking_detail_id, selectedService)
    return (
        <div className="flex max-h-screen p-3 gap-3 w-full">
            <Sidebar
                data={groupRoom()}
                handleBookingDetail={handleBookingDetail}
                onSelectService={handleServiceSelection}
                total={total}
            />
            <Content
                className="h-full"
                data={data}
                bookingDetail={bookingDetail}
                selectedService={selectedService}
                changeQuantityService={handleServiceSelection}
                deleteServices={() => setSelectedService([])}
                handleFetch={fetchData}
                total={total}
            />
        </div>
    );
};

export default BookingService;
