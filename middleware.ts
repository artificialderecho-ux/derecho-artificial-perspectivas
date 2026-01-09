// middleware.ts - Protección con usuario y contraseña (compatible con Vite + Vercel)

export default function middleware(request: Request) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    // Cambia aquí el usuario y contraseña si quieres otros
    if (user === "acceso" && pwd === "derechoartificial") {
      return fetch(request);
    }
  }

  return new Response("Acceso restringido", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Área protegida"',
    },
  });
}

export const config = {
  matcher: "/:path*",
};
