import { Heading, Stack, Text } from '@chakra-ui/react'

interface Props {
  title: string;
  description?: string;
}

export function Header({ title, description }: Props) {
  return (
    <Stack
      padding={12}
      justifyContent="center"
      direction="column"
      alignItems="center"
      spacing={4}
    >
      <Heading as="h1" size="xl">
        {title}
      </Heading>
      <Text color="gray.500">
        {description} with <a href="https://chakra-ui.com/">chakra-ui</a>
      </Text>
    </Stack>
  )
}
