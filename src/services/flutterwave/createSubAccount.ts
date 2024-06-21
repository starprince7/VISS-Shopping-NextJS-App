import FlutterWave from "./flutterwave.config";


export default async function createSubaccount() {
  const sub_account_details = {
    account_bank: "044",
    account_number: "0690000037",
    business_name: "CodePlug Services",
    business_mobile: "09024847299",
    business_email: "codeplugservices@gmail.com",
    business_contact: "09024847299",
    business_contact_mobile: "09024847299",
    country: "NG",
    split_type: "percentage",
    split_value: 0.2,
  };

  const result = await FlutterWave.Subaccount.create(sub_account_details);
  console.log({ FlutterWaveSubAccount: result });
}

// export default async function getAllNigerianBanks() {
//   const results = await FlutterWave.Bank.country({ country: "NG" });
//   console.log({ NigerianBanksFromFlW: results.data });
// }
