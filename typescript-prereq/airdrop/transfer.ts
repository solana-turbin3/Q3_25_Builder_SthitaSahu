import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet))
const to = new PublicKey("GuatWF5R8quprAM4pRJiEL6JGdBBxv23V1JGxxASeKr5"); // Replace with recipient's public key
const connection = new Connection("https://api.devnet.solana.com");


(async () => {
  try {
   

    const balance = await connection.getBalance(from.publicKey);
   
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports:balance
       })
    );

    // Set recent blockhash and fee payer
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    transaction.feePayer = from.publicKey;


    const fee =
        (await connection.getFeeForMessage(transaction.compileMessage(), "confirmed"))?.value || 0;
    

     transaction.instructions.pop();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance - fee,
        })
      );
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);

    console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

