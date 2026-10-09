import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore } from '@/store/useAppStore';
import { formatBytes } from '@/services/scanner.service';

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { scanResults, totalRecoverableBytes } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>CleanOS Pro</Text>
          <Text style={styles.subtitle}>Seu dispositivo, sempre leve</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
          <Text style={styles.premiumBadge}>PRO</Text>
        </TouchableOpacity>
      </View>

      <GlassCard style={styles.heroCard}>
        <Text style={styles.heroLabel}>Espaço recuperável</Text>
        <Text style={styles.heroValue}>{formatBytes(totalRecoverableBytes)}</Text>
        <TouchableOpacity
          style={styles.optimizeButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.optimizeButtonText}>Otimizar Agora</Text>
        </TouchableOpacity>
      </GlassCard>

      <Text style={styles.sectionTitle}>Resumo</Text>
      {scanResults.length === 0 ? (
        <GlassCard>
          <Text style={styles.emptyText}>
            Nenhum scan ainda. Toque em "Otimizar Agora" para analisar o dispositivo.
          </Text>
        </GlassCard>
      ) : (
        scanResults.map((r) => (
          <GlassCard key={r.id} style={styles.resultRow}>
            <View>
              <Text style={styles.resultLabel}>{r.label}</Text>
              <Text style={styles.resultCount}>{r.itemCount} itens</Text>
            </View>
            <Text style={styles.resultBytes}>{formatBytes(r.recoverableBytes)}</Text>
          </GlassCard>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 60, gap: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  premiumBadge: {
    color: colors.background,
    backgroundColor: colors.primary,
    fontWeight: '800',
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 14, marginBottom: 12 },
  heroCard: { alignItems: 'center', paddingVertical: 28 },
  heroLabel: { color: colors.textSecondary, fontSize: 13 },
  heroValue: { color: colors.textPrimary, fontSize: 36, fontWeight: '800', marginVertical: 8 },
  optimizeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    marginTop: 12,
  },
  optimizeButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  sectionTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '600', marginTop: 8 },
  emptyText: { color: colors.textSecondary },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  resultCount: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  resultBytes: { color: colors.success, fontWeight: '700' },
});
