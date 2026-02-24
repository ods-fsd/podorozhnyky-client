export const openMailClient = (email: string) => {
  if (!email) return;

  const domain = email.split('@')[1].toLowerCase();
  let mailUrl = '';

  if (domain.includes('gmail')) mailUrl = 'https://mail.google.com';
  else if (domain.includes('ukr.net')) mailUrl = 'https://mail.ukr.net';
  else if (domain.includes('i.ua')) mailUrl = 'https://mail.i.ua';
  else if (domain.includes('meta.ua')) mailUrl = 'https://mail.meta.ua';
  else if (
    domain.includes('outlook') ||
    domain.includes('hotmail') ||
    domain.includes('live')
  )
    mailUrl = 'https://outlook.live.com';
  else if (domain.includes('yahoo')) mailUrl = 'https://mail.yahoo.com';

  if (mailUrl) {
    window.open(mailUrl, '_blank');
  }
};