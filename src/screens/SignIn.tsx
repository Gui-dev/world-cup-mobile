import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import { Button } from '../components/Button'
import Logo from './../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'

export const SignIn = () => {
  const { signIn } = useAuth()

  return (
    <Center
      flex={1}
      p={7}
      bg="gray.900"
    >
      <Logo height={40} width={212} />
      <Button
        title="ENTRAR COM O GOOGLE"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        isLoading={false}
        mt={12}
        onPress={signIn}
      />
      <Text
        textAlign="center"
        color="white"
        mt={4}
      >
        Não utilizamos nenhuma informação além{'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
