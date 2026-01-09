import { Flex, Pagination, Select } from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import React from 'react'

function ProductFilters({searchParams, setSearchParams, meta, handleSortByChange}) {
    return (
        <Flex
            w={'100%'}
            justify={'space-between'}
            align={'center'}
            direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
            gap={'md'}
        >
            <Flex
                justify={'center'}
                align={'center'}
                gap={'md'}
                direction={'row'}
            >

                <Select withAlignedLabels placeholder="Sort By" data={["Price", "Title", "Arrival"]} onChange={handleSortByChange} />

                {searchParams.get("sortOrder") === "asc" &&
                    <IconSortAscending2
                        onClick={() => {
                            searchParams.set("sortOrder", "desc")
                            setSearchParams(searchParams)
                        }}
                        style={{ cursor: 'pointer', userSelect: 'none' }}

                    />}
                {searchParams.get("sortOrder") === "desc" &&
                    <IconSortDescending2
                        onClick={() => {
                            searchParams.set("sortOrder", "asc")
                            setSearchParams(searchParams)
                        }}
                        style={{ cursor: 'pointer', userSelect: 'none' }}

                    />}
            </Flex>

            {meta?.totalPages > 1 &&
                <Pagination visibleFrom='lg' value={meta?.currentPage} p={'md'} color={'green.0'} onChange={(e) => {
                    searchParams.set("page", e)
                    setSearchParams(searchParams)
                    console.log(e)
                }} total={meta?.totalPages} />

            }
            <Select withAlignedLabels placeholder='Products per Page' data={[5, 10, 15, meta?.totalProducts].filter(Boolean).map(String)} onChange={(e) => {
                searchParams.set("limit", Number(e))
                setSearchParams(searchParams)
                console.log(Number(e));

            }} />
        </Flex>
    )
}

export default ProductFilters