# Sharothee Wedding Website Bug and Issue Listing

## 1. Website Bug Report: RSVP Submission Fails Due to Missing Email API Key

### Route: `http://172.20.10.3:3000/rsvp`

#### Bug Title: RSVP Submission Fails with 500 Internal Server Error (Missing Resend API Key)

#### Description:
Submitting an RSVP on the RSVP page triggers a 500 Internal Server Error. The error is caused by a missing Resend API key, resulting in the failure of email notifications for RSVP submissions. The console repeatedly logs `Error: Missing API key. Pass it to the constructor new Resend("re_123")`.

#### File Path: (Potentially affected files)
- `client\src\app\rsvp\page.tsx`
- `client\src\app\api\rsvp\submit\route.ts`
- `client\src\lib\email.ts`

#### Console/Error Output:
```text
POST http://172.20.10.3:3000/api/rsvp/submit 500 (Internal Server Error)
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```
```javascript
const resend = new Resend(process.env.RESEND_API_KEY);
```
UI Error: RSVP submission fails, no confirmation email sent.

#### Network Headers:
- Request Method: POST
- Status Code: 500 Internal Server Error

#### Severity:
- [x] Critical
- [ ] Major
- [ ] Minor

#### Additional Notes:
- Ensure `RESEND_API_KEY` is set in `.env.local` before building and running the app.
- Validate error handling in RSVP API route to prevent leaking stack traces to the client.
- Confirm email notification logic is only triggered when API key is present.

---


## 2. Website Bug Report: Contact Page Email API Key Missing

### Route: `http://172.20.10.3:3000/contact`

#### Bug Title: Contact Form Submission Fails Due to Missing Email API Key

#### Description:
Submitting the contact form results in multiple errors, including a runtime error for a missing Resend API key. The API responds with a 500 Internal Server Error and the console shows a SyntaxError due to invalid JSON.

#### File Path: (Potentially affected files)
- `client\src\app\contact\page.tsx`
- `client\src\app\api\contact\route.ts`
- `client\src\lib\email.ts`

#### Console/Error Output:
```text
POST http://172.20.10.3:3000/api/contact 500 (Internal Server Error)
Console SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```
```text
Runtime Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```

#### Severity:
- [x] Critical
- [ ] Major
- [ ] Minor

#### Additional Notes:
- Ensure `RESEND_API_KEY` is set in `.env.local` before building and running the app.
- Validate API error handling and response formatting for the contact form.

---

## 3. Website Bug Report: Admin Media Approval and API Method Error

### Route: `http://172.20.10.3:3000/admin/media`

#### Bug Title: Media Approval Fails with 405 Method Not Allowed

#### Description:
Attempting to approve a media item via the admin media page results in a `405 Method Not Allowed` error. The PUT request to `/api/media/[mediaId]` fails, preventing media approval and displaying "Failed to update media item" in the UI.

#### File Path: (Potentially affected files)
- `client\src\app\admin\media\page.tsx`
- `client\src\app\api\media\[mediaId]\route.ts`

#### Console/Error Output:
```text
PUT http://172.20.10.3:3000/api/media/local-0-PHOTO-2025-04-10-01-25-39.JPG 405 (Method Not Allowed)
```
```javascript
const response = await fetch(`/api/media/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approved: !approved }),
});
```
UI Error: `Failed to update media item`

#### Network Headers:
- Request Method: PUT
- Status Code: 405 Method Not Allowed

#### Severity:
- [ ] Critical
- [x] Major
- [ ] Minor

#### Additional Notes:
- Ensure the API route `/api/media/[mediaId]` supports the PUT method for approval toggling.
- Confirm correct implementation of dynamic API routes in Next.js App Router.

---