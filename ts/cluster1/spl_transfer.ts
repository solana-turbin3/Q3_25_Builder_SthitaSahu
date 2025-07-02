import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "/home/sthita/.config/solana/id.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals=1_000_000;

const mint = new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");

// Recipient address
const to = new PublicKey("9ivkpfHaFo9jb3ihWRHw6NsFrbCkuAy2JRsCfRg3i22");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const from_ata= await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log("From Token Account: ", from_ata.address.toBase58());

        // Get the token account of the toWallet address, and if it does not exist, create it
        const to_ata= await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log("To Token Account: ", to_ata.address.toBase58());

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer
        ( 
          connection,
          keypair, 
          from_ata.address,
          to_ata.address,
          keypair.publicKey,
          10*token_decimals
        );
        console.log("Transaction: ", tx);

        // Transfer the new token to the "toTokenAccount" we just created
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();