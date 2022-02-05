import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = ({ children, ...props }: FlexProps) => {
  return (
    <Flex direction="column" paddingX={120} {...props}>
      {children}
    </Flex>
  )
}
