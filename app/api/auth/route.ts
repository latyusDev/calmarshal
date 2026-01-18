import { nylasConfig,nylas} from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export async function GET(){
  const authUrl = nylas.auth.urlForOAuth2({
    redirectUri: nylasConfig.redirectUri,
    clientId:nylasConfig.clientId,
  })
  return redirect(authUrl)
}