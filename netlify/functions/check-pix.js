export default async (event) => {
  const id = event.url.split("/").pop()

  const r = await fetch(`https://blackcat-wrapper.onrender.com/c001/${id}`)
  const j = await r.json()

  return new Response(JSON.stringify({
    success: true,
    status: j.status === "waiting_payment" ? "pending" : j.status,
    transaction_id: j.id
  }), {
    headers: { "Content-Type": "application/json" }
  })
}
