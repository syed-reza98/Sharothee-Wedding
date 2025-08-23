const fs = require('fs');
const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    const lhApi = await import('lighthouse'); // v10.0.0 or later
    const flags = {
        screenEmulation: {
            disabled: true
        }
    }
    const config = lhApi.desktopConfig;
    const lhFlow = await lhApi.startFlow(page, {name: 'Recording 8/20/2025 at 7:45:03 AM', config, flags});
    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 506,
            height: 729
        })
    }
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        await targetPage.goto('https://arvinwedsincia.com/');
    }
    await lhFlow.endNavigation();
    await lhFlow.startTimespan();
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"graphics-symbol\\"])'),
            targetPage.locator('nav path'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg/path)'),
            targetPage.locator(':scope >>> nav path')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 5.600006103515625,
                y: 0,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Events)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[2])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 128,
                y: 32.19999694824219,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"graphics-symbol\\"])'),
            targetPage.locator('nav path'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg/path)'),
            targetPage.locator(':scope >>> nav path')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 11.600006103515625,
                y: 7,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Gallery)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(3)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[3])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(3)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 64,
                y: 20.199996948242188,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 22.600006103515625,
                y: 4,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Live Stream)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(4)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[4])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(4)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 98,
                y: 21.199996948242188,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 17.600006103515625,
                y: 9,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(RSVP)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(5)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[5])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(5)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 50,
                y: 18.199981689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 1.600006103515625,
                y: 17,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Travel)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(6)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[6])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(6)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 44,
                y: 19.199981689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 8.600006103515625,
                y: 17,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Contact)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(7)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[7])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(7)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 74,
                y: 25.199981689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Name *)'),
            targetPage.locator('#name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"name\\"])'),
            targetPage.locator(':scope >>> #name')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 164,
                y: 15.712493896484375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Name *)'),
            targetPage.locator('#name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"name\\"])'),
            targetPage.locator(':scope >>> #name')
        ])
            .setTimeout(timeout)
            .fill('Syed Salman Reza');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Email *)'),
            targetPage.locator('#email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
            targetPage.locator(':scope >>> #email')
        ])
            .setTimeout(timeout)
            .fill('syed.reza181@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Phone Number)'),
            targetPage.locator('#phone'),
            targetPage.locator('::-p-xpath(//*[@id=\\"phone\\"])'),
            targetPage.locator(':scope >>> #phone')
        ])
            .setTimeout(timeout)
            .fill('01709279556');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Subject *)'),
            targetPage.locator('#subject'),
            targetPage.locator('::-p-xpath(//*[@id=\\"subject\\"])'),
            targetPage.locator(':scope >>> #subject')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 96,
                y: 24.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Subject *)'),
            targetPage.locator('#subject'),
            targetPage.locator('::-p-xpath(//*[@id=\\"subject\\"])'),
            targetPage.locator(':scope >>> #subject')
        ])
            .setTimeout(timeout)
            .fill('EVENTS');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Message *)'),
            targetPage.locator('#message'),
            targetPage.locator('::-p-xpath(//*[@id=\\"message\\"])'),
            targetPage.locator(':scope >>> #message')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 176,
                y: 48.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Message *)'),
            targetPage.locator('#message'),
            targetPage.locator('::-p-xpath(//*[@id=\\"message\\"])'),
            targetPage.locator(':scope >>> #message')
        ])
            .setTimeout(timeout)
            .fill('sfsfsdfsdfsgdfgdfgdgfdgdfgd');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Send Message)'),
            targetPage.locator('section.pb-16 button'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/div[1]/form/button)'),
            targetPage.locator(':scope >>> section.pb-16 button'),
            targetPage.locator('::-p-text(Send Message)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 232,
                y: 28.512481689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Contact Us[role=\\"link\\"])'),
            targetPage.locator('div.md\\:text-right a'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/footer/div/div[1]/div[3]/div[2]/a)'),
            targetPage.locator(':scope >>> div.md\\:text-right a')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 52.01249694824219,
                y: 17.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Send Another Message)'),
            targetPage.locator('section.pb-16 button'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/div[1]/div/button)'),
            targetPage.locator(':scope >>> section.pb-16 button'),
            targetPage.locator('::-p-text(Send Another)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 112.16249084472656,
                y: 18.51251220703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 20.600006103515625,
                y: 13,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(RSVP)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(5)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[5])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(5)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 112,
                y: 26.199981689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form > div > div > div:nth-of-type(1) label:nth-of-type(1) > span'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[1]/div/label[1]/span)'),
            targetPage.locator(':scope >>> form > div > div > div:nth-of-type(1) label:nth-of-type(1) > span'),
            targetPage.locator('::-p-text(Yes, I will attend)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 81.5999984741211,
                y: 6.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div > div:nth-of-type(2) label:nth-of-type(2) > span'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[2]/div/label[2]/span)'),
            targetPage.locator(':scope >>> div > div:nth-of-type(2) label:nth-of-type(2) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 53.599998474121094,
                y: 11.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(3) label:nth-of-type(3)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[3]/div/label[3])'),
            targetPage.locator(':scope >>> div:nth-of-type(3) label:nth-of-type(3)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 118.20000076293945,
                y: 28.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Your notes…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[4]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 153.20000076293945,
                y: 56.512481689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Your notes…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[4]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('ergsfgsffsfsfsfsdfsfsdfsdfsdfs');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Phone number)'),
            targetPage.locator('div.gap-3 > input'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[1]/div[1]/div[1]/input)'),
            targetPage.locator(':scope >>> div.gap-3 > input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 167.20000076293945,
                y: 20.9124755859375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Phone number)'),
            targetPage.locator('div.gap-3 > input'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[1]/div[1]/div[1]/input)'),
            targetPage.locator(':scope >>> div.gap-3 > input')
        ])
            .setTimeout(timeout)
            .fill('01709279556');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Emergency Contact Name)'),
            targetPage.locator('#emergency_name'),
            targetPage.locator('::-p-xpath(//*[@id=\\"emergency_name\\"])'),
            targetPage.locator(':scope >>> #emergency_name')
        ])
            .setTimeout(timeout)
            .fill('Syed Salman Reza');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Emergency Contact Email)'),
            targetPage.locator('#emergency_email'),
            targetPage.locator('::-p-xpath(//*[@id=\\"emergency_email\\"])'),
            targetPage.locator(':scope >>> #emergency_email')
        ])
            .setTimeout(timeout)
            .fill('syed.reza181@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(you@example.com)'),
            targetPage.locator('div.space-y-4 > div:nth-of-type(3) > input'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[3]/input)'),
            targetPage.locator(':scope >>> div.space-y-4 > div:nth-of-type(3) > input')
        ])
            .setTimeout(timeout)
            .fill('syed.reza181@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.items-center > label:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[1]/div[1]/div[2]/label[1])'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.items-center > label:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 37.20000076293945,
                y: 11.712493896484375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.md\\:grid-cols-2 > div:nth-of-type(1) label:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[1]/div[1]/div[2]/label[2])'),
            targetPage.locator(':scope >>> div.md\\:grid-cols-2 > div:nth-of-type(1) label:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 18.625,
                y: 13.712493896484375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('section.pb-16 div.md\\:grid-cols-3 > div:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/div/div/div[5]/div[2]/div[2])'),
            targetPage.locator(':scope >>> section.pb-16 div.md\\:grid-cols-3 > div:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 125.20000076293945,
                y: 22.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Emergency Contact Phone)'),
            targetPage.locator('#emergency_phone'),
            targetPage.locator('::-p-xpath(//*[@id=\\"emergency_phone\\"])'),
            targetPage.locator(':scope >>> #emergency_phone')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 119.20000076293945,
                y: 20.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Submit RSVP)'),
            targetPage.locator('section.pb-16 button'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/form/button)'),
            targetPage.locator(':scope >>> section.pb-16 button'),
            targetPage.locator('::-p-text(Submit RSVP)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 209,
                y: 30.912506103515625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(View Event Details)'),
            targetPage.locator('section.pb-16 a.bg-primary'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[2]/div/div/div[2]/a[1])'),
            targetPage.locator(':scope >>> section.pb-16 a.bg-primary'),
            targetPage.locator('::-p-text(View Event Details)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 250,
                y: 18.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(RSVP Now)'),
            targetPage.locator('section.gradient-hero a'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[4]/div/a)'),
            targetPage.locator(':scope >>> section.gradient-hero a'),
            targetPage.locator('::-p-text(RSVP Now)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 78.37968444824219,
                y: 22.6875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 17.600006103515625,
                y: 10,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Gallery)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(3)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[3])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(3)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46,
                y: 34.19999694824219,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(PHOTO-2025-04-10-01-39-29)'),
            targetPage.locator('div:nth-of-type(9) img'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[3]/div/div/div[2]/div[9]/div[1]/img)'),
            targetPage.locator(':scope >>> div:nth-of-type(9) img')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 244,
                y: 148.11248779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Close)'),
            targetPage.locator('div.min-h-screen > div button'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/div/div/div[1]/button)'),
            targetPage.locator(':scope >>> div.min-h-screen > div button'),
            targetPage.locator('::-p-text(✕)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 24,
                y: 12,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I & A[role=\\"heading\\"])'),
            targetPage.locator('nav h1'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/a/h1)'),
            targetPage.locator(':scope >>> nav h1'),
            targetPage.locator('::-p-text(I & A)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29,
                y: 19,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(RSVP Now)'),
            targetPage.locator('#home a.bg-primary'),
            targetPage.locator('::-p-xpath(//*[@id=\\"home\\"]/div/div/div[3]/a[1])'),
            targetPage.locator(':scope >>> #home a.bg-primary'),
            targetPage.locator('::-p-text(RSVP Now)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 214.79999923706055,
                y: 28.162506103515625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I & A[role=\\"heading\\"])'),
            targetPage.locator('nav h1'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/a/h1)'),
            targetPage.locator(':scope >>> nav h1'),
            targetPage.locator('::-p-text(I & A)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 29,
                y: 16,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Our Story)'),
            targetPage.locator('a.border-2'),
            targetPage.locator('::-p-xpath(//*[@id=\\"home\\"]/div/div/div[3]/a[2])'),
            targetPage.locator(':scope >>> a.border-2'),
            targetPage.locator('::-p-text(Our Story)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 235.79999923706055,
                y: 24.1624755859375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(View Full Gallery)'),
            targetPage.locator('section.bg-cream-50 a'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/section[3]/div/div[3]/a)'),
            targetPage.locator(':scope >>> section.bg-cream-50 a'),
            targetPage.locator('::-p-text(View Full Gallery)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 102.32499694824219,
                y: 22.46246337890625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I & A[role=\\"heading\\"])'),
            targetPage.locator('nav h1'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div/a/h1)'),
            targetPage.locator(':scope >>> nav h1'),
            targetPage.locator('::-p-text(I & A)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 28,
                y: 7,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Toggle menu) >>>> ::-p-aria([role=\\"image\\"])'),
            targetPage.locator('nav svg'),
            targetPage.locator('::-p-xpath(/html/body/div[3]/nav/div/div/div[2]/button/svg)'),
            targetPage.locator(':scope >>> nav svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 5.600006103515625,
                y: 20,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria([role=\\"navigation\\"]) >>>> ::-p-aria(Events)'),
            targetPage.locator('div.lg\\:hidden a:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/div[2]/nav/div/div[2]/div/a[2])'),
            targetPage.locator(':scope >>> div.lg\\:hidden a:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 41,
                y: 32.19999694824219,
              },
            });
    }
    await lhFlow.endTimespan();
    const lhFlowReport = await lhFlow.generateReport();
    fs.writeFileSync(__dirname + '/flow.report.html', lhFlowReport)

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
