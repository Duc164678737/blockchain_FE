/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    CHAIN_NETWORK: process.env.CHAIN_NETWORK,
    BASE_SERVICE_URL: process.env.BASE_SERVICE_URL,
    ADDRESS_NFT_CARD_MARKETPLACE: process.env.ADDRESS_NFT_CARD_MARKETPLACE,
    ADDRESS_NFT_CARD: process.env.ADDRESS_NFT_CARD,
    ADDRESS_NFT_BOX: process.env.ADDRESS_NFT_BOX,
    ADDRESS_NFT_EMOTE: process.env.ADDRESS_NFT_EMOTE,
    ADDRESS_NFT_TOWER_SKIN: process.env.ADDRESS_NFT_TOWER_SKIN,
    ADDRESS_TOY_TOKEN: process.env.ADDRESS_TOY_TOKEN,
    ADDRESS_STAKING_CARD: process.env.ADDRESS_STAKING_CARD,
    ADDRESS_STAKING_BOX: process.env.ADDRESS_STAKING_BOX,
    ADDRESS_STAKING_EMOTE: process.env.ADDRESS_STAKING_EMOTE,
    ADDRESS_STAKING_TOWER_SKIN: process.env.ADDRESS_STAKING_TOWER_SKIN,
    ADDRESS_MINT_CARD: process.env.ADDRESS_MINT_CARD
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_SERVICE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
