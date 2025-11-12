import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Flex } from '@mantine/core'
import { BasicCard } from '../../components/cards/Cards'
import { useSelector } from 'react-redux'

function Dashboard() {
  const [count, setCount] = useState([1, 2, 3, 4, 5,6])
  const mode = useSelector((state) => state.theme.mode);
  // console.log(mode)
  return (
    <>
      <Navbar />
      <Flex justify="flex-start" align="center" direction="row" gap="md" wrap="wrap" style={{ padding: '20px' }}>
        {count.map((i) => {
          return (

            <BasicCard key={i + 1} />

          )
        })}
      </Flex>
    </>
  )
}

export default Dashboard