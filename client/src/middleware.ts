export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/(dashboard|guests|events|media|hotels|streams|contacts|settings)(.*)?",
  ],
};
