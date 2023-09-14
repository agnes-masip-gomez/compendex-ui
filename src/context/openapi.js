const openai = require("openai");
const base64 = require("base-64");
const os = require("os");

const setOpenAIKey = () => {
  const encodeString = "b'c2stUzVHb2V3ankySzJ0eVpBalRSem9UM0JsYmtGSmpTVEFGb3FMWDl2Y3g1SGdhNHcz'";
  const decodeString = base64.decode(encodeString);
  os.environ["OPENAI_API_KEY"] = decodeString;
  openai.api_key = os.getenv("OPENAI_API_KEY");
};

module.exports = setOpenAIKey;
