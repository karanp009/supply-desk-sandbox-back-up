<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Check_we_have_received_GDPR_ID_Confirmation</fullName>
        <description>Check we have received GDPR ID Confirmation</description>
        <protected>false</protected>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_Internal_ID_Check_Reminder</template>
    </alerts>
    <alerts>
        <fullName>Email_Alert_When_Status_Changes_to_Not_Compliant</fullName>
        <description>Email Alert When Status Changes to Not Compliant</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>rebecca.hardie@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <field>Compliance_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Compliance_Emails/Compliance_Status_changed_to_Not_Compliant</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Erasure_Req_2nd_response_and_ack</fullName>
        <description>Email GDPR Erasure Req - 2nd response and acknowledgement</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_2nd_response_and_acknowledgement</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Erasure_Req_2nd_response_and_acknowledgement</fullName>
        <description>Email GDPR Erasure Req - 2nd response and acknowledgement</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_2nd_response_and_acknowledgement</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Erasure_Req_3rd_Action_to_Owner</fullName>
        <description>Email GDPR Erasure Req - 3rd Action to Owner</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_3rd_Action_Email_to_branch</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Erasure_Req_3rd_Action_to_Person_Owner</fullName>
        <description>Email GDPR Erasure Req - 3rd Action to Person Owner</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_3rd_Action_Email_to_branch</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Erasure_Req_Worked_2st_response_and_ID_Req</fullName>
        <description>Email GDPR Erasure Req (Worked) - 1st response and ID Req</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Erasure_Request_1st_response_and_request_for_ID</template>
    </alerts>
    <alerts>
        <fullName>Email_GDPR_Unsubscribe_Request</fullName>
        <description>Email GDPR Unsubscribe Request</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <recipients>
            <recipient>dpl@supplydesk.co.uk</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/GDPR_Unsubscribe_Request_response</template>
    </alerts>
    <alerts>
        <fullName>Email_compliance_on_Interview_Completion</fullName>
        <ccEmails>complianceteam@supplydesk.co.uk</ccEmails>
        <description>Email compliance on Interview Completion</description>
        <protected>false</protected>
        <recipients>
            <field>Compliance_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Compliance_Emails/Compliance_status_changed_to_Interview_Complete2</template>
    </alerts>
    <alerts>
        <fullName>Email_compliance_on_Interview_Completion_Missing_Docs</fullName>
        <ccEmails>complianceteam@supplydesk.co.uk</ccEmails>
        <description>Email compliance on Interview Completion Missing Docs</description>
        <protected>false</protected>
        <recipients>
            <field>Compliance_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Compliance_Emails/Compliance_Status_changed_to_Interview_Complete_Missing_docs</template>
    </alerts>
    <alerts>
        <fullName>Email_compliance_on_Interview_Completion_Overseas</fullName>
        <ccEmails>complianceteam@supplydesk.co.uk</ccEmails>
        <description>Email compliance on Interview Completion Overseas</description>
        <protected>false</protected>
        <recipients>
            <field>Compliance_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Compliance_Emails/Compliance_Status_changed_to_Interview_Complete_overseas</template>
    </alerts>
    <alerts>
        <fullName>Email_compliance_when_candidate_has_been_changed_to_Vetted</fullName>
        <ccEmails>complianceteam@supplydesk.co.uk</ccEmails>
        <description>Email compliance when candidate has been changed to Vetted</description>
        <protected>false</protected>
        <recipients>
            <field>Compliance_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Compliance_Emails/Candidate_is_changed_to_Status_Vetted</template>
    </alerts>
    <alerts>
        <fullName>GDPR_New_Candidate_Job_Board_Privacy_Notice_Email</fullName>
        <description>GDPR New Candidate Job Board Privacy Notice Email</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <senderAddress>dpl@supplydesk.co.uk</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>GDPR/Job_Board_Privacy_Notice</template>
    </alerts>
    <alerts>
        <fullName>GDPR_Send_Job_Board_Privacy_Notice_when_Candidate_is_created</fullName>
        <description>GDPR Send Job Board Privacy Notice when Candidate is created</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>TR1__Secondary_Email__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>TR1__Work_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>GDPR/Job_Board_Privacy_Notice</template>
    </alerts>
    <alerts>
        <fullName>Send_email_to_payroll_when_banking_details_changed</fullName>
        <ccEmails>payroll@supplydesk.co.uk</ccEmails>
        <description>Send email to payroll when banking details changed</description>
        <protected>false</protected>
        <senderType>CurrentUser</senderType>
        <template>Payroll_Emails/Banking_Information_Email_Payroll</template>
    </alerts>
    <alerts>
        <fullName>TR1__Notify_On_Resume_Uploaded_Successfully</fullName>
        <description>Notify Resume Parsed Successfully</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>TR1__Talent_Rover_Email_Templates/TR1__Successful_Resume_Upload</template>
    </alerts>
    <fieldUpdates>
        <fullName>Check_VAT_registered_true</fullName>
        <description>Chech VAT registered true</description>
        <field>VAT_Registered__c</field>
        <literalValue>1</literalValue>
        <name>Check VAT registered true</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Cleared_Pending_Rule</fullName>
        <field>Cleared_Pending_Docs__c</field>
        <literalValue>1</literalValue>
        <name>Cleared Pending Rule</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Date_Stamp_on_Term_Sent</fullName>
        <field>Term_Sent_Date__c</field>
        <formula>NOW()</formula>
        <name>Date Stamp on Term Sent</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Fieldupdate_update_Batch_ID</fullName>
        <field>TR1__Batch_ID__c</field>
        <formula>&quot;MassSync&quot;</formula>
        <name>Fieldupdate_update_Batch_ID</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Cleared_Candidate</fullName>
        <field>Compliance_Status__c</field>
        <name>Stamp Time on Cleared Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Cleared_Candidate2</fullName>
        <field>Compliance_Cleared_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Cleared Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Cleared_Pending_Candidate</fullName>
        <field>Compliance_Cleared_Pending_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Cleared Pending Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Cleared_Pending_Docs_Candi</fullName>
        <field>Compliance_Cleared_Pending_Docs_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Cleared Pending Docs Candi</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Interview_Complete_Candida</fullName>
        <field>Compliance_Interview_Complete_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Interview Complete Candida</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Interview_Complete_Missing</fullName>
        <field>Compliance_Interview_Complete_Miss_Doc__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Interview Complete Missing</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Not_Cleared_Candidate</fullName>
        <field>Compliance_Not_Cleared_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Not Cleared Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Not_Compliant_Candidate</fullName>
        <field>Compliance_Not_Compliant_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Not Compliant Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Not_Registered_Candida</fullName>
        <field>Compliance_Not_Registered_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Not Registered Candida</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_Time_on_Stopped_Candidate</fullName>
        <field>Compliance_Stopped_Date__c</field>
        <formula>NOW()</formula>
        <name>Stamp Time on Stopped Candidate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Stamp_VAT_Number_Field</fullName>
        <field>VAT_Number__c</field>
        <formula>Umbrella_Company__r.VAT_Number__c</formula>
        <name>Stamp VAT Number Field</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Uncheck_VAT_Registered</fullName>
        <description>Uncheck VAT Registered</description>
        <field>VAT_Registered__c</field>
        <literalValue>0</literalValue>
        <name>Uncheck VAT Registered</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Candidate_Alert_DNC_GDPR</fullName>
        <field>Alert__c</field>
        <formula>&quot;THIS PERSON HAS REQUESTED DELETION UNDER GDPR - DO NOT CONTACT&quot;</formula>
        <name>Update Candidate Alert - DNC GDPR</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Candidate_Status_to_DNU</fullName>
        <field>TR1__Candidate_Status__c</field>
        <literalValue>DNU</literalValue>
        <name>Update Candidate Status to DNU</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Candidate_Vetted_Date</fullName>
        <field>Candidate_Vetted_Date__c</field>
        <formula>NOW()</formula>
        <name>Update Candidate Vetted Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Compliance_Status_Field_to_Dorman</fullName>
        <field>Compliance_Status__c</field>
        <literalValue>Dormant</literalValue>
        <name>Update Compliance Status Field to Dorman</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Fast_Treack</fullName>
        <field>Fast_Track__c</field>
        <literalValue>1</literalValue>
        <name>Update Fast Treack</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Past_to_Active_for_Timesheet_Visi</fullName>
        <description>Update Past to Active for Timesheet Visibility</description>
        <field>TR1__Client_Status__c</field>
        <literalValue>Active</literalValue>
        <name>Update Past to Active for Timesheet Visi</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_People_Record_Type</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Candidate</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update People Record Type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Updates_Candidate_Alert_to_Unsubscribe</fullName>
        <field>Alert__c</field>
        <formula>&quot;THIS CONTACT HAS UNSUBSCRIBED TO EMAIL AND SMS - CONTACT RESPECTFULLY, ONLY ON A 1-2-1 BASIS.&quot;</formula>
        <name>Updates Candidate Alert to Unsubscribe</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>update_notes_gdpr_opt_out</fullName>
        <description>&quot;THIS PERSON HAS REQUESTED DELETION UNDER GDPR - DO NOT CONTACT&quot;</description>
        <field>Alert__c</field>
        <formula>&quot;THIS PERSON HAS REQUESTED DELETION UNDER GDPR - DO NOT CONTACT&quot;</formula>
        <name>update notes GDPR Opt Out</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <outboundMessages>
        <fullName>TR1__syncContact</fullName>
        <apiVersion>37.0</apiVersion>
        <endpointUrl>http://do-not-use.com</endpointUrl>
        <fields>CreatedDate</fields>
        <fields>Email</fields>
        <fields>FirstName</fields>
        <fields>Id</fields>
        <fields>LastActivityDate</fields>
        <fields>LastName</fields>
        <fields>OtherCity</fields>
        <fields>OtherCountry</fields>
        <fields>OtherPostalCode</fields>
        <fields>OwnerId</fields>
        <fields>TR1__Additional_Background__c</fields>
        <fields>TR1__Call_List_IDs__c</fields>
        <fields>TR1__Candidate_Status__c</fields>
        <fields>TR1__Client_Status__c</fields>
        <fields>TR1__Cross_Functional_Background__c</fields>
        <fields>TR1__Desired_Hourly__c</fields>
        <fields>TR1__Desired_Salary__c</fields>
        <fields>TR1__Experience_Level__c</fields>
        <fields>TR1__External_Candidate_Id__c</fields>
        <fields>TR1__Function__c</fields>
        <fields>TR1__Language__c</fields>
        <fields>TR1__Primary_Background__c</fields>
        <fields>TR1__Regional_Area__c</fields>
        <fields>TR1__Secondary_Background__c</fields>
        <fields>TR1__Skills__c</fields>
        <fields>TR1__State_Area__c</fields>
        <includeSessionId>true</includeSessionId>
        <integrationUser>tradmin@supplydesk.com</integrationUser>
        <name>syncContact</name>
        <protected>false</protected>
        <useDeadLetterQueue>false</useDeadLetterQueue>
    </outboundMessages>
    <outboundMessages>
        <fullName>syncContact</fullName>
        <apiVersion>37.0</apiVersion>
        <endpointUrl>https://api-talentrover-com-vgca8pv9m2vs.runscope.net/outbound_messages/v1/syncRecord</endpointUrl>
        <fields>Assignment_Type__c</fields>
        <fields>Candidate_Source__c</fields>
        <fields>Compliance_Status__c</fields>
        <fields>CreatedDate</fields>
        <fields>Division__c</fields>
        <fields>FirstName</fields>
        <fields>Id</fields>
        <fields>Job_Titles__c</fields>
        <fields>LEA__c</fields>
        <fields>LastActivityDate</fields>
        <fields>LastName</fields>
        <fields>OtherCity</fields>
        <fields>OtherCountry</fields>
        <fields>OtherPostalCode</fields>
        <fields>OwnerId</fields>
        <fields>Sector__c</fields>
        <fields>Specialisms__c</fields>
        <fields>Sub_LEA__c</fields>
        <fields>TR1__Candidate_Status__c</fields>
        <fields>TR1__External_Candidate_Id__c</fields>
        <fields>TR1__Regional_Area__c</fields>
        <fields>TR1__State_Area__c</fields>
        <fields>Years_of_Teaching_Experience__c</fields>
        <includeSessionId>true</includeSessionId>
        <integrationUser>tradmin@supplydesk.com</integrationUser>
        <name>syncContact</name>
        <protected>false</protected>
        <useDeadLetterQueue>false</useDeadLetterQueue>
    </outboundMessages>
    <outboundMessages>
        <fullName>trcm_syncContact_obm</fullName>
        <apiVersion>37.0</apiVersion>
        <endpointUrl>https://data-api.talentrover.com/outbound_messages/v1/syncRecord</endpointUrl>
        <fields>AccountId</fields>
        <fields>Assignment_Type__c</fields>
        <fields>AssistantName</fields>
        <fields>AssistantPhone</fields>
        <fields>Candidate_Source__c</fields>
        <fields>Candidate_Type__c</fields>
        <fields>Compliance_Status__c</fields>
        <fields>CreatedById</fields>
        <fields>CreatedDate</fields>
        <fields>Department</fields>
        <fields>Distance_Will_Travel__c</fields>
        <fields>Division__c</fields>
        <fields>DoNotCall</fields>
        <fields>Email</fields>
        <fields>EmailBouncedReason</fields>
        <fields>Fax</fields>
        <fields>FirstName</fields>
        <fields>GPS__c</fields>
        <fields>HasOptedOutOfEmail</fields>
        <fields>HomePhone</fields>
        <fields>Id</fields>
        <fields>Job_Titles__c</fields>
        <fields>LEA__c</fields>
        <fields>LastActivityDate</fields>
        <fields>LastName</fields>
        <fields>LeadSource</fields>
        <fields>MobilePhone</fields>
        <fields>OtherCity</fields>
        <fields>OtherCountry</fields>
        <fields>OtherPhone</fields>
        <fields>OtherPostalCode</fields>
        <fields>Other_Agency_Registered__c</fields>
        <fields>OwnerId</fields>
        <fields>Pay_Frequency__c</fields>
        <fields>Pay_Method__c</fields>
        <fields>Pay_Type__c</fields>
        <fields>Phone</fields>
        <fields>Preferred_LEA__c</fields>
        <fields>ReportsToId</fields>
        <fields>SEN_Additional_Experience__c</fields>
        <fields>SEN_Experience__c</fields>
        <fields>Sector__c</fields>
        <fields>Skills_Training_Experience__c</fields>
        <fields>Sub_LEA__c</fields>
        <fields>Subject__c</fields>
        <fields>TR1__Additional_Background__c</fields>
        <fields>TR1__CO_Code__c</fields>
        <fields>TR1__Candidate_Status__c</fields>
        <fields>TR1__Certifications__c</fields>
        <fields>TR1__Client_Status__c</fields>
        <fields>TR1__Cross_Functional_Background__c</fields>
        <fields>TR1__Current_Bonus__c</fields>
        <fields>TR1__Experience_Level__c</fields>
        <fields>TR1__External_Candidate_Id__c</fields>
        <fields>TR1__Function__c</fields>
        <fields>TR1__Hiring_Manager_Account__c</fields>
        <fields>TR1__Industry_Experience__c</fields>
        <fields>TR1__Language__c</fields>
        <fields>TR1__Languages__c</fields>
        <fields>TR1__Level__c</fields>
        <fields>TR1__Notice_Period__c</fields>
        <fields>TR1__Other_Name__c</fields>
        <fields>TR1__Owner_Name__c</fields>
        <fields>TR1__Part_time__c</fields>
        <fields>TR1__Primary_Background__c</fields>
        <fields>TR1__Regional_Area__c</fields>
        <fields>TR1__Secondary_Background__c</fields>
        <fields>TR1__Secondary_Email__c</fields>
        <fields>TR1__Secondary_Owner__c</fields>
        <fields>TR1__Selected__c</fields>
        <fields>TR1__Skills__c</fields>
        <fields>TR1__Source__c</fields>
        <fields>TR1__State_Area__c</fields>
        <fields>TR1__Systems_Experience__c</fields>
        <fields>TR1__Work_Eligibilty__c</fields>
        <fields>TR1__Work_Email__c</fields>
        <fields>Tax_Method__c</fields>
        <fields>Title</fields>
        <fields>Trained_As__c</fields>
        <fields>Transport__c</fields>
        <fields>Will_Relocate__c</fields>
        <fields>Year_Key_Stage__c</fields>
        <fields>Years_of_Teaching_Experience__c</fields>
        <fields>smws_Date2__c</fields>
        <fields>smws_Float1__c</fields>
        <fields>smws_Float2__c</fields>
        <includeSessionId>true</includeSessionId>
        <integrationUser>tradmin@supplydesk.com</integrationUser>
        <name>trcm_syncContact_obm</name>
        <protected>false</protected>
        <useDeadLetterQueue>false</useDeadLetterQueue>
    </outboundMessages>
    <rules>
        <fullName>Date Stamp on Term Sent</fullName>
        <actions>
            <name>Date_Stamp_on_Term_Sent</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Agreement_Sent__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Delete Candidate After 3 months</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Contact.TR1__Candidate_Status__c</field>
            <operation>equals</operation>
            <value>Prospect</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Not Registered</value>
        </criteriaItems>
        <description>Delete unused candidates after 12 weeks if they still are not registered/prospect.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <offsetFromField>Contact.CreatedDate</offsetFromField>
            <timeLength>90</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Email Candidate %26 Payroll when bank details change</fullName>
        <actions>
            <name>Send_email_to_payroll_when_banking_details_changed</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Send an email to candidate and payroll when bank details are changed</description>
        <formula>OR(ISCHANGED( Account_Name__c ) ,ISCHANGED(Account_Number__c) ,ISCHANGED(Bank_Name__c),ISCHANGED(Sort_Code__c),ISCHANGED(Roll_Number__c) )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Email Compliance on Interview Complete</fullName>
        <actions>
            <name>Email_compliance_on_Interview_Completion</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete</value>
        </criteriaItems>
        <description>Email compliance when compliance status is changed to interview complete</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Email Compliance on Interview Complete Missing Docs</fullName>
        <actions>
            <name>Email_compliance_on_Interview_Completion_Missing_Docs</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete Missing Docs</value>
        </criteriaItems>
        <description>Email compliance when compliance status is changed to interview complete missing docs</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Email Compliance on Interview Complete Overseas</fullName>
        <actions>
            <name>Email_compliance_on_Interview_Completion_Overseas</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete - Overseas</value>
        </criteriaItems>
        <description>Email compliance when compliance status is changed to interview complete for overseas</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Email Compliance on status Vetted</fullName>
        <actions>
            <name>Email_compliance_when_candidate_has_been_changed_to_Vetted</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>contains</operation>
            <value>Vet Complete,Vet Perm,Vet FLTP</value>
        </criteriaItems>
        <description>Email compliance when candidate status is changed to Vetted</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Email and Update Compliance Status Field on DNC DNU</fullName>
        <actions>
            <name>Email_Alert_When_Status_Changes_to_Not_Compliant</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Update_Candidate_Status_to_DNU</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Not Compliant</value>
        </criteriaItems>
        <description>If Compliance Status Changes to Not Compliant Candidate Status becomes DNU</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Fast Track update</fullName>
        <actions>
            <name>Update_Fast_Treack</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete,Interview Complete Missing Docs,Not Clear,Stopped,Interview Complete - Overseas,Dormant</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.TR1__Date_Last_Worked__c</field>
            <operation>greaterOrEqual</operation>
            <value>1/3/2022</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.TR1__Date_Last_Worked__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>GDPR DPL Unsubscribe</fullName>
        <actions>
            <name>Email_GDPR_Unsubscribe_Request</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Updates_Candidate_Alert_to_Unsubscribe</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.HasOptedOutOfEmail</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Marketing_Opt_Out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.smagicinteract__SMSOptOut__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.GDPR_ID_Confirmation_Received__c</field>
            <operation>notEqual</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.GDPR_opt_out__c</field>
            <operation>notEqual</operation>
            <value>True</value>
        </criteriaItems>
        <description>Marketing Opt Out Rule</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>GDPR Erasure %28Not Worked%29</fullName>
        <actions>
            <name>Email_GDPR_Erasure_Req_2nd_response_and_acknowledgement</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Email_GDPR_Erasure_Req_3rd_Action_to_Owner</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Update_Candidate_Alert_DNC_GDPR</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2 AND 3 AND 4 AND 5 AND 6 AND 7 AND 8</booleanFilter>
        <criteriaItems>
            <field>Contact.GDPR_ID_Confirmation_Received__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Division__c</field>
            <operation>equals</operation>
            <value>GDPR Eraser/opt out</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.HasOptedOutOfEmail</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Marketing_Opt_Out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.smagicinteract__SMSOptOut__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.GDPR_opt_out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Eraser_Request_GDPR__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Not Registered,Vet Complete,Vet Perm,Vet FLTP</value>
        </criteriaItems>
        <description>This workflow triggers the Branch email and 2nd response acknowledgement email. Its is used for Prospect candidates</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>GDPR Erasure %28Worked%29 Phase 2</fullName>
        <actions>
            <name>Email_GDPR_Erasure_Req_2nd_response_and_ack</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Email_GDPR_Erasure_Req_3rd_Action_to_Person_Owner</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2 AND 3 AND 4 AND 5 AND 6 AND 7 AND 8</booleanFilter>
        <criteriaItems>
            <field>Contact.GDPR_ID_Confirmation_Received__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Division__c</field>
            <operation>equals</operation>
            <value>GDPR Eraser/opt out</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.HasOptedOutOfEmail</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Marketing_Opt_Out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.smagicinteract__SMSOptOut__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.GDPR_opt_out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Eraser_Request_GDPR__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete,Not Clear,Clearance Pending,Cleared,Not Compliant,Stopped</value>
        </criteriaItems>
        <description>Triggers GDPR 2nd Response email and email to branch to delete any information that they hold on the candidate/client contact</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>GDPR Erasure ID Request %28Worked%29</fullName>
        <actions>
            <name>Email_GDPR_Erasure_Req_Worked_2st_response_and_ID_Req</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>update_notes_gdpr_opt_out</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2 AND 3 AND 4 AND 5 AND 6 AND 7 AND 8</booleanFilter>
        <criteriaItems>
            <field>Contact.TR1__Owner_Name__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Division__c</field>
            <operation>equals</operation>
            <value>GDPR Eraser/opt out</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.HasOptedOutOfEmail</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Marketing_Opt_Out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.smagicinteract__SMSOptOut__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.GDPR_opt_out__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Eraser_Request_GDPR__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Interview Complete,Not Clear,Clearance Pending,Cleared,Not Compliant,Stopped</value>
        </criteriaItems>
        <description>Request for ID as they are cleared or similar
