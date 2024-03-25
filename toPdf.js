const puppeteer = require('puppeteer');

async function generatePDF(url, outputPath) {
  console.log(url)
  console.log(outputPath)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
    } catch (error) {
      console.error(`Failed to load page: ${error}`);
      await browser.close();
      process.exit(1);
    }

    let contentHeight = await page.evaluate(() => {
    const element = document.querySelector(".rich_media"); //通过接口参数拿到要截取内容区域的元素
      return element.clientHeight;
    });

    // await page.setViewport({
    // width: 1280,
    // height: contentHeight, //设置高度
    // });
  console.log(contentHeight)
  const startTime = Date.now();

  while(true){
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= 60 * 1000) { // 检查是否已过去一分钟
      console.log('循环已超过一分钟，强制结束');
      break;
    }
    // await page.evaluate(async (contentHeight) => {
    //   window.scrollTo(0, contentHeight);
    // },contentHeight);

    // await page.evaluate(async () => {
    //   await new Promise((resolve, reject) => {
    //     let totalHeight = 0;
    //     const distance = 500;
    //     const timer = setInterval(() => {
    //       let scrollHeight = contentHeight;
    //       window.scrollBy(0, distance);
    //       totalHeight += distance;
    //       if (totalHeight >= scrollHeight) {
    //         clearInterval(timer);
    //         resolve(totalHeight);
    //       }
    //     }, 1000);
    //   });
    // });

    await page.evaluate(async (contentHeight) => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          totalHeight += distance;
          window.scrollBy(0, distance);
          if (totalHeight >= contentHeight) {
            clearInterval(timer);
            resolve(totalHeight);
          }
        }, 100);
      });
    }, contentHeight);


    await new Promise(resolve => setTimeout(resolve, 1000));

    // 更新 contentHeight，检查页面高度是否变化
    const newContentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newContentHeight === contentHeight) {
      // 如果高度不再增加，可能表示已经滚动到底部，或者没有更多内容加载
      break;
    }
    contentHeight = newContentHeight;


  // await page.waitForFunction(
  //   () => {
  //     console.log(document.body.scrollHeight)
  //     return document.body.scrollHeight > contentHeight
  //   },
  //   { timeout: 5000 } // 设置超时时间防止死循环
  // );

  // 检查是否所有图片都已经加载完毕（根据实际情况调整检查条件）
  const allImagesLoaded = await page.evaluate(() => {
    const lazyImages = Array.from(document.querySelectorAll(".rich_pages"));
    console.log(1)
    return lazyImages.every((img) => {
     !img.classList.contains("js_img_placeholder")
    }); // 假设加载中的图片类名为 'loading'
  });
  console.log("xxxx")
  if (allImagesLoaded)
    break;
}
  // rich_pages
  // js_img_placeholder
    await page.emulateMediaType('screen'); // 模拟屏幕媒体类型，确保打印样式生效

    let pageTitle

    if (outputPath.includes('weixin')) {
      pageTitle = await page.$eval('meta[property="og:title"]', el => el.content)
    } else {
      pageTitle = await page.$eval('title', el => el.innerHTML)
    }

    let title = pageTitle.trim()
    // 去掉斜杆
    let titlea = title.replace(/\s*/g, "")
    // 去掉竖线
    let titleb = titlea.replace(/\|/g, "");

    pageTitle=titleb


    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true, // 包含背景颜色和图像
    });

    await browser.close();
}

generatePDF(process.argv[2], process.argv[3]);
