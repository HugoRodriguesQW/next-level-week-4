import { User, DatabaseAction, DatabaseUpdate } from "./database"

export interface FetchProps extends DatabaseAction, DatabaseUpdate  {
  id: string;
  token: string;
  username?: string;
  user?: User;
}

export default async function Fetch(commands: FetchProps){
  if(!commands.id && !commands.token) return null
  console.info()

  const response = await fetch(`${window.location.origin}/api/database`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin'
      },
      body: JSON.stringify(commands),
    })
    const values = await response.json()
    if(values.error) {return null}
    return values
}