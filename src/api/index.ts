import { useRecoilValue } from "recoil";
import { backlogConfig } from "../components/SetupForm/atom";
import { useSetConsole } from "../components/Console/atom";
import { delay } from "../utilities/delay";

type Method = "GET" | "POST" | "PUT" | "DELETE";
export const useApi = () => {
  const setConsole = useSetConsole();
  const config = useRecoilValue(backlogConfig);
  const endpoint = `https://${config.spaceKey}.backlog.jp/api/v2`;
  return (method: Method, path: string, body?: unknown) =>
    fetch(`${endpoint}${path}?apiKey=${config.apiKey}`, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    }).then(async (res) => {
      if (res.status === 429) {
        setConsole(`Notice: レート制限のため処理を一時停止します。１分間お待ちください。🙇`);
        await delay(60000);
        setConsole(`Notice: 処理を再開します。🙋`);
      }
      if (res.ok) return res;
      const body = (await res.json()) as ErrorBody;
      const reason = body.errors
        .map((e) => `${errorCode[e.code]}: ${e.message}`)
        .join("\n");
      setConsole(reason);
      throw Error(reason);
    });
};

const errorCode = {
  1: "InternalError",
  2: "LicenceError",
  3: "LicenceExpiredError",
  4: "AccessDeniedError",
  5: "UnauthorizedOperationError",
  6: "NoResourceError",
  7: "InvalidRequestError",
  8: "SpaceOverCapacityError",
  9: "ResourceOverflowError",
  10: "TooLargeFileError",
  11: "AuthenticationError",
  12: "RequiredMFAError",
  13: "TooManyRequestsError",
} as const;
type ErrorCode = keyof typeof errorCode;

interface ErrorBody {
  errors: {
    code: ErrorCode;
    message: string;
    moreInfo: string;
  }[];
}
