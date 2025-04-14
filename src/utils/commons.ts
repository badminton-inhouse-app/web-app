export const  formatPhoneNumberDots = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  if (cleaned.length === 10) {
    // Format 10-digit numbers
    return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 7)}.${cleaned.slice(7)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    // Format 11-digit numbers starting with country code 1
    return `+${cleaned[0]} ${cleaned.slice(1, 4)}.${cleaned.slice(
      4,
      7
    )}.${cleaned.slice(7)}`;
  } else {
    // Invalid number format, return as-is
    return phoneNumber;
  }
};
