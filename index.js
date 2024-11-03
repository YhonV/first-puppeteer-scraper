import { launch } from 'puppeteer';

(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto('https://minecraft.fandom.com/es/wiki/Alquimia', { waitUntil: 'domcontentloaded' });
  
  const content = await page.evaluate(() => {
    const elements = document.querySelectorAll('dl dt');
    return Array.from(elements).map(element => element.textContent);
  });

  const content2 = await page.evaluate(() => {
    const elements = document.querySelectorAll('dl dd');
    return Array.from(elements).map(element => element.textContent).filter(text => text.trim() !== '');
  });

  const combinedContent = content.map((item, index) => ({
    title: item,
    description: content2[index] || ''
  }));

  console.log(combinedContent);
  await browser.close();
})();