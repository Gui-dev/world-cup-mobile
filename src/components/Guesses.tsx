import { useCallback, useEffect, useState } from 'react'
import { Box, useToast } from 'native-base'

import { api } from '../services/api'

import { Loading } from './Loading'
import { Game, GameProps } from './Game'

interface Props {
  poolId: string;
}

export const Guesses = ({ poolId }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const toast = useToast()

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/pools/${poolId}/games`)
      console.log('GAMES', data.games)
      setGames(data.games)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Buuuuu',
        description: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.5000'
      })
    } finally {
      setIsLoading(false)
    }
  }, [poolId, toast])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <Box>

    </Box>
  )
}
