import React, { useCallback, useEffect, useState } from "react";
import { APP_ROUTER, QR } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TfiAlarmClock } from "react-icons/tfi";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
  const { infoCustomer, dataRoom } = location.state;
  const totalAmount = dataRoom?.final_amount;
  const totalDiscount = dataRoom?.total_discount;
  console.log(totalAmount, totalDiscount)
  const navigate = useNavigate()
  const [qrData, setQrData] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [timer, setTimer] = useState();
  const [isQrExpired, setIsQrExpired] = useState(false)

  const generateQrCode = () => {
    const now = new Date();
    const formatNumber = (num, length) => String(num).padStart(length, "0");
    const newTransactionId = `${formatNumber(now.getMonth() + 1, 2)}${formatNumber(now.getDate(), 2)}${formatNumber(now.getHours(), 2)}${formatNumber(now.getMinutes(), 2)}${formatNumber(now.getSeconds(), 2)}${formatNumber(now.getMilliseconds(), 3)}`
                              +`${formatNumber(Math.floor(Math.random() * 1e6), 6)}`;
    setTransactionId(newTransactionId);
    setQrData(`https://img.vietqr.io/image/${QR.BANK_ID}-${QR.ACCOUNT_NO}-${QR.TEMPLATE}.png?amount=${totalAmount-totalDiscount}&addInfo=${encodeURIComponent(newTransactionId)}&accountName=${encodeURIComponent(QR.ACCOUNT_NAME)}`);
    setTimer(300); 
  };

  // Hàm kiểm tra thanh toán
  const checkPaymentStatus =useCallback(async (signal) => {
    try {
      const response = await axios.get(QR.CHECK, { signal })
      const transactions = response.data.data;
      const isPaid = transactions.some(
        (transaction) => {
          // console.log("check", transaction, transaction.MoTa.includes(transactionId))
          return transaction.MoTa.includes(transactionId) && transaction.GiaTri===(totalAmount-totalDiscount)
        }
      );
      if (isPaid) {
        setPaymentStatus(true);
        setTimer(0);
        navigate(APP_ROUTER.HOME)
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra thanh toán:', error);
    }
  }, [transactionId, totalAmount, totalDiscount]) 

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

    const interval = setInterval(async() => {
      if (!paymentStatus && !isQrExpired) {
        await checkPaymentStatus(controller.signal);
      }
    }, 1000);

    return () => {
      clearInterval(interval)
      controller.abort();
    }
  }, [paymentStatus, isQrExpired, transactionId]);

  useEffect(() => {
    generateQrCode();
  }, []);

  // console.log("payment:  ", transactionId);
  return (
    <div >
      {paymentStatus ? (
        <div>
          Thanh toán thành công
          <span className="text-2xl text-red-600 mx-2">
                {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}
               </span>
        </div>
      ) : (
        <div className="w-full text-center" >
        <div className="flex items-center gap-4 text-red-600 justify-center">
          <div>Chúng tôi đang giữ phòng cho quý khách...</div>
         
          {timer > 0 && (
              <div className="text-2xl font-semibold flex items-center gap-2">
              <TfiAlarmClock />
                {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}
              </div>
            )}
        </div>
          <h3 className="italic mb-5 mt-2">Vui lòng quét mã QR để thực hiện thanh toán</h3>
          {qrData.length > 0 && (
            <img
              src={qrData}
              className={`w-1/3 mx-auto ${timer > 0 ? '' : 'blur-sm'}`}
            />
          )}
          <div className="w-1/4 grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-sm text-left text-gray-700 mx-auto">
            <div>Số tiền:</div>
            <div className="font-medium">{(totalAmount - totalDiscount).toLocaleString()} VND</div>

            <div>Nội dung:</div>
            <div className="font-medium">{transactionId}</div>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-1">
        <button onClick={generateQrCode} className="text-gray-900 bg-white border border-gray-10 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">Làm mới</button>
        <button onClick={() => setStep(prev => prev - 1)} className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default Payment;