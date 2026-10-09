import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore } from '@/store/useAppStore';
import { runDeviceScan, formatBytes } from '@/services/scanner.service';

export function ScannerScreen() {
  const navigation = useNavigation<any>();
  const { isScanning, startScan, setScanResults } = useAppStore();
  const [done, setDone] = useState(false);

  async function handleScan() {
    startScan();
    setDone(false);
    const results = await runDeviceScan();
    setScanResults(results);
    setDone(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner Inteligente</Text>

      {!isScanning && !done && (
        <GlassCard style={styles.centerCard}>
          <Text style={styles.text}>
            Vamos procurar fotos duplicadas, semelhantes, vídeos e arquivos grandes.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleScan}>
            <Text style={styles.buttonText}>Iniciar Scan</Text>
          </TouchableOpacity>
        </GlassCard>
      )}

      {isScanning && (
        <GlassCard style={styles.centerCard}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.text, { marginTop: 12 }]}>Analisando o dispositivo...</Text>
        </GlassCard>
      )}

      {done && !isScanning && (
        <GlassCard style={styles.centerCard}>
          <Text style={styles.text}>Scan concluído! Veja os resultados no Dashboard.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.buttonText}>Ver Resultados</Text>
          </TouchableOpacity>
        </GlassCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 60 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', marginBottom: 20 },
  centerCard: { alignItems: 'center', paddingVertical: 32 },
  text: { color: colors.textSecondary, textAlign: 'center', fontSize: 14 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    marginTop: 18,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
