import { useCallback, useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'

import { api } from '../services/api'

import { Loading } from './Loading'
import { Game, GameProps } from './Game'

interface Props {
  poolId: string;
}

export const Guesses = ({ poolId }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
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

  const handleGuessConfirm = async (gameId: string) => {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: 'Opssss',
          description: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.5000'
        })
        return
      }
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })
      toast.show({
        title: 'Sucesso',
        description: 'Palpite realizado',
        placement: 'top',
        bgColor: 'green.5000'
      })
      fetchGames()
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Buuuuu',
        description: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.5000'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  console.log('GAMES: ', games)

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <Game
            data={item}
            setFirstTeamPoints={setFirstTeamPoints}
            setSecondTeamPoints={setSecondTeamPoints}
            onGuessConfirm={() => handleGuessConfirm(item.id)}
          />
        )
      }}
    />
  )
}
