const { chromium } = require('playwright');

async function testSantorioPages() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    linkTests: [],
    viewportTests: [],
    menuTests: [],
    errors: []
  };

  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12/13/14', width: 390, height: 844 },
    { name: 'iPad portrait', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];

  const urls = [
    'https://santorio.health/',
    'https://santorio.dev.datafund.io/'
  ];

  for (const url of urls) {
    console.log(`\n=== Testing ${url} ===\n`);

    // Test links
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Get all links
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => ({ href: a.href, text: a.textContent.trim().slice(0, 50) }))
      );

      console.log(`Found ${links.length} links:`);
      for (const link of links) {
        if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
          console.log(`  ✓ ${link.href} (${link.text || 'no text'})`);
          results.linkTests.push({ url, link: link.href, status: 'skipped', reason: 'mailto/tel' });
        } else if (link.href.startsWith('#') || link.href === url) {
          console.log(`  ✓ ${link.href} (anchor/self)`);
          results.linkTests.push({ url, link: link.href, status: 'skipped', reason: 'anchor' });
        } else {
          try {
            const response = await page.request.head(link.href, { timeout: 10000 });
            const status = response.status();
            if (status >= 200 && status < 400) {
              console.log(`  ✓ ${link.href} (${status})`);
              results.linkTests.push({ url, link: link.href, status: 'ok', code: status });
            } else {
              console.log(`  ✗ ${link.href} (${status})`);
              results.linkTests.push({ url, link: link.href, status: 'error', code: status });
            }
          } catch (e) {
            console.log(`  ? ${link.href} (${e.message.slice(0, 50)})`);
            results.linkTests.push({ url, link: link.href, status: 'error', error: e.message });
          }
        }
      }
    } catch (e) {
      console.log(`Error loading ${url}: ${e.message}`);
      results.errors.push({ url, error: e.message });
    }
    await page.close();

    // Test viewports and menus
    for (const viewport of viewports) {
      const vpage = await browser.newPage();
      await vpage.setViewportSize({ width: viewport.width, height: viewport.height });

      try {
        await vpage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // Check for hamburger menu on mobile
        const hamburgerVisible = await vpage.$eval('button[aria-label*="menu"], button[class*="hamburger"], button[class*="mobile"], [class*="menu-toggle"], svg[class*="menu"]',
          el => el && window.getComputedStyle(el).display !== 'none'
        ).catch(() => false);

        // Check for nav visibility
        const navVisible = await vpage.$eval('nav',
          el => el && window.getComputedStyle(el).display !== 'none'
        ).catch(() => false);

        // Check mobile menu if exists
        let mobileMenuWorks = null;
        if (hamburgerVisible) {
          try {
            await vpage.click('button[aria-label*="menu"], button[class*="hamburger"], button[class*="mobile"]');
            await vpage.waitForTimeout(500);
            // Check if menu expanded
            mobileMenuWorks = await vpage.$eval('[class*="mobile-menu"], [class*="nav-menu"], nav ul',
              el => el && window.getComputedStyle(el).display !== 'none'
            ).catch(() => false);
          } catch (e) {
            mobileMenuWorks = false;
          }
        }

        console.log(`\n${viewport.name} (${viewport.width}x${viewport.height}):`);
        console.log(`  Nav visible: ${navVisible}`);
        console.log(`  Hamburger visible: ${hamburgerVisible}`);
        if (mobileMenuWorks !== null) {
          console.log(`  Mobile menu works: ${mobileMenuWorks}`);
        }

        results.viewportTests.push({
          url,
          viewport: viewport.name,
          width: viewport.width,
          navVisible,
          hamburgerVisible,
          mobileMenuWorks
        });

      } catch (e) {
        console.log(`Error testing ${viewport.name}: ${e.message}`);
        results.errors.push({ url, viewport: viewport.name, error: e.message });
      }
      await vpage.close();
    }
  }

  await browser.close();

  console.log('\n\n=== SUMMARY ===\n');
  console.log(JSON.stringify(results, null, 2));

  return results;
}

testSantorioPages().catch(console.error);
