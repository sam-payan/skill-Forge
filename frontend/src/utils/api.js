const BASE_URL = "http://localhost:5000/api";

async function request(url, method, body) {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export default {
  post: (url, body) => request(url, "POST", body)
};
