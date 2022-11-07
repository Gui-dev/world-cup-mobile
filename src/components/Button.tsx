import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export const Button = ({ title, type, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      fontSize="md"
      textTransform="uppercase"
      h={14}
      w="full"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      rounded="sm"
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600'
      }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
