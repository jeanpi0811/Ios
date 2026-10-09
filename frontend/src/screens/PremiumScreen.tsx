import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { GlassCard } from '@/components/GlassCard';
import { usePremiumStore, PremiumPlan } from '@/store/usePremiumStore';

const FEATURES = [
  'IA avançada de classificação de fotos',
  'Limpeza automática agendada',
  'Relatórios ilimitados em PDF',
  'Backup automático',
  'Widgets extras',
];

const PLANS: { id: PremiumPlan; label: string; price: string }[] = [
  { id: 'PREMIUM_MONTHLY', label: 'Mensal', price: 'R$ 14,90/mês' },
  { id: 'PREMIUM_YEARLY', label: 'Anual', price: 'R$ 99,90/ano' },
];

export function PremiumScreen() {
  const { plan, isPremium, setPlan } = usePremiumStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>CleanOS Pro Premium</Text>

      <GlassCard>
        {FEATURES.map((f) => (
          <Text key={f} style={styles.feature}>
            •  {f}
          </Text>
        ))}
      </GlassCard>

      {PLANS.map((p) => (
        <GlassCard key={p.id} style={styles.planCard}>
          <View>
            <Text style={styles.planLabel}>{p.label}</Text>
            <Text style={styles.planPrice}>{p.price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.selectButton, plan === p.id && styles.selectButtonActive]}
            onPress={() => setPlan(p.id)}
          >
            <Text style={styles.selectButtonText}>
              {plan === p.id ? 'Selecionado' : 'Assinar'}
            </Text>
          </TouchableOpacity>
        </GlassCard>
      ))}

      {isPremium && (
        <TouchableOpacity onPress={() => setPlan('FREE')}>
          <Text style={styles.restoreText}>Cancelar assinatura</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 60, gap: 14 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  feature: { color: colors.textSecondary, fontSize: 14, marginBottom: 6 },
  planCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planLabel: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
  planPrice: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  selectButton: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  selectButtonActive: { backgroundColor: colors.primary },
  selectButtonText: { color: colors.textPrimary, fontWeight: '600', fontSize: 13 },
  restoreText: { color: colors.danger, textAlign: 'center', marginTop: 8 },
});
