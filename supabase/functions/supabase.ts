import { createClient } from 'jsr:@supabase/supabase-js@2'
// import { stripe } from './stripe-checkout.ts';
import Stripe from 'npm:stripe@^18.3.0'

export const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  //this is needed to use the Fetch API rather than relying on  Node.js HTTP package
  httpClient: Stripe.createFetchHttpClient()
})

export const getOrCreateStripeCustomerForSupabase = async (req: Request) => {
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        // Create client with Auth context of the user that called the function.
        // This way your row-level-security (RLS) policies are applied.
        {
            global: {
                headers: { Authorization: authHeader },
            },
        }
    )


    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
        throw new Error('User not found')
    }
    console.log('User:', user)

    const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
    if (error) throw new Error(`Error fetching user: ${error.message}`)

    if (data.stripe_customer_id) {
        return data.stripe_customer_id
    }

    const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
            supabase_user_id: user.id
        }
    })
    console.log('Created Stripe Customer:', customer)
    await supabaseClient
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('id', user.id)

    return customer.id
}