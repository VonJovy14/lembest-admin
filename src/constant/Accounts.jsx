export const AccountsData = {
  name: "",
  account_number: "",
  account_name: "",
};

export const Status = [
  { id: "ISSUED", name: "ISSUED" }, // PDC was created or handed out
  { id: "PENDING", name: "PENDING" }, // Waiting to be deposited or encashed
  { id: "DEPOSITED", name: "DEPOSITED" }, // Already deposited, waiting to clear
  { id: "CLEARED", name: "CLEARED" }, // Successfully cleared by bank
  { id: "BOUNCED", name: "BOUNCED" }, // Ay, hindi nag-clear 😬
  { id: "CANCELLED", name: "CANCELLED" }, // Void or replaced
];
