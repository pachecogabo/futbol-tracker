// screens/LiveMatchScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { getCache, setCache } from '../utils/cache';
import api from '../services/api'; // usar instancia de axios con baseURL

const LiveMatchScreen = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatchData = async () => {
    try {
      const cachedData = await getCache('fixture');
      if (cachedData) {
        console.log('✅ Usando datos en caché');
        setMatchData(cachedData);
      } else {
        const response = await api.get('/fixture');
        console.log('📥 Datos del servidor:', response.data);
        setMatchData(response.data);
        await setCache('fixture', response.data, response.data.ttl || 900);
      }
    } catch (error: any) {
      console.log(
        '❌ Error al hacer fetch de /fixture:',
        error?.message,
        error?.code,
        error?.response?.status
      );
      Alert.alert('Error', 'No se pudo obtener la información del partido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  if (!matchData || matchData.status !== 'live') {
    return <Text>No hay un partido en vivo actualmente.</Text>;
  }

  const { homeTeam, awayTeam } = matchData.match.teams;
  const { goals, fixture } = matchData.match;

  return (
    <View>
      <Text>{`Partido en vivo: ${homeTeam.name} vs ${awayTeam.name}`}</Text>
      <Text>{`Marcador: ${goals.home ?? 0} - ${goals.away ?? 0}`}</Text>
      <Text>{`Minuto: ${fixture.status.elapsed ?? '—'}`}</Text>
      <Text>{`Estado: ${fixture.status.long}`}</Text>
    </View>
  );
};

export default LiveMatchScreen;
