
export default async (event) => {
  console.log(event)
  const cpf = event.url.split("/").pop()

  const r = await fetch(`https://searchapi.dnnl.live/consulta?cpf=${cpf}&token_api=7625`)
  const j = await r.json()
  const d = j.dados?.[0]

  return new Response(JSON.stringify({
    DADOS: {
      cpf: d.CPF,
      nome: d.NOME,
      nome_mae: d.NOME_MAE,
      data_nascimento: d.NASC,
      sexo: d.SEXO?.[0]
    }
  }), {
    headers: { "Content-Type": "application/json" }
  })
}

