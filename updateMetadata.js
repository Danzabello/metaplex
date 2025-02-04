import { Metaplex, keypairIdentity, PublicKey } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import fs from "fs";

// Load your wallet keypair (update path if needed)
const WALLET_PATH = "/home/zello/.config/solana/id.json";
const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync(WALLET_PATH, "utf8")))
);

// Setup Solana connection
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

// Token mint address (converted to PublicKey)
const tokenMintAddress = new PublicKey("qt4V1ve95kszQWKy5mrgcJ3EH6D56Fg6aJB55QTpump");

// Updated metadata
const metadataUri = "https://ipfs.io/ipfs/bafybeid7ljkgvlmv2siebkc4o436qi4gflohrekrxen2ppxdqiixeagule"; // Your metadata JSON link

async function updateMetadata() {
  try {
    // Fetch the NFT
    const nft = await metaplex.nfts().findByMint({ mintAddress: tokenMintAddress });

    // Update metadata
    const { response } = await metaplex.nfts().update({
      nftOrSft: nft,
      uri: metadataUri, // New metadata link
      name: "Drake Meme Coin",
      symbol: "DRAKE",
    });

    console.log("✅ Metadata updated successfully:", response);
  } catch (error) {
    console.error("❌ Error updating metadata:", error);
  }
}

updateMetadata();
