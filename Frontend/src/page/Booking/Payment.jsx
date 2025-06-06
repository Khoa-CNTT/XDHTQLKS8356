import React, { useCallback, useEffect, useState } from "react";
import { APP_ROUTER, QR } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TfiAlarmClock } from "react-icons/tfi";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate";
import { bookingService } from "../../service/bookingService";
import toast from "react-hot-toast";
const Payment = () => {
  const location = useLocation();
  const order = location.state?.order;

  console.log(order);
  const navigate = useNavigate();
  const [qrData, setQrData] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [timer, setTimer] = useState();
  const [isQrExpired, setIsQrExpired] = useState(false);

  const generateQrCode = () => {
    const now = formatDate(new Date(), "YYMMDD");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const newTransactionId = `MD${order.id} KH${order.UserId} ${now} ${randomPart}`;
    setTransactionId(newTransactionId);
    setQrData(
      `https://img.vietqr.io/image/${QR.BANK_ID}-${QR.ACCOUNT_NO}-${
        QR.TEMPLATE
        // }.png?amount=${order.total_price}&addInfo=${encodeURIComponent(
      }.png?amount=${2000}&addInfo=${encodeURIComponent(
        newTransactionId
      )}&accountName=${encodeURIComponent(QR.ACCOUNT_NAME)}`
    );
    setTimer(3000);
  };
  // Hàm kiểm tra thanh toán
  const checkPaymentStatus = useCallback(
    async (signal) => {
      try {
        const response = await axios.get(QR.CHECK, { signal });
        const transactions = response.data.data;
        console.log("transactions", transactions);
        console.log({
            amount: order.total_price,
            type: "booking",
            payment_gateway: "online",
            BookingId: order.id,
          })
        const isPaid = transactions.some((transaction) => {
          console.log(
            "check",
            transaction,
            transaction?.Mota?.includes(transactionId)
          );
          return (
            transaction.Mota.includes(transactionId) &&
            // transaction.GiaTri === order.total_price
            transaction.GiaTri === 2000
          );
          
        });
        if (isPaid) {
          toast.success("Đặt phòng thành công");
          const payment = await bookingService.payment({
            amount: order.total_price,
            type: "booking",
            payment_gateway: "online",
            BookingId: order.id,
          });
          const book = await bookingService.updateStatusBooking(order.id, {
            status: "booker",
          });
          
          setPaymentStatus(true);
          setTimer(0);
          // if (book.status&&payment.status) navigate(APP_ROUTER.HOME);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
      }
    },
    [transactionId, order]
  );

  useEffect(() => {
    if (timer > 0 && !isQrExpired && !paymentStatus) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0 && !paymentStatus) {
      setIsQrExpired(true);
    }
  }, [timer, paymentStatus, isQrExpired]);

  useEffect(() => {
    const controller = new AbortController();

    const interval = setInterval(async () => {
      if (!paymentStatus && !isQrExpired) {
        await checkPaymentStatus(controller.signal);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      controller.abort();
      // (async () => {
      //   await bookingService.updateStatusBooking(order.id, { status: 'cancelled' });
      // })();
    };
  }, [paymentStatus, isQrExpired, transactionId]);

  useEffect(() => {
    if (order) generateQrCode();
    else navigate(APP_ROUTER.HOME);
  }, []);

  // console.log("payment:  ", transactionId);
  return (
    <div>
      {paymentStatus ? (
        <div>
          Thanh toán thành công
          <span className='text-2xl text-red-600 mx-2'>
            {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
              timer % 60
            }`}
          </span>
        </div>
      ) : (
        <div className='w-full text-center'>
          <div className='flex items-center gap-4 text-red-600 justify-center'>
            <div>Chúng tôi đang giữ phòng cho quý khách...</div>

            {timer > 0 && (
              <div className='text-2xl font-semibold flex items-center gap-2'>
                <TfiAlarmClock />
                {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
                  timer % 60
                }`}
              </div>
            )}
          </div>
          <h3 className='italic mb-5 mt-2'>
            Vui lòng quét mã QR để thực hiện thanh toán
          </h3>
          {qrData.length > 0 && (
            <img
              src={qrData}
              className={`w-2/5 mx-auto ${timer > 0 ? "" : "blur-sm"}`}
            />
          )}
          <div className='w-1/3 grid grid-cols-3 gap-x-2  mt-3 text-base text-left text-gray-700 mx-auto'>
            <div>Số tiền:</div>
            <div className='font-medium col-span-2'>
              {order?.total_price.toLocaleString()} VND
            </div>

            <div>Nội dung:</div>
            <div className='font-medium col-span-2'>{transactionId}</div>
          </div>
        </div>
      )}
      <div className='flex justify-end gap-1'>
        <button
          onClick={generateQrCode}
          className='text-gray-900 bg-white border border-gray-10 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer'
        >
          Làm mới
        </button>
      </div>
    </div>
  );
};

export default Payment;
