// screens/NextMatchScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { getCache, setCache } from '../utils/cache';
import CountdownTimer from '../components/CountdownTimer';
import api from '../services/api';

const NextMatchScreen = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNextMatch = async () => {
    try {
      const cachedData = await getCache('fixture');
      if (cachedData && cachedData.status === 'next') {
        setNextMatch(cachedData.match);
      } else {
        const response = await api.get('/fixture');
        if (response.data.status === 'next') {
          setNextMatch(response.data.match);
          await setCache('fixture', response.data, response.data.ttl || 900);
        }
      }
    } catch (error: any) {
      console.log('❌ Error en NextMatchScreen:', error?.message);
      Alert.alert('Error', 'No se pudo obtener la información del próximo partido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextMatch();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (!nextMatch || !nextMatch.teams || !nextMatch.fixture) {
    console.log('⚠️ Estructura inesperada de nextMatch:', JSON.stringify(nextMatch, null, 2));
    return <Text>No hay información disponible del próximo partido.</Text>;
  }

  const { teams, fixture } = nextMatch;


  return (
    <View>
      <Text>Próximo Partido</Text>
      <Text>{`Próximo partido: ${teams.home.name} vs ${teams.away.name}`}</Text>
      <Text>{`Fecha y hora: ${new Date(fixture.date).toLocaleString()}`}</Text>
      <CountdownTimer
        targetDate={fixture.date}
        onComplete={fetchNextMatch}
      />
    </View>
  );
};

export default NextMatchScreen;
