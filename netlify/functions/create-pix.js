export default async (event) => {
  console.log(event.body)
  const body = await new Response(event.body).json()
  const amount = body.amount

  const r = await fetch("https://blackcat-wrapper.onrender.com/c001", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  })

  const j = await r.json()
  const pix = j.pix?.qrcode
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pix)}`

  return new Response(JSON.stringify({
    success: true,
    transaction_id: j.id,
    order_id: j.id,
    amount: j.amount / 100,
    status: j.status === "waiting_payment" ? "pending" : j.status,
    created_at: j.createdAt,
    pix_code: pix,
    qr_code_image: qr,
    provider: "blackcat"
  }), {
    headers: { "Content-Type": "application/json" }
  })
}

