import { SettingsIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Spacer,
  Stack,
  Table, TableCaption, Tbody,
  Td, Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { HeadId, useTable } from '@h6s/table'
import { useForm } from 'react-hook-form'

import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { DATASET_WITH_SUMMARY, TABLE_MODEL } from '../../mocks/dataset.mock'

interface Field {
  headIds: Array<HeadId<typeof DATASET_WITH_SUMMARY[number]>>;
}

export default function TableExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [instance, controls] = useTable({
    model: TABLE_MODEL,
    source: DATASET_WITH_SUMMARY,
  })
  const { register, handleSubmit } = useForm<Field>({
    defaultValues: { headIds: instance.visibleHeadIds },
  })

  return (
    <>
      <Container>
        <Header title="@h6s/table" description="Build Table UI" />
        <Flex>
          <Spacer />
          <Button colorScheme='blue' onClick={onOpen} size="lg" width="4xs">
            <HStack spacing={2}>
              <SettingsIcon /><span>Setting</span>
            </HStack>
          </Button>
        </Flex>
        <Box overflowX="auto" maxWidth="100%" mb="20">
          <Table size="sm" sx={{
            whiteSpace: 'nowrap',
            'th': {
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderLeftColor: 'blue.100',
              borderRightColor: 'blue.100',
            },
            'td': {
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderLeftColor: 'blue.100',
              borderRightColor: 'blue.100',
            },
            'th:first-of-type': {
              borderLeftColor: 'blue.300',
            },
            'td:first-of-type': {
              borderLeftColor: 'blue.300',
            },
            'th:last-child': {
              borderRightColor: 'blue.300',
            },
            'td:last-child': {
              borderRightColor: 'blue.300',
            },
          }} colorScheme="blue" borderColor="blue.300" borderWidth={1}>
            <TableCaption placement='top'>Transaction Table</TableCaption>
            <Thead bgColor="blue.50">
              {instance.theadGroups.map(({ theads, getRowProps }) => {
                const props = getRowProps()

                return (
                  <Tr key={props.id} {...props}>
                    {theads.map(header => {
                      return (
                        <Th key={header.id} rowSpan={header.rowSpan} colSpan={header.colSpan}>
                          {header.render({ cellProps: header })}
                        </Th>
                      )
                    })}
                  </Tr>
                )
            })}
            </Thead>
            <Tbody>
              {instance.rows.map(({ cells, getRowProps }) => {
                const props = getRowProps()

                return (
                  <Tr key={props.id} {...props}>
                    {cells.map(cell => {
                      if (cell.colSpan === 0) {
                        return null
                      }

                      return (
                        <Td key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan}>
                          {cell.render({ cellProps: cell })}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                {instance.tfoots?.map(cell => {
                  return (
                    <Th key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan}>
                      {cell.render({ cellProps: cell })}
                    </Th>
                  )
                })}
              </Tr>
            </Tfoot>
          </Table>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Setting Columns</DrawerHeader>

            <form onSubmit={handleSubmit(({ headIds }) => {
                controls.updateHead(headIds)
                onClose()
              })}>
              <DrawerBody>
                <Stack spacing={4}>
                  {Object.entries(instance.headMeta).map(([id, { label, show, countOfChild, countOfParent }], index) => {
                    return (
                      <Checkbox
                        {...register(`headIds.${index}`)}
                        key={id}
                        size="lg"
                        value={id}
                        colorScheme="blue"
                        defaultChecked={show}
                        isIndeterminate={countOfChild > 0}
                        paddingLeft={countOfParent * 8}
                      >
                        {label}
                      </Checkbox>
                    )
                  })}
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='blue'>Apply</Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </Container>
    </>
  )
}
