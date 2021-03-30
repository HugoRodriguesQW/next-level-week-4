export interface FetchProps {
  id: string;
  token: string;
  action: string;
  update: {};
}

export default async function Fetch(commands: FetchProps){

  const response = await fetch('https://nlw4-hugorodriguesqw.vercel.app/api/database', {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(commands),
    })
    const values = await response.json()
    if(values.error) {return null}
    return values
}