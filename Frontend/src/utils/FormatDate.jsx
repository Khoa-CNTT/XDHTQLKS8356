import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('vi'); 

// "x minutes ago", "3 hours ago", etc.
export const formatRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

// "May 13, 2025 12:37 PM"
export const formatFullDateTime = (date) => {
  return dayjs(date).format('LLL'); // ví dụ: "May 13, 2025 12:37 PM"
};

// "12:37"
export const formatTime = (date) => {
  return dayjs(date).format('HH:mm');
};

// "dd/mm/yyyy"
export const formatDate = (date, string) => {
  return dayjs(date).format(string);
};

// 1 tháng 1 ngày
export const getPreciseDuration = (checkin, checkout) => {
   const start = dayjs(checkin);
  const end = dayjs(checkout);
  return end.diff(start, 'day') + 1;
};

export const getUsedDuration = (checkin, checkout) => {
  const now = dayjs();
  const checkinDate = dayjs(checkin);
  const checkoutDate = dayjs(checkout);

  // Nếu đã checkout (checkout < now): tính từ checkin đến checkout
  // Nếu chưa: tính từ checkin đến hiện tại
  const endDate = checkoutDate.isBefore(now) ? checkoutDate : now;

  return getPreciseDuration(checkinDate,endDate); // dùng from để ra kết quả như "2 ngày trước"
};
