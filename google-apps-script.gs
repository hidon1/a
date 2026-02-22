/**
 * Google Apps Script endpoint for the contact form in index.html
 * Deploy as Web App and paste URL into scriptEndpoint in index.html.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');

    var submitterName = data.name || '';
    var respondentEmail = data.email || '';
    var message = data.message || '';

    var adminMessage = 'New form submission:\n\n' +
      'שם: ' + submitterName + '\n' +
      'מייל: ' + respondentEmail + '\n' +
      'הודעה: ' + message + '\n';

    MailApp.sendEmail('zm0548407450@gmail.com', 'New Form Submission', adminMessage);

    if (respondentEmail) {
      var greeting = submitterName ? 'שלום ' + submitterName + ',' : 'שלום,';
      var replySubject = 'תודה על פנייתך';
      var replyBody = greeting + '\n\nתודה על פנייתך אלינו.\n' +
        'קיבלנו את הודעתך ונחזור אליך בהקדם האפשרי.\n\nבברכה,\nהצוות שלנו';

      MailApp.sendEmail(respondentEmail, replySubject, replyBody);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
