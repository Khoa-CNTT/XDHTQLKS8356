import React from 'react';
import SlickImages from '../../components/SlickImages';
import images from '../../assets/images';

const ServicesPage = () => {
    const imgs = [images.service1, images.service2, images.service3, images.service4];
    return (
        <div className='mt-10 mb-30'>
            <div className=''>
                <SlickImages cssSlide={"w-full h-[600px]"}  images={imgs} isDotImage={false} />
            </div>
            <div className="relative w-full h-[500px] mt-24">
                <img
                    src="https://housedesign.vn/wp-content/uploads/2020/03/phong-khach-san-dep-1.jpg"
                    alt="Luxurious room"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/3">
                    <div className="bg-white bg-opacity-90 p-8 rounded-xl max-w-4xl text-center shadow-lg">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">Phòng sang trọng</h2>
                    <p className="text-gray-700 text-md pb-3">
                    Những phòng ngủ sang trọng thanh lịch trong bộ sưu tập này giới thiệu các thiết kế nội thất tùy chỉnh &
                ý tưởng trang trí. Xem hình ảnh và tìm thiết kế phòng ngủ sang trọng hoàn hảo của bạn.
                Những phòng ngủ sang trọng sẽ khiến bạn không bao giờ muốn rời khỏi phòng của mình nữa.
                    </p>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[500px] mt-30">
                <img
                    src="https://peridotgrandhotel.com/wp-content/uploads/2022/08/Gym-2-2000.jpg"
                    alt="Luxurious room"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/3">
                    <div className="bg-white bg-opacity-90 p-8 rounded-xl max-w-4xl text-center shadow-lg">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">Trung tâm thể hình</h2>
                    <p className="text-gray-700 text-md pb-3">
                    Phòng gym hiện đại tại khách sạn được trang bị đầy đủ máy móc cao cấp, không gian thoáng mát và sạch sẽ. Dù đang du lịch hay công tác, bạn vẫn có thể duy trì thói quen luyện tập và nâng cao sức khỏe một cách tiện lợi và thoải mái.
                    </p>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[500px] mt-30">
                <img
                    src="https://giadinh.mediacdn.vn/2018/12/31/tgb20171129movenpick-hotelbreakfast-setup-15462474737041977778568.jpg"
                    alt="Luxurious room"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/3">
                    <div className="bg-white bg-opacity-90 p-8 rounded-xl max-w-4xl text-center shadow-lg">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">Nhà hàng</h2>
                    <p className="text-gray-700 text-md pb-3">
                    Nhà hàng của khách sạn mang đến không gian ấm cúng, thực đơn đa dạng với những món ăn tinh tế được chế biến từ nguyên liệu tươi ngon. Là nơi lý tưởng để bạn thưởng thức ẩm thực trong không gian sang trọng và đẳng cấp.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;