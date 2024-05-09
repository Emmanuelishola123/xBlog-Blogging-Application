const encrypt = (string) => {
  return encodeURIComponent(
    Buffer.from(Buffer.from(string.toString()).toString("base64")).toString(
      "hex"
    )
  );
};

const decrypt = (string) => {
  return Buffer.from(
    Buffer.from(decodeURIComponent(string.toString()), "hex").toString(),
    "base64"
  ).toString();
};

module.exports = { encrypt, decrypt };
