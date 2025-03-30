import Stripe from "stripe";
import { getDbConnection } from "./db";
//stores all the payment information
export async function handleCheckoutSessionCompleted({
    session,
    stripe
}:{
    session : Stripe.Checkout.Session;
    stripe:Stripe
}){
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = session.line_items?.data[0]?.price?.id;
    
    if("email" in customer && priceId){
        const {email,name} = customer;
        const sql = await getDbConnection();

        //created the user
        await createOrUpdateUser({
            sql,
            email:email as string,
            fullName:name as string,
            priceId:priceId as string,
            customerId,
            status : "active"
        })

        //created the payment
        await createPayment({
            sql,
            session,
            priceId : priceId as string,
            userEmail : email as string
        })
    }
    
}
//create user in the database
//update users table set price_id
async function createOrUpdateUser({
    sql,
    email,
    fullName,
    customerId,
    priceId,
    status,
}:{
    sql:any;
    email : string,
    fullName: string,
    customerId: string,
    priceId: string,
    status: string
}){
    try{
        const sql = await getDbConnection();
        const user = await sql`SELECT * FROM users WHERE email = ${email}`; //checking if user exists or not
        if(user.length ===0){ //if user doesn't exist then only add it to the database
            await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES (${email},${fullName},${customerId},${priceId},${status})`
        }
    }catch(error){
        console.log("Error creating or updating user",error);
    }
}
//create new payments in the database
async function createPayment({
    session,priceId,userEmail,sql
}:{
    session : Stripe.Checkout.Session;
    priceId : string;
    userEmail : string;
    sql : any;
}){
    try{
        
        const {amount_total,id,status} = session;
        await sql`
        INSERT INTO payments(amount,status,stripe_payment_id,price_id,user_email) VALUES (${amount_total},${status},${id},${priceId},${userEmail})
        `
    }catch(error){
        console.error("Error creating payment",error);
    }
}

//update users table set status =cancelled
export async function handleSubscriptionDeleted({
    subscriptionId,
    stripe
}:{
    subscriptionId : string;
    stripe:Stripe
}){
    try{
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        console.log(subscription)
        const sql = await getDbConnection();
        await sql`UPDATE users SET status=${"canceled"} WHERE customer_id=${subscription.customer}`;
        console.log("Subscription cancelled successfully");
    }catch(error){
        console.error("Error handling subscription deletion", error);
        throw error;
    }
}