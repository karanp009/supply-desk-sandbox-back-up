<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>HS_Non_Advise</fullName>
        <field>Health_Safety_Issues__c</field>
        <literalValue>Non Advised</literalValue>
        <name>HS Non Advise</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>H_S_Advised</fullName>
        <field>Health_Safety_Issues__c</field>
        <literalValue>Advised</literalValue>
        <name>H&amp;S Advised</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Populate_field_with_HS_Note_for_letter</fullName>
        <field>HS_Notes_For_Confirmation_Letter__c</field>
        <formula>&quot;Yes - To Be Advised&quot;</formula>
        <name>Populate field with HS Note for letter</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_HS_Notes_When_Issues_is_False</fullName>
        <field>HS_Notes_For_Confirmation_Letter__c</field>
        <formula>&quot;None Advised&quot;</formula>
        <name>Update HS Notes When Issues is False</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_Lapsed</fullName>
        <field>Status__c</field>
        <literalValue>Lapsed</literalValue>
        <name>Update Status to Lapsed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_Prospect</fullName>
        <field>Status__c</field>
        <literalValue>Prospect</literalValue>
        <name>Update Status to Prospect</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_client_status_to_Lapsed</fullName>
        <description>Update client status to Lapsed</description>
        <field>Status__c</field>
        <literalValue>Lapsed</literalValue>
        <name>Update client status to Lapsed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>Old - Do Not Use</fullName>
        <active>false</active>
        <description>Update field client status to lapsed if no closing report if no closing report has been generated for 6 months</description>
        <formula>OR(
ISNULL(Last_Timesheet_Created_Date__c),
(Last_Closing_Report_Created_Date__c &gt;  Last_Timesheet_Created_Date__c))</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Status_to_Lapsed</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Account.Last_Closing_Report_Created_Date__c</offsetFromField>
            <timeLength>181</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Update Field HS Notes for Letter if HS Issues is FALSE</fullName>
        <actions>
            <name>Update_HS_Notes_When_Issues_is_False</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.Health_and_Safety_Issues__c</field>
            <operation>equals</operation>
            <value>False</value>
        </criteriaItems>
        <description>IF ‘Health &amp; Safety Issues’ = FALSE, field to be populated with “None Advised”</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update Field HS Notes for Letter if HS Issues is TRUE</fullName>
        <actions>
            <name>Populate_field_with_HS_Note_for_letter</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.Health_and_Safety_Issues__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <description>IF ‘Health &amp; Safety Issues’ = TRUE, field to be populated with “Yes - To Be Advised”</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update client status if no perm closing report for 366 Days</fullName>
        <active>true</active>
        <description>If no closing reports have been generated against the client account for 366 days (1 Year + 1 Day) then the status is changes to prospect.</description>
        <formula>OR( 
ISNULL(Last_Timesheet_Created_Date__c), 
(Last_Closing_Report_Created_Date__c &gt; Last_Timesheet_Created_Date__c))</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Status_to_Prospect</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Account.Last_Closing_Report_Created_Date__c</offsetFromField>
            <timeLength>366</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Update client status if no perm closing report for 6 mths</fullName>
        <active>true</active>
        <description>Update field client status to lapsed if no closing report if no closing report has been generated for 6 months</description>
        <formula>OR(
ISNULL(Last_Timesheet_Created_Date__c),
(Last_Closing_Report_Created_Date__c &gt;  Last_Timesheet_Created_Date__c))</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Status_to_Lapsed</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Account.Last_Closing_Report_Created_Date__c</offsetFromField>
            <timeLength>184</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Update client status if no timesheets for 366 Days</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Account.Last_Timesheet_Created_Date__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>If no timesheets have been generated against the client account for 366 days (1 Year + 1 Day) then the status is changes to prospect.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Status_to_Prospect</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Account.Last_Timesheet_Created_Date__c</offsetFromField>
            <timeLength>366</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Update client status if no timesheets for 6 mths</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Account.Last_Timesheet_Created_Date__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>If no timesheets have been generated against the client account for 6 mths then the status is changes to lapsed.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Status_to_Lapsed</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Account.Last_Timesheet_Created_Date__c</offsetFromField>
            <timeLength>184</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
</Workflow>
