'use client';

import React, { useState } from 'react';
import { CenterCard } from '@/components/centers/CenterCard';
import { FilterDropdown } from '@/components/centers/FilterDropdown';
// import { SearchBar } from '@/components/centers/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { Center, GetFiltersValuesResponse } from '@/types/entities';
import { baseAxios } from '@/services/api/baseAxios';

const Centers = () => {
    const [selectedDistrict,] = useState('');
    const [selectedCity,] = useState('');
    const { data: searchCentersData } = useQuery({
        queryKey: ['centers', selectedDistrict, selectedCity],
        queryFn: async () => {
            const data = await baseAxios.get('/centers', {
                params: {
                    district: selectedDistrict,
                    city: selectedCity,
                }
            })
            return data;
        }
    })
    const { data: getFilterValuesData } = useQuery({
        queryKey: ['centers-filters-values'],
        queryFn: async () => {
            const data = await baseAxios.get('/centers/filters/values') as GetFiltersValuesResponse;
            return data;
        },
    })

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

                        {getFilterValuesData
                            && getFilterValuesData.data
                            && Object.keys(getFilterValuesData.data).length > 0 &&
                            Object.keys(getFilterValuesData?.data || {}).map(key => (
                                <FilterDropdown
                                    key={key}
                                    label={getFilterValuesData?.data?.[key].label || ''}
                                    options={getFilterValuesData?.data?.[key].values ?? []}
                                    value={selectedDistrict}
                                    //TODO: apply dynamic query params using url search params
                                    onChange={() => { }}
                                    showTotalItems
                                    totalItemsTextSurfix='sân'
                                />
                            ))}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {searchCentersData && searchCentersData.data.items.map((center: Center) => (
                        <CenterCard key={center.id} center={center} />
                    ))}
                </div>

                {searchCentersData && searchCentersData.data.items.length === 0 && (
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