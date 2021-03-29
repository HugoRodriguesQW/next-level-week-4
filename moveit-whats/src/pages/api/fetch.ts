
export interface FetchProps {
  id: string;
  token: string;
  action: string;
  update: {};
}

export default async function Fetch(commands: FetchProps){
  const response = await fetch('https://3000-black-heron-1zyeddhd.ws-us03.gitpod.io/api/database', {
      method: "POST",
      headers: {'Content-Type': 'multipart/form-data'},
      body: JSON.stringify(commands),
    })

    const values = await response.json()
    return values
}
 