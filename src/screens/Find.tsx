import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Heading, useToast, VStack } from 'native-base'

import { api } from '../services/api'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const Find = () => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useNavigation()
  const toast = useToast()

  const handleJoinPool = async () => {
    try {
      if (!code.trim()) {
        toast.show({
          title: 'Opssss',
          description: 'Você deve digitar o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
        return
      }
      setIsLoading(true)
      await api.post('/pools/join', { code })
      toast.show({
        title: 'Sucesso',
        description: 'Você entrou no bolão',
        placement: 'top',
        bgColor: 'green.500'
      })
      setCode('')
      setIsLoading(false)
      navigate('pools')
    } catch (error) {
      setIsLoading(false)

      if (error && error.response?.data.message === 'Pool not found') {
        toast.show({
          title: 'Buuuuu',
          description: 'Bolão não foi encontrado',
          placement: 'top',
          bgColor: 'red.500'
        })
        return
      }

      if (error && error.response?.data.message === 'You already joined this pool') {
        toast.show({
          title: 'Opssss',
          description: 'Você já está participando desse bolão',
          placement: 'top',
          bgColor: 'blue.500'
        })
        return
      }

      toast.show({
        title: 'Buuuuu',
        description: 'Erro ao buscar bolão pelo código',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack alignItems="center" mt={8} mx={5}>
        <Heading fontSize="xl" fontFamily="heading" textAlign="center" color="white" mb={8}>
          Encontre um bolão através{'\n'} de seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual é o código do bolão?"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />
        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
          _loading={{
            _spinner: { color: 'gray.900' }
          }}
        />
      </VStack>

    </VStack>
  )
}
