import wallet from "/home/sthita/.config/solana/id.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("FeLJuhRgrw4Uak8EAVHeD43HTqaGb4WatGv5hRm27rk7")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
          let accounts: CreateMetadataAccountV3InstructionAccounts = {
             mint,
             mintAuthority: signer
         }

         let data: DataV2Args = {
              name:"Sthita",
              symbol:"Sth",
              uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fdog%2F&psig=AOvVaw3mMkNF5oRPGANcP7Xj88ty&ust=1751570570098000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjkpv7yno4DFQAAAAAdAAAAABAE",
              sellerFeeBasisPoints:500,
              creators:null,
              collection:null,
              uses:null,
           
          }

           let args: CreateMetadataAccountV3InstructionArgs = {
               data:data,
               isMutable:true,
               collectionDetails:null            
            }

          let  tx = createMetadataAccountV3(
             umi,
             {
                 ...accounts,
                 ...args
             }
        )

         let result = await tx.sendAndConfirm(umi);
         console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
