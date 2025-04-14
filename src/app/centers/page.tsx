'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { CenterCard } from '@/components/centers/CenterCard';
import { FilterDropdown } from '@/components/centers/FilterDropdown';
// import { SearchBar } from '@/components/centers/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { Center } from '@/types/entities';

const Centers = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const { data } = useQuery({
        queryKey: ['centers', selectedDistrict, selectedCity],
        queryFn: () => axios.get('http://localhost:3000/api/centers', {
            params: {
                district: selectedDistrict,
                city: selectedCity,
            }
        }).then((res) => res.data),
    })

    const districts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
        '12', "Tân Bình", "Tân Phú", "Bình Tân", "Bình Thạnh", "Gò Vấp", "Phú Nhuận",
        "Thủ Đức", "Nhà Bè", "Hóc Môn", "Cần Giờ"];

    const cities = ['Hồ Chí Minh'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center max-w-2xl mx-auto pb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Khám phá các sân cầu lông tại hệ thống của chúng tôi
                    </h1>
                    <p className="text-lg text-gray-300">
                        Tìm sân cầu lông gần bạn và đặt lịch ngay hôm nay!
                    </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6 mb-12">
                    <div className="w-full flex gap-8 items-end">
                        {/* <SearchBar value={search} onChange={setSearch} /> */}

                        <FilterDropdown
                            label="quận"
                            options={districts}
                            value={selectedDistrict}
                            onChange={setSelectedDistrict}
                        />

                        <FilterDropdown
                            label="thành phố"
                            options={cities}
                            value={selectedCity}
                            onChange={setSelectedCity}
                        />
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data && data.data.items.map((center: Center) => (
                        <CenterCard key={center.id} center={center} />
                    ))}
                </div>

                {data && data.data.items.length === 0 && (
                    <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
                        <p className="text-xl text-gray-300 mb-2">Không Tìm Thấy Kết Quả</p>
                        <p className="text-gray-400">
                            Thử chọn một quận hoặc thành phố khác để tìm kiếm thêm sân nhé.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Centers;