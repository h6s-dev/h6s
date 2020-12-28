import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, IconButton, Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { format, getDate } from 'date-fns'
import locale from 'date-fns/locale/ko'
import React from 'react'

import useCalendar, { CalendarViewType } from '../../../../src/index'
import { Container } from '../components/Container'

export default function Example() {
  const { calendar, headers, body, navigation, view } = useCalendar()

  return (
    <Container height="100vh">
      <Stack padding={12} justifyContent="center" direction="column" alignItems="center" spacing={4}>
        <Heading as="h1" size="4xl" colorScheme="teal">react-calendar</Heading>
        <Text color="gray.500">Headless Calendar UI Library Example with Charkra UI</Text>
      </Stack>

      <Table variant="simple" size="lg">
        <TableCaption placement="top">
          <nav>
            <Flex justify="space-between" width="w.100">
              <Stack direction="row" gutter={4}>
                <Button size="md" onClick={view.showMonthView} isActive={view.type === CalendarViewType.Month}>
                  M
                </Button>
                <Button size="md" onClick={view.showWeekView} isActive={view.type === CalendarViewType.Week}>
                  W
                </Button>
                <Button size="md" onClick={view.showDayView} isActive={view.type === CalendarViewType.Day}>
                  D
                </Button>
              </Stack>
              <Text fontSize="2xl">{format(calendar.date, 'yyyy. MM')}</Text>
              <Stack direction="row" gutter={8}>
                <IconButton aria-label="prev-month-button" icon={<ChevronLeftIcon />} onClick={navigation.setNextMonth} />
                <Button size="md" colorScheme="teal" onClick={navigation.setToday}>
                  TODAY
                </Button>
                <IconButton aria-label="next-month-button" icon={<ChevronRightIcon />} onClick={navigation.setNextMonth} />
              </Stack>
            </Flex>
          </nav>
        </TableCaption>
        <Thead>
          <Tr>
            {headers.weekDays.map(({ key, value }) => {
              return <Th key={key}>{format(value, 'E', { locale })}</Th>
            })}
          </Tr>
        </Thead>
        <Tbody>
          {body.weeks.map(week => {
            const { key, value: days } = week
            
            return (
              <Tr key={key}>
                {days.map(day => {
                  const { key, value } = day
                  const { date, isCurrentDate, isCurrentMonth } = value
                  
                  return (
                    <Td key={key} opacity={isCurrentMonth ? 1 : .2}>
                      {isCurrentDate ? (
                        <Text fontWeight="bold" color="teal.500">
                          {getDate(date)}
                        </Text>
                      ) : getDate(date)}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Container>
  )
}
