i:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm run lint

> incia-arvin-wedding-client@1.0.0 lint
> next lint


./src/app/admin/guests/page.tsx
17:17  Warning: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
35:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/admin/media/page.tsx
22:17  Warning: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
40:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
62:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
80:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
137:19  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules

i:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm run lintnpm run type-check
npm error Missing script: "lintnpm"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\syedr\AppData\Local\npm-cache\_logs\2025-08-13T22_17_54_218Z-debug-0.log

> incia-arvin-wedding-client@1.0.0 type-check
> tsc --noEmit


i:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm run build

> incia-arvin-wedding-client@1.0.0 build
> next build

   ▲ Next.js 15.4.5
   - Environments: .env.local, .env.production, .env

   Creating an optimized production build ...
 ✓ Compiled successfully in 11.0s

./src/app/admin/guests/page.tsx
17:17  Warning: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
35:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/admin/media/page.tsx
22:17  Warning: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
40:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
62:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
80:14  Warning: 'err' is defined but never used.  @typescript-eslint/no-unused-vars
137:19  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
 ✓ Linting and checking validity of types 
   Collecting page data  ...Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
    at new <anonymous> (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\chunks\23.js:1:6806)
    at 29991 (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\chunks\23.js:1:6487)
    at c (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\webpack-runtime.js:1:143)
    at 47148 (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\app\api\contact\route.js:1:907)
    at c (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\webpack-runtime.js:1:143)
    at <unknown> (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\app\api\contact\route.js:13:6084)
    at c.X (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\webpack-runtime.js:1:1285)
    at <unknown> (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\app\api\contact\route.js:13:6061)
    at Object.<anonymous> (i:\CodeStorm\Hostinger\Sharothee-Wedding\client\.next\server\app\api\contact\route.js:13:6116)

> Build error occurred
[Error: Failed to collect page data for /api/contact] { type: 'Error' }

i:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm run db:seed

> incia-arvin-wedding-client@1.0.0 db:seed
> tsx prisma/seed.ts

🌱 Starting database seeding...
✅ Created admin user: admin@wedding.com
✅ Created venues: 2
✅ Created events: 4
✅ Created guests: 3
✅ Created RSVPs: 2
✅ Created hotels: 2
✅ Created media items: 2
✅ Created streams: 1
✅ Created contact requests: 2
🎉 Database seeding completed successfully!

i:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm test

