// 1 setup payment sheet
// 2 Open stripe checkout form



import {
  initPaymentSheet,
  presentPaymentSheet
} from '@stripe/stripe-react-native';
import { supabase } from './supabase';
import { CollectionMode } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet';


const fetchStripekeys = async (totalAmount: number) => {
  console.log('Invoking stripe-checkout with:', totalAmount);
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      totalAmount,
    },
  });

  if (error) {
    console.error('Supabase Edge Function error:', error)
    throw new Error(error.message);
  }

  return data;
};



export const setupStripePaymentSheet = async (totalAmount: number) => {
  // Fetch paymentIntent and publishable key from server
  const { paymentIntent, publicKey, ephemeralKey, customer } =
    await fetchStripekeys(totalAmount);

  if (!paymentIntent || !publicKey) {
    throw new Error('Failed to fetch Stripe keys');
  }


  await initPaymentSheet({
    merchantDisplayName: 'OLX',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    billingDetailsCollectionConfiguration: {
      name: 'always' as CollectionMode,
      phone: 'always' as CollectionMode,
    },

  });
};


export const openStripeCheckout = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    console.error('Stripe presentPaymentSheet error:', error);
    throw new Error(error.message);
  }

  return true;
};