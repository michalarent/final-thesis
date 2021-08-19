import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
import apiEndpoint from "../../../common/api";

const generateToken = () => {
  return new AccessToken(
    "AC5433e915ea500e9a6937c362eee1bdc6",
    "SKdb8816d8ec5a29e195a37cb4ffad87f7",
    "5Zath7p9RHaoGqyBeVq5fzzCvkwEXgud"
  );
};

const videoToken = (identity, room) => {
  let videoGrant;
  if (typeof room !== "undefined") {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken();
  console.log(token);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

export default apiEndpoint({
  POST: async ({ identity, room }) => {
    console.log(identity);
    const token = videoToken(identity, room);
    return JSON.stringify({ token: token.toJwt() });
  },
  GET: async ({ identity, room }) => {
    console.log(identity);
    const token = videoToken(identity, room);
    return JSON.stringify({ token: token.toJwt() });
  },
});
