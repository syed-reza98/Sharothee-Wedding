#!/usr/bin/env node

// Simple test script to verify email template improvements
const { generateRSVPFormEmail } = require('./src/lib/email.ts');

// Test data
const testData = {
  guestName: 'John Doe',
  willAttendDhaka: 'yes',
  familySide: 'bride',
  guestCountOption: '2',
  guestCountOther: '',
  additionalInfo: 'Vegetarian diet requested for both guests',
  contact: {
    preferred: { number: '+880-1234567890', whatsapp: true, botim: false },
    secondary: { number: '', whatsapp: false, botim: false },
    emergency: { name: 'Jane Doe', phone: '+880-9876543210', email: 'jane.doe@example.com' },
    email: 'john.doe@example.com'
  }
};

console.log('Testing RSVP email template...');
console.log('=================================');

try {
  const emailHtml = generateRSVPFormEmail(testData);
  
  // Check if the improvements are working
  const includesFullText = 
    emailHtml.includes('Yes, I will attend') &&
    emailHtml.includes("The Bride's Family") &&
    emailHtml.includes('2 people') &&
    emailHtml.includes('John Doe');
    
  console.log('Email template generated successfully!');
  console.log('Full descriptive text used:', includesFullText ? '✅' : '❌');
  
  if (includesFullText) {
    console.log('\n✅ All improvements working correctly:');
    console.log('  - Attendance: "Yes, I will attend" (not "yes")');
    console.log('  - Family Side: "The Bride\'s Family" (not "bride")');
    console.log('  - Guest Count: "2 people" (not "2")');
    console.log('  - Guest Name: "John Doe" (not "Guest")');
  } else {
    console.log('\n❌ Some improvements not working. Email content:');
    console.log(emailHtml);
  }
  
} catch (error) {
  console.error('❌ Error generating email template:', error);
}