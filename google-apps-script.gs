/**
 * Google Apps Script endpoint for the contact form in index.html
 * Deploy as Web App and use its URL in the form action in index.html.
 */
function doPost(e) {
  try {
    var payload = {};

    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        payload = e.parameter || {};
      }
    } else {
      payload = (e && e.parameter) || {};
    }

    var submitterName = payload.name || '';
    var respondentEmail = payload.email || '';
    var message = payload.message || '';

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
