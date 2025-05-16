import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi'; 


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
export const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
};