1st GDPR Trigger</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Check_we_have_received_GDPR_ID_Confirmation</name>
                <type>Alert</type>
            </actions>
            <timeLength>28</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>GDPR email job Board Privacy notice</fullName>
        <actions>
            <name>GDPR_New_Candidate_Job_Board_Privacy_Notice_Email</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>GDPR_Job_Board_Privacy_Notice_sent_when_candidate_comes_into_the_system</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Email</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.TR1__Client_Status__c</field>
            <operation>equals</operation>
            <value>Not Applicable</value>
        </criteriaItems>
        <description>email GDPR job Board Privacy notice to candidates when they are created on the system</description>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Generate Task for File Out or Future LT Pool</fullName>
        <actions>
            <name>Check_Candidate_Availability</name>
            <type>Task</type>
        </actions>
        <actions>
            <name>Check_Candidate_Availability2</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.TR1__Candidate_Status__c</field>
            <operation>equals</operation>
            <value>Future LT Pool,File Out</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Available_From__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Generates a task for the candidate owner to advise them to call that candidate on that date that has been entered in to the available from date to check availability</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Generate Task when Candidate is Cleared or Cleared Pending</fullName>
        <actions>
            <name>Candidate_has_been_changed_to_Cleared_Cleared_Pending</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <description>Create Task for Consultant when candidate compliance status is changed to cleared or cleared pending</description>
        <formula>AND(OR(ISNEW(),AND(ISCHANGED(Compliance_Status__c),CASE(PRIORVALUE(Compliance_Status__c), &quot;Cleared Pending&quot;,1,&quot;Cleared&quot;,1,&quot;Clearance Pending&quot;,1,0)&lt;1)),  CASE(Compliance_Status__c, &quot;Cleared Pending&quot;,1,&quot;Cleared&quot;,1,&quot;Clearance Pending&quot;,1,0)&gt;0)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Set Client Contact to Active for Timesheet Visibility</fullName>
        <actions>
            <name>Update_Past_to_Active_for_Timesheet_Visi</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>AND(
NOT(ISPICKVAL(TR1__Client_Status__c, &quot;Not Applicable&quot;)),
ISPICKVAL(PRIORVALUE(TR1__Client_Status__c), &quot;Active&quot;)
)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Clearance Pending Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Cleared_Pending_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidate&apos;s compliance status is changed to Cleared Pending stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c), ISPICKVAL(Compliance_Status__c, &apos;Clearance Pending&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Cleared Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Cleared_Candidate2</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidate&apos;s compliance status is changed to Cleared stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Cleared&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Cleared Pending Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Cleared_Pending_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidate&apos;s compliance status is changed to Cleared Pending stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Cleared Pending&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Cleared Pending Docs Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Cleared_Pending_Docs_Candi</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Cleared Pending Docs stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c), ISPICKVAL(Compliance_Status__c, &apos;Cleared Pending Docs&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Interview Complete Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Interview_Complete_Candida</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Interview Complete stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Interview Complete&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Interview Complete Missing Docs</fullName>
        <actions>
            <name>Stamp_Time_on_Interview_Complete_Missing</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Interview Complete stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Interview Complete Missing Docs&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Not Clear Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Not_Cleared_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Not Clear stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c), ISPICKVAL(Compliance_Status__c, &apos;Not Clear&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Not Cleared Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Not_Cleared_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Not Cleared stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Not Cleared&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Not Compliant Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Not_Compliant_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates status is changed to Not Compliant stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Not Compliant&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Not Registered Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Not_Registered_Candida</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates is changed to Not Registered stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Not Registered&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Stopped Candidate</fullName>
        <actions>
            <name>Stamp_Time_on_Stopped_Candidate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates status is changed to Stopped stamp time</description>
        <formula>AND(ISCHANGED(Compliance_Status__c),ISPICKVAL(Compliance_Status__c, &apos;Stopped&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Stamp Time on Vetted Candidate</fullName>
        <actions>
            <name>Update_Candidate_Vetted_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When a candidates status is changed to Vetted stamp time</description>
        <formula>AND(OR(ISNEW(),AND(ISCHANGED(Compliance_Status__c),CASE(PRIORVALUE(Compliance_Status__c), &quot;Vet Complete&quot;,1,&quot;Vet Perm&quot;,1,&quot;Vet FLTP&quot;,1,0)&lt;1)), CASE(Compliance_Status__c, &quot;Vet Complete&quot;,1,&quot;Vet Perm&quot;,1,&quot;Vet FLTP&quot;,1,0)&gt;0)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>TR1__Successful File Sync Upload</fullName>
        <actions>
            <name>TR1__Notify_On_Resume_Uploaded_Successfully</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <description>Emails User when Parsing Successful</description>
        <formula>AND(ISCHANGED( TR1__Last_Mass_Resume_Upload__c ),$Setup.TR1__MassResumeProcessor__c.TR1__Email_Notifications_on_Upload_Success__c )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>TR1__syncContact</fullName>
        <active>false</active>
        <formula>AND( !ISCHANGED(TR1__SMWS_Date_Time__c),  OR(  !ISBLANK(TR1__External_Candidate_Id__c),  !ISBLANK( TR1__Batch_ID__c)  )  ,  OR(  TR1__SMWS_Status_Code__c=&apos;Queued&apos;,   ISCHANGED(TR1__Function__c),  ISCHANGED(TR1__Primary_Background__c),  ISCHANGED(FirstName),  ISCHANGED(LastActivityDate),  ISCHANGED(LastName),  ISCHANGED(OtherCity),  ISCHANGED(OtherCountry),  ISCHANGED(OtherPostalCode),  ISCHANGED(OwnerId),  ISCHANGED(TR1__Additional_Background__c),  ISCHANGED(TR1__Call_List_IDs__c),  ISCHANGED(TR1__Candidate_Status__c),  ISCHANGED(TR1__Client_Status__c),  ISCHANGED(TR1__Cross_Functional_Background__c),  ISCHANGED(TR1__Desired_Hourly__c),  ISCHANGED(TR1__Desired_Salary__c),  ISCHANGED(TR1__Experience_Level__c),  ISCHANGED(TR1__Language__c),  ISCHANGED(TR1__Regional_Area__c),  ISCHANGED(TR1__Secondary_Background__c),  ISCHANGED(TR1__Skills__c),  ISCHANGED(TR1__State_Area__c)  )  )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update Cleared Pen Docs</fullName>
        <actions>
            <name>Cleared_Pending_Rule</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.DBS_AQ_Hidden__c</field>
            <operation>equals</operation>
            <value>Active</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.ID_AQ_Hidden__c</field>
            <operation>equals</operation>
            <value>Active</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.Right_to_Work_AQ_Hidden__c</field>
            <operation>equals</operation>
            <value>Active</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Update Compliance Status Field to Dormant</fullName>
        <actions>
            <name>Update_Compliance_Status_Field_to_Dorman</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Contact.Compliance_Status__c</field>
            <operation>equals</operation>
            <value>Clearance Pending,Cleared,Cleared Pending Docs</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.TR1__Date_Last_Worked__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.TR1__Date_Last_Worked__c</field>
            <operation>lessOrEqual</operation>
            <value>182 DAYS AGO</value>
        </criteriaItems>
        <description>If a candidate hasn&apos;t worked in the last 6 months, changes them to &apos;Dormant&apos;</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Update VAT Number field on Contact for Umbrella</fullName>
        <actions>
            <name>Stamp_VAT_Number_Field</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Update VAT Number field from Umbrella company when Umbrella company is chosen</description>
        <formula>NOT(ISBLANK(Umbrella_Company__c) )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update VAT Registered field to FALSE on Contact for Umbrella</fullName>
        <actions>
            <name>Uncheck_VAT_Registered</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Update VAT Registered field on Contact for Umbrella, when VAT Registered is FALSE</description>
        <formula>AND(NOT(ISBLANK(Umbrella_Company__c) ) , NOT(Umbrella_Company__r.VAT_Registered__c) )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update VAT Registered field to TRUE on Contact for Umbrella</fullName>
        <actions>
            <name>Check_VAT_registered_true</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Update VAT Registered field on Contact for Umbrella, when VAT Registered is TRUE</description>
        <formula>AND(NOT(ISBLANK(Umbrella_Company__c)), Umbrella_Company__r.VAT_Registered__c)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>syncContact</fullName>
        <actions>
            <name>syncContact</name>
            <type>OutboundMessage</type>
        </actions>
        <active>false</active>
        <formula>AND(  !ISCHANGED(TR1__SMWS_Date_Time__c),   OR(  !ISBLANK(TR1__External_Candidate_Id__c),  !ISBLANK( TR1__Batch_ID__c)  ) ,  		OR(  TR1__SMWS_Status_Code__c=&apos;Queued&apos;, 		ISCHANGED(TR1__Function__c), 		ISCHANGED(Sector__c), 		ISCHANGED(FirstName), 		ISCHANGED(LastActivityDate), 		ISCHANGED(LastName), 		ISCHANGED(OtherCity), 		ISCHANGED(OtherCountry), 		ISCHANGED(OtherPostalCode), 		ISCHANGED(OwnerId), 		ISCHANGED(Specialisms__c), 		ISCHANGED(Job_Titles__c), 		ISCHANGED(TR1__Candidate_Status__c), 		ISCHANGED(Candidate_Source__c), 		ISCHANGED(Years_of_Teaching_Experience__c), 		ISCHANGED(Assignment_Type__c), 		 ISCHANGED(TR1__State_Area__c), 		ISCHANGED(TR1__Regional_Area__c), 		ISCHANGED(LEA__c), 		 ISCHANGED(Sub_LEA__c), 		ISCHANGED(Compliance_Status__c),  ISCHANGED(Sector__c), ISCHANGED(Specialisms__c), ISCHANGED(Job_Titles__c), ISCHANGED(Assignment_Type__c), ISCHANGED(Years_of_Teaching_Experience__c), ISCHANGED(OwnerId), ISCHANGED(Division__c) 	)  		)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>trcm_SyncContacts_without_Resumes_rule</fullName>
        <actions>
            <name>Fieldupdate_update_Batch_ID</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <formula>ISBLANK (TR1__Batch_ID__c) &amp;&amp; (Sync__c = True)</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>trcm_syncContact_rule</fullName>
        <actions>
            <name>trcm_syncContact_obm</name>
            <type>OutboundMessage</type>
        </actions>
        <active>true</active>
        <formula>AND(           OR(!ISCHANGED(TR1__SMWS_Date_Time__c),ISCHANGED(TR1__External_Candidate_Id__c)),           Sync__c,           OR(           TR1__SMWS_Status_Code__c=&apos;Queued&apos;,           ISNEW()           ,ISCHANGED(CreatedDate),ISCHANGED(Id),ISCHANGED(LastActivityDate),ISCHANGED(Assignment_Type__c),ISCHANGED(Candidate_Source__c),ISCHANGED(Candidate_Type__c),ISCHANGED(Compliance_Status__c),ISCHANGED(Distance_Will_Travel__c),ISCHANGED(Division__c),ISCHANGED(FirstName),ISCHANGED(GPS__c),ISCHANGED(Job_Titles__c),ISCHANGED(LastName),ISCHANGED(LEA__c),ISCHANGED(Other_Agency_Registered__c),ISCHANGED(OtherCity),ISCHANGED(OtherCountry),ISCHANGED(OtherPostalCode),ISCHANGED(OwnerId),ISCHANGED(Pay_Type__c),ISCHANGED(Preferred_LEA__c),ISCHANGED(Sector__c),ISCHANGED(SEN_Additional_Experience__c),ISCHANGED(SEN_Experience__c),ISCHANGED(Skills_Training_Experience__c),ISCHANGED(Sub_LEA__c),ISCHANGED(Subject__c),ISCHANGED(Tax_Method__c),ISCHANGED(TR1__Candidate_Status__c),ISCHANGED(TR1__External_Candidate_Id__c),ISCHANGED(TR1__Regional_Area__c),ISCHANGED(TR1__State_Area__c),ISCHANGED(Trained_As__c),ISCHANGED(Transport__c),ISCHANGED(Will_Relocate__c),ISCHANGED(Year_Key_Stage__c),ISCHANGED(Years_of_Teaching_Experience__c),ISCHANGED(TR1__Client_Status__c),ISCHANGED(Pay_Method__c),ISCHANGED(Pay_Frequency__c),ISCHANGED(AccountId),ISCHANGED(Phone),ISCHANGED(Fax),ISCHANGED(MobilePhone),ISCHANGED(HomePhone),ISCHANGED(OtherPhone),ISCHANGED(AssistantPhone),ISCHANGED(ReportsToId),ISCHANGED(Email),ISCHANGED(Title),ISCHANGED(Department),ISCHANGED(AssistantName),ISCHANGED(LeadSource),ISCHANGED(HasOptedOutOfEmail),ISCHANGED(DoNotCall),ISCHANGED(CreatedById),ISCHANGED(EmailBouncedReason),ISCHANGED(TR1__Level__c),ISCHANGED(TR1__Languages__c),ISCHANGED(TR1__Secondary_Email__c),ISCHANGED(TR1__Other_Name__c),ISCHANGED(TR1__Work_Eligibilty__c),ISCHANGED(TR1__Function__c),ISCHANGED(TR1__Experience_Level__c),ISCHANGED(TR1__Primary_Background__c),ISCHANGED(TR1__Secondary_Background__c),ISCHANGED(TR1__Additional_Background__c),ISCHANGED(TR1__Cross_Functional_Background__c),ISCHANGED(TR1__Systems_Experience__c),ISCHANGED(TR1__Part_time__c),ISCHANGED(TR1__CO_Code__c),ISCHANGED(TR1__Current_Bonus__c),ISCHANGED(TR1__Secondary_Owner__c),ISCHANGED(TR1__Certifications__c),ISCHANGED(TR1__Industry_Experience__c),ISCHANGED(TR1__Selected__c),ISCHANGED(TR1__Owner_Name__c),ISCHANGED(TR1__Hiring_Manager_Account__c),ISCHANGED(TR1__Language__c),ISCHANGED(TR1__Skills__c),ISCHANGED(TR1__Work_Email__c),ISCHANGED(TR1__Notice_Period__c),ISCHANGED(TR1__Source__c)           )           )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <tasks>
        <fullName>Candidate_has_been_changed_to_Cleared_Cleared_Pending</fullName>
        <assignedToType>owner</assignedToType>
        <description>Please contact candidate to advise they are Cleared/ Cleared Pending and confirm their shift availability</description>
        <dueDateOffset>0</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Candidate is now Cleared/ Cleared Pending - Please Contact</subject>
    </tasks>
    <tasks>
        <fullName>Check_Candidate_Availability</fullName>
        <assignedToType>owner</assignedToType>
        <dueDateOffset>0</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Contact.Available_From__c</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Check Candidate Availability</subject>
    </tasks>
    <tasks>
        <fullName>Check_Candidate_Availability2</fullName>
        <assignedToType>owner</assignedToType>
        <dueDateOffset>-30</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Contact.Available_From__c</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Check Candidate Availability</subject>
    </tasks>
    <tasks>
        <fullName>GDPR_Job_Board_Privacy_Notice_sent_when_candidate_comes_into_the_system</fullName>
        <assignedToType>owner</assignedToType>
        <description>This is a task to create an activity in the Candidate Activity History to track that the Job Board Privacy Email was sent when the candidate came onto the system</description>
        <dueDateOffset>1</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Contact.CreatedDate</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Completed</status>
        <subject>GDPR: Job Board Privacy Notice sent when candidate comes into the system</subject>
    </tasks>
</Workflow>
