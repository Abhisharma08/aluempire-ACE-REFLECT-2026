Created At: 2026-07-17T07:47:42Z
Completed At: 2026-07-17T07:47:42Z
File Path: `file:///Users/technothriller/Desktop/Follow-up%20Dashboard/README.md`
Total Lines: 1175
Total Bytes: 26928
Showing lines 1 to 800
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: # Contact Follow-up Dashboard
2: 
3: A small internal contact-management and follow-up automation tool built
4: with Next.js, Google Sheets, and n8n.
5: 
6: ## 1. Product Goal
7: 
8: The application allows an admin to:
9: 
10: -   Log in securely.
11: -   Add and manage customer contacts.
12: -   Store contact data in Google Sheets.
13: -   Record a single communication opt-in covering automated email and/or
14:     SMS follow-ups.
15: -   View consent and follow-up status.
16: -   Pause or resume eligible follow-ups.
17: -   Archive contacts without destroying historical records.
18: -   Let contacts unsubscribe through a public unsubscribe page.
19: -   Use n8n to send scheduled follow-up emails and, later, SMS.
20: -   Maintain a communication log for successful and failed sends.
21: 
22: The dashboard manages contacts and displays automation state. Google
23: Sheets is the source of truth. n8n is responsible for scheduled
24: communication.
25: 
26: ------------------------------------------------------------------------
27: 
28: ## 2. V1 Scope
29: 
30: ### Included
31: 
32: -   Admin authentication
33: -   Dashboard overview
34: -   Contact list
35: -   Contact search and status filtering
36: -   Add contact
37: -   View contact
38: -   Edit contact
39: -   Archive contact
40: -   Communication opt-in
41: -   Consent withdrawal
42: -   Follow-up status
43: -   Pause/resume follow-up
44: -   Google Sheets integration
45: -   n8n follow-up automation
46: -   Email sending through n8n
47: -   Communication logs
48: -   Public unsubscribe page
49: -   Secure token-based unsubscribe links
50: -   Basic failure tracking
51: 
52: ### Not Included in V1
53: 
54: -   Full CRM functionality
55: -   Multiple follow-up sequence builder
56: -   Visual email template builder
57: -   Campaign management
58: -   Complex analytics
59: -   Multi-tenant accounts
60: -   Customer portal
61: -   Role-based access control beyond basic admin access
62: -   PostgreSQL/Prisma database
63: -   Redis or background workers inside the Next.js application
64: 
65: SMS can be added after the email workflow is stable. The data and
66: consent model should support both channels from the start.
67: 
68: ------------------------------------------------------------------------
69: 
70: ## 3. Recommended Technology Stack
71: 
72:   -----------------------------------------------------------------------
73:   Layer                               Technology
74:   ----------------------------------- -----------------------------------
75:   Application                         Next.js
76: 
77:   Language                            TypeScript
78: 
79:   UI                                  Tailwind CSS
80: 
81:   Components                          shadcn/ui
82: 
83:   Icons                               Lucide
84: 
85:   Validation                          Zod
86: 
87:   Authentication                      Auth.js with Google OAuth or
88:                                       another simple admin authentication
89:                                       method
90: 
91:   Data Store                          Google Sheets
92: 
93:   Google Integration                  Google Sheets API
94: 
95:   Automation                          n8n
96: 
97:   Email                               Email/SMTP provider connected to
98:                                       n8n
99: 
100:   SMS                                 SMS provider connected to n8n when
101:                                       required
102: 
103:   Deployment                          Vercel or VPS
104:   -----------------------------------------------------------------------
105: 
106: Google API credentials must only be used server-side.
107: 
108: ------------------------------------------------------------------------
109: 
110: ## 4. System Architecture
111: 
112: ``` text
113: Admin
114:   |
115:   v
116: Next.js Dashboard
117:   |
118:   |-- Authentication
119:   |-- Dashboard Analytics
120:   |-- Contact Management
121:   |-- Consent Management
122:   |-- Unsubscribe API
123:   |
124:   v
125: Google Sheets
126:   |
127:   |-- Contacts
128:   |-- Communication_Log
129:   |
130:   ^
131:   |
132: n8n Automation
133:   |
134:   |-- Read eligible contacts
135:   |-- Check consent
136:   |-- Determine follow-up step
137:   |-- Send email/SMS
138:   |-- Write communication log
139:   |-- Update follow-up state
140:   |
141:   v
142: Email / SMS Provider
143: 
144: Customer
145:   |
146:   |-- Receives communication
147:   |
148:   |-- Clicks unsubscribe link
149:   v
150: Public Unsubscribe Page
151:   |
152:   v
153: Next.js Server
154:   |
155:   v
156: Google Sheets
157: ```
158: 
159: ### Responsibility Boundaries
160: 
161: #### Next.js Dashboard
162: 
163: -   Authenticate admins.
164: -   Add, view, edit, search, filter, and archive contacts.
165: -   Manage consent state.
166: -   Pause/resume automation.
167: -   Display follow-up information.
168: -   Serve the public unsubscribe flow.
169: -   Read dashboard statistics.
170: 
171: #### Google Sheets
172: 
173: -   Store contact records.
174: -   Store consent and unsubscribe state.
175: -   Store automation state.
176: -   Store communication logs.
177: 
178: #### n8n
179: 
180: -   Run scheduled workflows.
181: -   Select contacts due for follow-up.
182: -   Re-check consent immediately before sending.
183: -   Send email/SMS.
184: -   Record successful and failed communication.
185: -   Advance the follow-up sequence.
186: 
187: The Next.js application should not be responsible for scheduled email
188: delivery.
189: 
190: ------------------------------------------------------------------------
191: 
192: ## 5. Core Product Screens
193: 
194: ### 5.1 Login
195: 
196: Secure admin-only access.
197: 
198: For a small internal tool, Google OAuth restricted to approved email
199: addresses is recommended.
200: 
201: ### 5.2 Dashboard
202: 
203: Display four primary metrics:
204: 
205: -   Total Contacts
206: -   Opted-In Contacts
207: -   Communications Sent
208: -   Follow-ups Due Today
209: 
210: Also display the latest 5-10 contacts.
211: 
212: Example:
213: 
214: ``` text
215: Dashboard                              + Add Contact
216: 
217: Total Contacts    Opted In    Communications Sent    Due Today
218: 1,248             842          3,420                  24
219: 
220: Recent Contacts
221: ---------------------------------------------------------------
222: Contact       Company     Consent     Status       Added
223: Rahul Sharma  Acme        Opted In    Active       Today
224: Amit Kumar    XYZ         No Consent  No Consent   Yesterday
225: ```
226: 
227: ### 5.3 Contacts
228: 
229: Main contact-management screen.
230: 
231: Columns:
232: 
233: -   Contact
234: -   Company
235: -   Email
236: -   Phone
237: -   City
238: -   Consent
239: -   Status
240: -   Follow-up Step
241: -   Next Follow-up
242: -   Added Date
243: -   Actions
244: 
245: Search by:
246: 
247: -   Name
248: -   Email
249: -   Phone
250: -   Company
251: -   City
252: 
253: Filters:
254: 
255: -   All
256: -   Active
257: -   Paused
258: -   Completed
259: -   Failed
260: -   No Consent
261: -   Unsubscribed
262: -   Archived
263: 
264: Actions:
265: 
266: -   View
267: -   Edit
268: -   Pause Follow-up
269: -   Resume Follow-up
270: -   Remove Consent
271: -   Archive
272: 
273: ### 5.4 Add Contact
274: 
275: Use a right-side drawer.
276: 
277: Fields:
278: 
279: -   Name (required)
280: -   Email
281: -   Phone Number
282: -   Company
283: -   City
284: -   Communication Consent
285: 
286: Consent checkbox:
287: 
288: > Customer has opted in to receive follow-up communications via email
289: > and/or SMS.
290: 
291: Rules:
292: 
293: -   A contact can be saved without consent.
294: -   No automated communication is allowed without consent.
295: -   At least one usable communication destination should exist before
296:     automation can run.
297: -   Email must be validated when provided.
298: -   Phone numbers should be normalized when provided.
299: -   Duplicate email and/or phone checks should run before creating a
300:     contact.
301: 
302: ### 5.5 Contact Details
303: 
304: Display:
305: 
306: -   Name
307: -   Email
308: -   Phone
309: -   Company
310: -   City
311: -   Consent status
312: -   Contact status
313: -   Created date
314: -   Follow-up progress
315: -   Last communication
316: -   Next scheduled follow-up
317: -   Communication history
318: 
319: Actions:
320: 
321: -   Edit
322: -   Pause
323: -   Resume
324: -   Remove Consent
325: -   Archive
326: 
327: ### 5.6 Unsubscribe Page
328: 
329: Public route:
330: 
331: ``` text
332: /unsubscribe?token=<secure-token>
333: ```
334: 
335: Do not expose a raw email address or contact ID in the unsubscribe URL.
336: 
337: Suggested flow:
338: 
339: ``` text
340: Customer clicks unsubscribe
341:         |
342:         v
343: Validate secure token
344:         |
345:         v
346: Show unsubscribe confirmation
347:         |
348:         v
349: Customer confirms
350:         |
351:         v
352: Update contact:
353: opt_in = FALSE
354: status = UNSUBSCRIBED
355: unsubscribed_at = current timestamp
356: next_followup_at = empty
357:         |
358:         v
359: Show success confirmation
360: ```
361: 
362: Because V1 uses one global communication consent, unsubscribing stops
363: all automated email and SMS communication.
364: 
365: ------------------------------------------------------------------------
366: 
367: ## 6. Contact Status Model
368: 
369: Use the following statuses:
370: 
371: ### `ACTIVE`
372: 
373: Contact has valid consent and is eligible for automated follow-ups.
374: 
375: ### `PAUSED`
376: 
377: Contact has consent, but automation has been manually paused.
378: 
379: ### `COMPLETED`
380: 
381: The configured follow-up sequence has finished.
382: 
383: ### `FAILED`
384: 
385: Automation encountered a failure requiring attention after the
386: configured retry policy.
387: 
388: ### `NO_CONSENT`
389: 
390: The contact has not provided communication consent.
391: 
392: ### `UNSUBSCRIBED`
393: 
394: The contact previously had consent but explicitly withdrew it.
395: 
396: ### `ARCHIVED`
397: 
398: The contact has been removed from normal operational views but retained
399: for history.
400: 
401: `NO_CONSENT` and `UNSUBSCRIBED` must remain separate states.
402: 
403: ------------------------------------------------------------------------
404: 
405: ## 7. Google Sheets Structure
406: 
407: Create one spreadsheet with at least two worksheets.
408: 
409: ### 7.1 `Contacts`
410: 
411: Recommended columns:
412: 
413:   Column                Description
414:   --------------------- ------------------------------
415:   `id`                  UUID generated by the server
416:   `name`                Customer name
417:   `email`               Customer email
418:   `phone`               Customer phone
419:   `company`             Company
420:   `city`                City
421:   `opt_in`              TRUE/FALSE
422:   `opt_in_at`           Time consent was recorded
423:   `unsubscribed_at`     Time consent was withdrawn
424:   `unsubscribe_token`   Secure random token
425:   `status`              Contact status
426:   `current_step`        Current follow-up step
427:   `next_followup_at`    Next scheduled follow-up
428:   `last_followup_at`    Last successful follow-up
429:   `created_at`          Creation timestamp
430:   `updated_at`          Last update timestamp
431:   `archived_at`         Archive timestamp
432: 
433: For a contact created without consent:
434: 
435: ``` text
436: opt_in = FALSE
437: opt_in_at = empty
438: status = NO_CONSENT
439: current_step = 0
440: next_followup_at = empty
441: ```
442: 
443: For an opted-in contact:
444: 
445: ``` text
446: opt_in = TRUE
447: opt_in_at = current timestamp
448: status = ACTIVE
449: current_step = 0
450: next_followup_at = first scheduled follow-up
451: ```
452: 
453: For an unsubscribed contact:
454: 
455: ``` text
456: opt_in = FALSE
457: status = UNSUBSCRIBED
458: unsubscribed_at = current timestamp
459: next_followup_at = empty
460: ```
461: 
462: Do not delete `opt_in_at` when someone unsubscribes. Keeping both
463: `opt_in_at` and `unsubscribed_at` provides a basic consent history.
464: 
465: ### 7.2 `Communication_Log`
466: 
467: Recommended columns:
468: 
469:   Column                  Description
470:   ----------------------- -----------------------------------
471:   `id`                    Unique log UUID
472:   `contact_id`            Contact UUID
473:   `channel`               EMAIL or SMS
474:   `step`                  Follow-up step
475:   `status`                SENT or FAILED
476:   `recipient`             Email address or phone used
477:   `sent_at`               Successful send timestamp
478:   `attempted_at`          Attempt timestamp
479:   `error`                 Failure details
480:   `provider_message_id`   Provider reference when available
481: 
482: Never treat a send as successful until the provider operation succeeds.
483: 
484: ------------------------------------------------------------------------
485: 
486: ## 8. Consent Rules
487: 
488: Consent is a hard gate.
489: 
490: Before any automated email or SMS:
491: 
492: ``` text
493: opt_in == TRUE
494: AND
495: status == ACTIVE
496: ```
497: 
498: If either condition is false, do not send.
499: 
500: The n8n workflow must re-check consent immediately before each send. It
501: must not rely only on consent status captured when the sequence
502: originally started.
503: 
504: ### Consent Added
505: 
506: When consent changes from FALSE to TRUE:
507: 
508: ``` text
509: opt_in = TRUE
510: opt_in_at = current timestamp
511: unsubscribed_at = empty only if business rules permit re-subscription
512: status = ACTIVE
513: next_followup_at = calculated start time
514: ```
515: 
516: Re-subscribing an explicitly unsubscribed contact should require a new
517: affirmative opt-in action. Do not automatically reactivate unsubscribed
518: contacts.
519: 
520: ### Consent Removed by Admin
521: 
522: ``` text
523: opt_in = FALSE
524: status = NO_CONSENT
525: next_followup_at = empty
526: updated_at = current timestamp
527: ```
528: 
529: If the person explicitly requested removal, prefer `UNSUBSCRIBED` rather
530: than `NO_CONSENT`.
531: 
532: ### Customer Unsubscribes
533: 
534: ``` text
535: opt_in = FALSE
536: status = UNSUBSCRIBED
537: unsubscribed_at = current timestamp
538: next_followup_at = empty
539: updated_at = current timestamp
540: ```
541: 
542: ------------------------------------------------------------------------
543: 
544: ## 9. Unsubscribe Security Design
545: 
546: Generate a cryptographically secure random unsubscribe token when
547: creating the contact.
548: 
549: Example conceptual URL:
550: 
551: ``` text
552: https://your-domain.com/unsubscribe?token=<random-secure-token>
553: ```
554: 
555: Never use:
556: 
557: ``` text
558: /unsubscribe?email=customer@example.com
559: ```
560: 
561: or predictable sequential contact IDs.
562: 
563: ### Unsubscribe Endpoint Responsibilities
564: 
565: 1.  Receive token.
566: 2.  Find matching contact.
567: 3.  Reject invalid tokens.
568: 4.  Display confirmation without exposing unnecessary personal
569:     information.
570: 5.  On confirmation, re-validate the token.
571: 6.  Set `opt_in = FALSE`.
572: 7.  Set `status = UNSUBSCRIBED`.
573: 8.  Set `unsubscribed_at`.
574: 9.  Clear `next_followup_at`.
575: 10. Return a success page.
576: 
577: Unsubscribe should not require the customer to log in.
578: 
579: Consider making the unsubscribe operation idempotent: clicking the link
580: again should safely show that the contact is already unsubscribed.
581: 
582: ------------------------------------------------------------------------
583: 
584: ## 10. API Design
585: 
586: Suggested V1 endpoints:
587: 
588: ``` text
589: GET    /api/contacts
590: POST   /api/contacts
591: 
592: GET    /api/contacts/:id
593: PATCH  /api/contacts/:id
594: 
595: POST   /api/contacts/:id/pause
596: POST   /api/contacts/:id/resume
597: POST   /api/contacts/:id/remove-consent
598: POST   /api/contacts/:id/archive
599: 
600: GET    /api/dashboard
601: 
602: GET    /api/unsubscribe?token=...
603: POST   /api/unsubscribe
604: ```
605: 
606: Alternatively, Next.js Server Actions can replace some internal CRUD
607: endpoints.
608: 
609: ### Example Create Contact Payload
610: 
611: ``` json
612: {
613:   "name": "Rahul Sharma",
614:   "email": "rahul@example.com",
615:   "phone": "+919876543210",
616:   "company": "Acme",
617:   "city": "Gurgaon",
618:   "optIn": true
619: }
620: ```
621: 
622: The server generates:
623: 
624: -   `id`
625: -   `unsubscribe_token`
626: -   `opt_in_at`
627: -   `status`
628: -   `current_step`
629: -   `next_followup_at`
630: -   `created_at`
631: -   `updated_at`
632: 
633: Never trust the browser to generate authoritative consent timestamps or
634: automation status.
635: 
636: ------------------------------------------------------------------------
637: 
638: ## 11. n8n Follow-up Workflow
639: 
640: Recommended main workflow:
641: 
642: ``` text
643: Schedule Trigger
644: Every 30-60 minutes
645:         |
646:         v
647: Read Contacts from Google Sheets
648:         |
649:         v
650: Filter:
651: opt_in = TRUE
652: status = ACTIVE
653: next_followup_at <= NOW
654:         |
655:         v
656: Loop Through Eligible Contacts
657:         |
658:         v
659: Read/Re-check Current Contact State
660:         |
661:         v
662: Check Again:
663: opt_in = TRUE?
664: status = ACTIVE?
665:         |
666:         +---- NO ----> Skip
667:         |
668:        YES
669:         |
670:         v
671: Determine current_step
672:         |
673:         v
674: Select Template
675:         |
676:         v
677: Send Email/SMS
678:         |
679:         v
680: Successful?
681:      /       \
682:    YES        NO
683:     |          |
684:     v          v
685: Write SENT   Write FAILED
686: Log          Log
687:     |          |
688:     v          v
689: Update       Retry according
690: Contact      to policy
691:     |
692:     v
693: Increment current_step
694:     |
695:     v
696: Update last_followup_at
697:     |
698:     v
699: Calculate next_followup_at
700:     |
701:     v
702: Final Step?
703:    /    \
704:  YES     NO
705:   |       |
706:   v       v
707: COMPLETED ACTIVE
708: ```
709: 
710: ### Critical Rule
711: 
712: The workflow must re-read or re-check the latest consent/status
713: immediately before sending. This prevents a queued follow-up from being
714: sent after the customer unsubscribes.
715: 
716: ------------------------------------------------------------------------
717: 
718: ## 12. Follow-up Sequence
719: 
720: Do not build a visual sequence editor in V1.
721: 
722: Configure the sequence in n8n.
723: 
724: Example:
725: 
726:   Step   Timing                 Purpose
727:   ------ ---------------------- ------------------
728:   1      Initial eligible run   Introduction
729:   2      +2 days                First follow-up
730:   3      +5 days                Second follow-up
731:   4      +10 days               Final follow-up
732: 
733: Exact timing and templates can be changed in n8n.
734: 
735: Every email should include the contact-specific unsubscribe link.
736: 
737: ------------------------------------------------------------------------
738: 
739: ## 13. Suggested Next.js Project Structure
740: 
741: ``` text
742: app/
743: ├── login/
744: │   └── page.tsx
745: │
746: ├── (dashboard)/
747: │   ├── layout.tsx
748: │   ├── page.tsx
749: │   │
750: │   ├── contacts/
751: │   │   ├── page.tsx
752: │   │   └── [id]/
753: │   │       └── page.tsx
754: │   │
755: │   └── settings/
756: │       └── page.tsx
757: │
758: ├── unsubscribe/
759: │   └── page.tsx
760: │
761: └── api/
762:     ├── contacts/
763:     │   ├── route.ts
764:     │   └── [id]/
765:     │       └── route.ts
766:     │
767:     ├── dashboard/
768:     │   └── route.ts
769:     │
770:     └── unsubscribe/
771:         └── route.ts
772: 
773: components/
774: ├── dashboard/
775: ├── contacts/
776: ├── forms/
777: ├── layout/
778: └── ui/
779: 
780: lib/
781: ├── auth.ts
782: ├── google-sheets.ts
783: ├── contacts.ts
784: ├── consent.ts
785: ├── unsubscribe.ts
786: ├── validation.ts
787: └── utils.ts
788: 
789: types/
790: ├── contact.ts
791: └── communication.ts
792: ```
793: 
794: ------------------------------------------------------------------------
795: 
796: ## 14. Validation and Data Integrity
797: 
798: ### Contact Validation
799: 
800: -   Name is required.
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.

