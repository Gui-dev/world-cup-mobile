import { useCallback, useEffect, useState } from 'react'
import { FlatList, Icon, useToast, VStack } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api } from '../services/api'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Loading } from './../components/Loading'
import { EmptyPoolList } from './../components/EmptyPoolList'
import { PoolCard, PoolCardProps } from './../components/PoolCard'

export const Pools = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const { navigate } = useNavigation()
  const toast = useToast()

  const handleNavigationToFindPool = () => {
    navigate('find')
  }

  const handleFetchPools = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/pools')
      setPools(data.pools)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Buuuuu',
        description: 'Não foi possível carregar os bolões!',
        placement: 'top',
        bgColor: 'red.5000'
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    handleFetchPools()
  }, [handleFetchPools])

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} mb={4} pb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" size="md" color="black" />}
          onPress={handleNavigationToFindPool}
        />
      </VStack>

      {
        isLoading
          ? <Loading />
          : <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <PoolCard data={item} />
              )
            }}
            ListEmptyComponent={() => {
              return (
                <EmptyPoolList />
              )
            }}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              pb: 10
            }}
          />
      }

    </VStack>
  )
}
