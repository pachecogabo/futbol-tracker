// screens/StandingsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, FlatList } from 'react-native';
import { getCache, setCache } from '../utils/cache';
import axios from 'axios';

const StandingsScreen = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStandings = async () => {
    try {
      const cachedData = await getCache('standings');
      if (cachedData) {
        setStandings(cachedData);
      } else {
        const response = await axios.get(`${process.env.API_URL}/standings`);
        setStandings(response.data);
        await setCache('standings', response.data, 900); // TTL de 15 minutos
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la tabla de posiciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={standings}
      keyExtractor={(item) => item.teamId.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{`${item.position}. ${item.teamName} - ${item.points} pts`}</Text>
        </View>
      )}
    />
  );
};

export default StandingsScreen;