> incia-arvin-wedding-client@1.0.0 test
> jest

 FAIL  src/__tests__/api/health-endpoint.test.ts
  ● Test suite failed to run
                                                                              
    ReferenceError: Request is not defined                                    
                                                                              
       9 |     await prisma.$queryRaw`SELECT 1`                               
      10 |                                                                    
    > 11 |     const dbResponseTime = Date.now() - startTime                  
         |                 ^                                                  
      12 |                                                                    
      13 |     // Test each critical model                                    
      14 |     const modelChecks: Record<string, number | 'error'> = {}       

      at Object.Request (node_modules/next/src/server/web/spec-extension/request.ts:14:34)
      at Object.<anonymous> (node_modules/next/server.js:2:16)
      at Object.<anonymous> (src/app/api/health/route.ts:11:17)
      at Object.<anonymous> (src/__tests__/api/health-endpoint.test.ts:5:16)  

 FAIL  src/__tests__/api/health.test.ts
  ● Test suite failed to run                                                  
                                                                              
    ReferenceError: Request is not defined                                    
                                                                              
       9 |     await prisma.$queryRaw`SELECT 1`                               
      10 |                                                                    
    > 11 |     const dbResponseTime = Date.now() - startTime                  
         |                 ^                                                  
      12 |                                                                    
      13 |     // Test each critical model                                    
      14 |     const modelChecks: Record<string, number | 'error'> = {}       

      at Object.Request (node_modules/next/src/server/web/spec-extension/request.ts:14:34)
      at Object.<anonymous> (node_modules/next/server.js:2:16)
      at Object.<anonymous> (src/app/api/health/route.ts:11:17)
      at Object.<anonymous> (src/__tests__/api/health.test.ts:36:16)

 PASS  src/__tests__/ContactPage.test.tsx
 FAIL  src/__tests__/EventsPage.test.tsx
  ● Events Page › displays event timeline structure

    expect(received).toBeGreaterThan(expected)

    Expected: > 0
    Received:   0

      22 |     // Check for timeline elements
      23 |     const timelineElements = container.querySelectorAll('.space-y-12')
    > 24 |     expect(timelineElements.length).toBeGreaterThan(0)
         |                                     ^
      25 |   })
      26 |
      27 |   it('shows event cards with emojis', () => {

      at Object.toBeGreaterThan (src/__tests__/EventsPage.test.tsx:24:37)     

 PASS  src/__tests__/RSVPPage.test.tsx
 PASS  src/__tests__/HomePage.test.tsx

Test Suites: 3 failed, 3 passed, 6 total
Tests:       1 failed, 11 passed, 12 total
Snapshots:   0 total
Time:        8.243 s
Ran all test suites.

i:\CodeStorm\Hostinger\Sharothee-Wedding\client>



I:\CodeStorm\Hostinger\Sharothee-Wedding\client>npm run dev

> incia-arvin-wedding-client@1.0.0 dev
> next dev --turbopack

   ▲ Next.js 15.4.5 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://172.20.10.3:3000
   - Environments: .env.local, .env

 ✓ Starting...
 ✓ Ready in 4.9s
 ○ Compiling / ...
 ✓ Compiled / in 9.9s
 GET / 200 in 12308ms
 ○ Compiling /api/auth/[...nextauth] ...
 ✓ Compiled /api/auth/[...nextauth] in 1197ms
[next-auth][error][JWT_SESSION_ERROR] 
https://next-auth.js.org/errors#jwt_session_error decryption operation failed {
  message: 'decryption operation failed',
  stack: 'JWEDecryptionFailed: decryption operation failed\n' +
    '    at gcmDecrypt (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_jose_dist_node_cjs_b4a80197._.js:769:15)\n' +
    '    at decrypt (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_jose_dist_node_cjs_b4a80197._.js:792:20)\n' + 
    '    at flattenedDecrypt (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_jose_dist_node_cjs_b4a80197._.js:2335:52)\n' +
    '    at async compactDecrypt (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_jose_dist_node_cjs_b4a80197._.js:2391:23)\n' +
    '    at async jwtDecrypt (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_jose_dist_node_cjs_b4a80197._.js:3895:23)\n' +
    '    at async Object.decode (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next-auth_35ecac8a._.js:744:25)\n' +
    '    at async Object.session (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next-auth_35ecac8a._.js:2050:34)\n' +
    '    at async AuthHandler (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next-auth_35ecac8a._.js:3230:37)\n' +
    '    at async NextAuthRouteHandler (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next-auth_35ecac8a._.js:3539:30)\n' +
    '    at async NextAuth._args$ (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next-auth_35ecac8a._.js:3574:24)\n' +
    '    at async AppRouteRouteModule.do (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\compiled\\next-server\\app-route-turbo.runtime.dev.js:5:38782)\n' +
    '    at async AppRouteRouteModule.handle (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\compiled\\next-server\\app-route-turbo.runtime.dev.js:5:45984)\n' +
    '    at async responseGenerator (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next_e792bee7._.js:10103:38)\n' +
    '    at async AppRouteRouteModule.handleResponse (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\compiled\\next-server\\app-route-turbo.runtime.dev.js:1:183770)\n' +
    '    at async handleResponse (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next_e792bee7._.js:10165:32)\n' +
    '    at async handler (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\.next\\server\\chunks\\node_modules_next_e792bee7._.js:10217:13)\n' +       
    '    at async doRender (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:1587:34)\n' +
    '    at async DevServer.renderToResponseWithComponentsImpl (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:1929:13)\n' +
    '    at async DevServer.renderPageComponent (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:2395:24)\n' +
    '    at async DevServer.renderToResponseImpl (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:2435:32)\n' +
    '    at async DevServer.pipeImpl (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:1035:25)\n' +   
    '    at async NextNodeServer.handleCatchallRenderRequest (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\next-server.js:393:17)\n' +
    '    at async DevServer.handleRequestImpl (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\base-server.js:925:17)\n' +
    '    at async I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:398:20\n' +
    '    at async Span.traceAsyncFn (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\trace\\trace.js:157:20)\n' +
    '    at async DevServer.handleRequest (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:394:24)\n' +
    '    at async invokeRender (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\lib\\router-server.js:239:21)\n' +   
    '    at async handleRequest (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\lib\\router-server.js:436:24)\n' +  
    '    at async requestHandlerImpl (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\lib\\router-server.js:464:13)\n' +
    '    at async Server.requestListener (I:\\CodeStorm\\Hostinger\\Sharothee-Wedding\\client\\node_modules\\next\\dist\\server\\lib\\start-server.js:218:13)',
  name: 'JWEDecryptionFailed'
}
 GET /api/auth/session 200 in 3934ms
 ○ Compiling /rsvp ...
 ✓ Compiled /rsvp in 1427ms
 GET /rsvp 200 in 1658ms
 GET /?id=bb96bc5d-6f12-41a5-b586-ca33881aa231&vscodeBrowserReqId=1755123646554 200 in 758ms
 GET /api/auth/session 200 in 233ms
 ○ Compiling /api/rsvp/validate ...
 ✓ Compiled /api/rsvp/validate in 985ms
prisma:query SELECT `main`.`Guest`.`id`, `main`.`Guest`.`name`, `main`.`Guest`.`email`, `main`.`Guest`.`token`, `main`.`Guest`.`country`, `main`.`Guest`.`phone`, `main`.`Guest`.`createdAt`, `main`.`Guest`.`updatedAt` FROM `main`.`Guest` WHERE (`main`.`Guest`.`token` = ? AND 1=1) LIMIT ? OFFSET ?
 POST /api/rsvp/validate 404 in 1525ms
RSVP token validation error: Error [ZodError]: [
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 6,
    "inclusive": true,
    "path": [
      "token"
    ],
    "message": "Token must be at least 6 characters"
  }
]
    at POST (src\app\api\rsvp\validate\route.ts:8:38)
   6 |   try {
   7 |     const body = await request.json()
>  8 |     const { token } = rsvpTokenSchema.parse(body)
     |                                      ^
   9 |
  10 |     const guest = await prisma.guest.findUnique({
  11 |       where: { token: token.toUpperCase() },
 POST /api/rsvp/validate 400 in 790ms