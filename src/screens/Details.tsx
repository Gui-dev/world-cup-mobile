import { useCallback, useEffect, useState } from 'react'
import { HStack, useToast, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { Share } from 'react-native'

import { api } from '../services/api'

import { PoolCardProps } from './../components/PoolCard'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PoolHeader } from '../components/PoolHeader'
import { EmptyMyPoolList } from './../components/EmptyMyPoolList'
import { Option } from '../components/Option'
import { Guesses } from '../components/Guesses'

type RouteParams = {
  id: string
}

export const Details = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [poolDetails, setPoolDetails] = useState<PoolCardProps | null>(null)
  const toast = useToast()
  const route = useRoute()
  const { id } = route.params as RouteParams

  const fetchPoolDetails = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/pools/${id}`)
      setPoolDetails(data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Buuuuu',
        description: 'Não foi possível carregar o bolão!',
        placement: 'top',
        bgColor: 'red.5000'
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, toast])

  const handleCodeShare = async () => {
    await Share.share({
      title: 'Código para participar do bolão',
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [fetchPoolDetails])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {
        poolDetails._count?.participants > 0
          ? <VStack flex={1} px={5}>
            <PoolHeader data={poolDetails} />
            <HStack mb={5} p={1} bgColor="gray.800" rounded="sm">
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>
            <Guesses poolId={poolDetails.id} />
          </VStack>
          : <EmptyMyPoolList code={poolDetails.code} onShare={handleCodeShare} />
      }
    </VStack>
  )
}
