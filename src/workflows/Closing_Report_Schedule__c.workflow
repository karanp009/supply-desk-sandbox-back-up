<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>CRS_Ended</fullName>
        <field>LastTimeTriggerExecuted__c</field>
        <literalValue>Ended</literalValue>
        <name>CRS Ended</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CRS_Started</fullName>
        <field>LastTimeTriggerExecuted__c</field>
        <literalValue>Started</literalValue>
        <name>CRS - Started</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Populate_Charge_Rate</fullName>
        <field>Charge_Rate__c</field>
        <formula>IF(Vacancy_Shift_Type__c = &apos;Daily&apos;, Closing_Report__r.Maximum_Day_Charge_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;AM&apos;, Closing_Report__r.Maximum_Half_Day_Charge_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;PM&apos;,Closing_Report__r.Maximum_Half_Day_Charge_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;Hourly&apos;, Closing_Report__r.Maximum_Hour_Charge_Rate__c,0))))</formula>
        <name>Populate Charge Rate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Populate_Pay_Rate</fullName>
        <field>Pay_Rate__c</field>
        <formula>IF(Vacancy_Shift_Type__c = &apos;Daily&apos;, Closing_Report__r.Maximum_Day_Pay_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;AM&apos;, Closing_Report__r.Maximum_Half_Day_Pay_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;PM&apos;,Closing_Report__r.Maximum_Half_Day_Pay_Rate__c , 
IF(Vacancy_Shift_Type__c = &apos;Hourly&apos;, Closing_Report__r.Maximum_Hour_Pay_Rate__c , 
0))))</formula>
        <name>Populate Pay Rate</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_CRS_Cancelled_date</fullName>
        <field>Cancelled_Date__c</field>
        <formula>NOW()</formula>
        <name>Update CRS Cancelled date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Pay_Type_on_CRS</fullName>
        <field>Pay_Type__c</field>
        <formula>TEXT(Closing_Report__r.TR1__Person_Placed__r.Tax_Method__c)</formula>
        <name>Update Pay Type on CRS</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>Populate Rate on CRS</fullName>
        <actions>
            <name>Populate_Charge_Rate</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Populate_Pay_Rate</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Closing_Report_Schedule__c.CreatedDate</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Send SMS 1 day prior to Start Date</fullName>
        <active>false</active>
        <formula>true</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Shift Started or Ended</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Closing_Report_Schedule__c.CSD_End_Time__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Closing_Report_Schedule__c.Person_Placed__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Closing_Report_Schedule__c.CSD_Start_Time__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>CRS_Ended</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Closing_Report_Schedule__c.CSD_End_Time__c</offsetFromField>
            <timeLength>0</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
        <workflowTimeTriggers>
            <actions>
                <name>CRS_Started</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Closing_Report_Schedule__c.CSD_Start_Time__c</offsetFromField>
            <timeLength>0</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Stamp time when CRS is cancelled</fullName>
        <actions>
            <name>Update_CRS_Cancelled_date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Closing_Report_Schedule__c.Status__c</field>
            <operation>equals</operation>
            <value>Cancelled</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Update Pay Type on CRS</fullName>
        <actions>
            <name>Update_Pay_Type_on_CRS</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>OR(IF(ISPICKVAL(Closing_Report__r.TR1__Person_Placed__r.Tax_Method__c, &apos;PAYE&apos;), true, false),
IF(ISPICKVAL(Closing_Report__r.TR1__Person_Placed__r.Tax_Method__c, &apos;Umbrella&apos;), true, false))</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
