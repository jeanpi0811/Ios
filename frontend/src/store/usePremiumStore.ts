import { create } from 'zustand';

export type PremiumPlan = 'FREE' | 'PREMIUM_MONTHLY' | 'PREMIUM_YEARLY';

interface PremiumState {
  plan: PremiumPlan;
  isPremium: boolean;
  setPlan: (plan: PremiumPlan) => void;
}

/**
 * A troca de plano real acontece via Google Play Billing / StoreKit
 * (recomendado: RevenueCat, que unifica as duas APIs). Este store só
 * guarda o estado resultante da compra, já validado pelo backend.
 */
export const usePremiumStore = create<PremiumState>((set) => ({
  plan: 'FREE',
  isPremium: false,
  setPlan: (plan) => set({ plan, isPremium: plan !== 'FREE' }),
}));
