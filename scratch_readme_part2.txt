Created At: 2026-07-17T07:47:51Z
Completed At: 2026-07-17T07:47:51Z
File Path: `file:///Users/technothriller/Desktop/Follow-up%20Dashboard/README.md`
Total Lines: 1175
Total Bytes: 26928
Showing lines 800 to 1175
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
800: -   Name is required.
801: -   Validate email when provided.
802: -   Normalize email to lowercase.
803: -   Trim all text input.
804: -   Normalize phone numbers.
805: -   Require an appropriate destination before activating communication.
806: -   Check duplicate email.
807: -   Check duplicate phone where appropriate.
808: 
809: ### Duplicate Handling
810: 
811: Do not silently create duplicate opted-in contacts. Duplicate records
812: could cause duplicate automated messages.
813: 
814: When a possible duplicate is found, show the admin the existing contact
815: and allow an intentional update instead.
816: 
817: ### Google Sheets Concurrency
818: 
819: Google Sheets is acceptable for this small internal tool, but it is not
820: a transactional database.
821: 
822: Design updates around stable UUIDs rather than sheet row numbers because
823: rows can move when sorted or edited.
824: 
825: ------------------------------------------------------------------------
826: 
827: ## 15. Authentication and Security
828: 
829: -   Restrict dashboard access to approved admins.
830: -   Keep Google service-account credentials server-side.
831: -   Keep n8n credentials secure.
832: -   Never expose SMTP/API credentials in the frontend.
833: -   Validate all server-side input with Zod.
834: -   Protect admin API routes with authentication.
835: -   Rate-limit public unsubscribe endpoints if abuse becomes an issue.
836: -   Use secure random unsubscribe tokens.
837: -   Do not log secrets.
838: -   Do not expose the Google Sheet publicly.
839: 
840: ------------------------------------------------------------------------
841: 
842: # 16. Building Order
843: 
844: Build the product in phases. Do not start with automation.
845: 
846: ## Phase 1 --- Project Foundation
847: 
848: 1.  Create the Next.js TypeScript project.
849: 2.  Install and configure Tailwind CSS.
850: 3.  Add shadcn/ui.
851: 4.  Add Lucide icons.
852: 5.  Create the base dashboard layout.
853: 6.  Create sidebar and header.
854: 7.  Configure environment variables.
855: 8.  Set up admin authentication.
856: 9.  Protect dashboard routes.
857: 
858: **Milestone:** Admin can log in and access an empty dashboard.
859: 
860: ------------------------------------------------------------------------
861: 
862: ## Phase 2 --- Google Sheets Data Layer
863: 
864: 1.  Create the Google spreadsheet.
865: 2.  Create `Contacts`.
866: 3.  Create `Communication_Log`.
867: 4.  Configure Google Cloud project.
868: 5.  Enable Google Sheets API.
869: 6.  Create service account/credentials.
870: 7.  Share the spreadsheet with the service account.
871: 8.  Build the server-side Google Sheets client.
872: 9.  Build functions to read contacts.
873: 10. Build functions to append contacts.
874: 11. Build functions to find contacts by UUID.
875: 12. Build functions to update contacts by UUID.
876: 13. Test read/write operations.
877: 
878: **Milestone:** Next.js can securely read and write contact data to
879: Google Sheets.
880: 
881: ------------------------------------------------------------------------
882: 
883: ## Phase 3 --- Contact Creation
884: 
885: 1.  Build Add Contact drawer.
886: 2.  Create Zod validation schema.
887: 3.  Normalize email and phone values.
888: 4.  Add duplicate detection.
889: 5.  Add the single communication opt-in checkbox.
890: 6.  Generate contact UUID server-side.
891: 7.  Generate secure unsubscribe token.
892: 8.  Generate timestamps.
893: 9.  Set initial status based on consent.
894: 10. Write contact to Google Sheets.
895: 11. Add success/error feedback.
896: 
897: **Milestone:** Admin can add a contact and see the row appear correctly
898: in Google Sheets.
899: 
900: ------------------------------------------------------------------------
901: 
902: ## Phase 4 --- Contact Management
903: 
904: 1.  Build Contacts table.
905: 2.  Load contacts from Google Sheets.
906: 3.  Add search.
907: 4.  Add status filters.
908: 5.  Build Contact Details screen.
909: 6.  Build Edit Contact.
910: 7.  Add Pause action.
911: 8.  Add Resume action.
912: 9.  Add Remove Consent action.
913: 10. Add Archive action.
914: 11. Display consent state clearly.
915: 
916: **Milestone:** Admin can fully manage contacts without manually editing
917: Google Sheets.
918: 
919: ------------------------------------------------------------------------
920: 
921: ## Phase 5 --- Dashboard
922: 
923: 1.  Calculate total contacts.
924: 2.  Calculate opted-in contacts.
925: 3.  Calculate communications sent from `Communication_Log`.
926: 4.  Calculate follow-ups due today.
927: 5.  Display recent contacts.
928: 6.  Add quick Add Contact action.
929: 
930: **Milestone:** Dashboard provides a useful operational overview.
931: 
932: ------------------------------------------------------------------------
933: 
934: ## Phase 6 --- Unsubscribe System
935: 
936: 1.  Build `/unsubscribe` public page.
937: 2.  Read secure token from URL.
938: 3.  Validate token server-side.
939: 4.  Build confirmation UI.
940: 5.  Build unsubscribe server action/API.
941: 6.  Re-check token on submission.
942: 7.  Set `opt_in = FALSE`.
943: 8.  Set `status = UNSUBSCRIBED`.
944: 9.  Set `unsubscribed_at`.
945: 10. Clear `next_followup_at`.
946: 11. Build already-unsubscribed state.
947: 12. Build invalid-link state.
948: 13. Build success confirmation page.
949: 14. Test repeated unsubscribe requests.
950: 
951: **Milestone:** A customer can securely unsubscribe without logging in,
952: and the contact becomes immediately ineligible for automation.
953: 
954: ------------------------------------------------------------------------
955: 
956: ## Phase 7 --- n8n Email Automation
957: 
958: 1.  Create scheduled n8n workflow.
959: 2.  Connect Google Sheets.
960: 3.  Read eligible contacts.
961: 4.  Filter `opt_in = TRUE`.
962: 5.  Filter `status = ACTIVE`.
963: 6.  Filter contacts whose `next_followup_at` is due.
964: 7.  Loop through contacts.
965: 8.  Re-check latest consent and status.
966: 9.  Determine follow-up step.
967: 10. Select email template.
968: 11. Generate contact-specific unsubscribe URL.
969: 12. Send email.
970: 13. Write success to `Communication_Log`.
971: 14. Update `current_step`.
972: 15. Update `last_followup_at`.
973: 16. Calculate `next_followup_at`.
974: 17. Mark final sequence as `COMPLETED`.
975: 18. Add failure logging.
976: 19. Add retry policy.
977: 20. Test unsubscribe immediately before a scheduled send.
978: 
979: **Milestone:** Opted-in contacts automatically receive the correct email
980: sequence, and unsubscribed contacts never receive future automated
981: messages.
982: 
983: ------------------------------------------------------------------------
984: 
985: ## Phase 8 --- Hardening and Testing
986: 
987: Test:
988: 
989: -   Contact with consent
990: -   Contact without consent
991: -   Duplicate email
992: -   Duplicate phone
993: -   Invalid email
994: -   Contact paused before send
995: -   Contact unsubscribed before send
996: -   Contact unsubscribed while sequence is active
997: -   Already unsubscribed link
998: -   Invalid unsubscribe token
999: -   Email provider failure
1000: -   Google Sheets API failure
1001: -   n8n retry behavior
1002: -   Final sequence completion
1003: -   Archived contact
1004: -   Admin authentication failure
1005: 
1006: Also verify that every n8n send path checks consent before sending.
1007: 
1008: **Milestone:** V1 is safe for controlled internal production use.
1009: 
1010: ------------------------------------------------------------------------
1011: 
1012: ## Phase 9 --- SMS Integration
1013: 
1014: Only start after email automation is stable.
1015: 
1016: 1.  Connect SMS provider to n8n.
1017: 2.  Decide which sequence steps use SMS.
1018: 3.  Validate phone availability.
1019: 4.  Reuse the same global consent gate.
1020: 5.  Check `opt_in = TRUE` and `status = ACTIVE` before SMS.
1021: 6.  Log SMS sends in `Communication_Log`.
1022: 7.  Ensure unsubscribe stops both email and SMS automation.
1023: 
1024: **Milestone:** Eligible contacts can receive configured email and SMS
1025: follow-ups under the same V1 consent model.
1026: 
1027: ------------------------------------------------------------------------
1028: 
1029: ## 17. Recommended Development Milestones
1030: 
1031: ### Milestone 1
1032: 
1033: ``` text
1034: Login
1035:   ->
1036: Add Contact
1037:   ->
1038: Google Sheets
1039:   ->
1040: Contacts List
1041: ```
1042: 
1043: ### Milestone 2
1044: 
1045: ``` text
1046: View Contact
1047:   ->
1048: Edit
1049:   ->
1050: Consent Management
1051:   ->
1052: Pause / Resume
1053:   ->
1054: Archive
1055: ```
1056: 
1057: ### Milestone 3
1058: 
1059: ``` text
1060: Dashboard Statistics
1061:   ->
1062: Communication Status
1063: ```
1064: 
1065: ### Milestone 4
1066: 
1067: ``` text
1068: Email
1069:   ->
1070: Unsubscribe Link
1071:   ->
1072: Public Unsubscribe Page
1073:   ->
1074: Google Sheets Update
1075: ```
1076: 
1077: ### Milestone 5
1078: 
1079: ``` text
1080: n8n
1081:   ->
1082: Consent Check
1083:   ->
1084: Send Email
1085:   ->
1086: Communication Log
1087:   ->
1088: Schedule Next Follow-up
1089: ```
1090: 
1091: ### Milestone 6
1092: 
1093: ``` text
1094: Testing
1095:   ->
1096: Failure Handling
1097:   ->
1098: Production Deployment
1099: ```
1100: 
1101: ------------------------------------------------------------------------
1102: 
1103: ## 18. V1 Definition of Done
1104: 
1105: V1 is complete when:
1106: 
1107: -   An authorized admin can log in.
1108: -   An admin can add contacts.
1109: -   Contacts are stored in Google Sheets.
1110: -   Consent is explicitly recorded.
1111: -   Contacts without consent never enter automated communication.
1112: -   Contacts can be searched, viewed, edited, paused, resumed, and
1113:     archived.
1114: -   n8n sends scheduled follow-up emails only to eligible contacts.
1115: -   Every automated email contains a secure unsubscribe link.
1116: -   A customer can unsubscribe without logging in.
1117: -   Unsubscribing immediately blocks future automated email and SMS.
1118: -   n8n re-checks consent before every send.
1119: -   Successful and failed communication attempts are logged.
1120: -   Dashboard metrics accurately reflect Google Sheets and
1121:     communication-log data.
1122: -   Failure scenarios have been tested.
1123: 
1124: ------------------------------------------------------------------------
1125: 
1126: ## 19. Future Improvements
1127: 
1128: After V1 is stable, consider:
1129: 
1130: -   Multiple follow-up sequences
1131: -   Sequence assignment per contact
1132: -   Visual sequence editor
1133: -   Email template management
1134: -   SMS automation
1135: -   Channel-specific consent
1136: -   Detailed consent audit log
1137: -   Contact import via CSV
1138: -   Bulk actions
1139: -   Delivery/open/click analytics
1140: -   Webhook-based provider events
1141: -   Admin roles
1142: -   PostgreSQL migration if scale or concurrency outgrows Google Sheets
1143: 
1144: Do not add these features until there is a demonstrated operational
1145: requirement.
1146: 
1147: ------------------------------------------------------------------------
1148: 
1149: ## 20. Recommended First Implementation Target
1150: 
1151: Start with this exact vertical slice:
1152: 
1153: ``` text
1154: Admin Login
1155:     ->
1156: Add Contact
1157:     ->
1158: Validate Data
1159:     ->
1160: Record Consent
1161:     ->
1162: Generate UUID + Unsubscribe Token
1163:     ->
1164: Save to Google Sheets
1165:     ->
1166: Display in Contacts Table
1167: ```
1168: 
1169: Once this flow is reliable, build contact management and unsubscribe
1170: handling. Add n8n automation only after the contact and consent data
1171: model is stable.
1172: 
1173: This order minimizes debugging complexity and prevents automation from
1174: being built on top of an unstable data layer.
1175: 
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.

