require("dotenv").config();
let apiUrl = "";
let pubKey = "";
let priKey = "";
let contAddr = "";

if (process.env.DEV_ENV === "prod") {
  const {
    MAINNET_API_URL,
    MAINNET_PUBLIC_KEY,
    MAINNET_PRIVATE_KEY,
    MAINNET_CONTRACT_ADDRESS,
  } = process.env;
  apiUrl = MAINNET_API_URL;
  pubKey = MAINNET_PUBLIC_KEY;
  priKey = MAINNET_PRIVATE_KEY;
  contAddr = MAINNET_CONTRACT_ADDRESS;
} else if (process.env.DEV_ENV === "staging") {
  const {
    TESTNET_API_URL,
    TESTNET_PUBLIC_KEY,
    TESTNET_PRIVATE_KEY,
    TESTNET_CONTRACT_ADDRESS,
  } = process.env;
  apiUrl = TESTNET_API_URL;
  pubKey = TESTNET_PUBLIC_KEY;
  priKey = TESTNET_PRIVATE_KEY;
  contAddr = TESTNET_CONTRACT_ADDRESS;
} else {
  const {
    LOCAL_API_URL,
    LOCAL_PUBLIC_KEY,
    LOCAL_PRIVATE_KEY,
    LOCAL_CONTRACT_ADDRESS,
  } = process.env;
  apiUrl = LOCAL_API_URL;
  pubKey = LOCAL_PUBLIC_KEY;
  priKey = LOCAL_PRIVATE_KEY;
  contAddr = LOCAL_CONTRACT_ADDRESS;
}

module.exports = {
  apiUrl: apiUrl,
  pubKey: pubKey,
  priKey: priKey,
  contAddr: contAddr,
};
