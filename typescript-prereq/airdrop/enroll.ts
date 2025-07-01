import { Connection, Keypair, PublicKey,SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import {Turbin3Prereq} from"./programs/idl";
import idl from "./programs/idl.json"

import { Idl } from "@coral-xyz/anchor";
import wallet from "./turbin3-wallet.json";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log(keypair.publicKey.toString());

// Load keypair


// Setup provider
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed"
});



const program= new Program(idl as Turbin3Prereq, provider);

const account_seeds = [Buffer.from("prereqs"), keypair.publicKey.toBuffer()];

const [account_key, _account_bump] = PublicKey.findProgramAddressSync(
  account_seeds,
  program.programId
);


const mintCollection = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");
const mintTs=Keypair.generate();


const [authority] = PublicKey.findProgramAddressSync(
  [Buffer.from("collection"), mintCollection.toBuffer()],
  program.programId

);

console.log(authority);


/* (async () => {
try {

         const SYSTEM_PROGRAM_ID=SystemProgram.programId;
         const txhash = await program.methods
                                     .initialize("sthitasahu")
                                     .accountsPartial({
                                      user: keypair.publicKey,
                                      account: account_key,
                                      system_program: SYSTEM_PROGRAM_ID,
                                  })
                                     .signers([keypair])
                                     .rpc();
        console.log(`Success! Check out your TX here:
                         https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
}
catch (e) {
  console.error(`Oops, something went wrong: ${e}`);
}
})();
*/
(async () => {
try {
            
      
      const SYSTEM_PROGRAM_ID=SystemProgram.programId;
      const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");
      
      const txhash = await program.methods
                                          .submitTs()
                                          .accountsPartial({
                                           user: keypair.publicKey,
                                           account: account_key,
                                           mint: mintTs.publicKey,
                                           collection: mintCollection,
                                           authority,
                                           mpl_core_program: MPL_CORE_PROGRAM_ID,
                                           system_program: SYSTEM_PROGRAM_ID

                                          })
                                          .signers([keypair, mintTs])
                                          .rpc();
                    console.log(`Success! Check out your TX here:
                                 https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
} 
    catch (e) {
       console.error(`Oops, something went wrong: ${e}`)
    }
})();


