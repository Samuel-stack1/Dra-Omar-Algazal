import Parser from 'rss-parser';

type CustomItem = {
  excerpt: string;
  coverImage: string;
};

const parser = new Parser<any, CustomItem>({
  customFields: {
    item: ['excerpt', 'coverImage', 'content'],
  }
});

async function testFeed() {
  try {
    const feed = await parser.parseURL('https://app.trysoro.com/api/rss/79dec606-4adc-4f26-8b67-b74e0b05e2b5');
    console.log(feed.title);
    if (feed.items.length > 0) {
      console.log(JSON.stringify(feed.items[0], null, 2));
    } else {
      console.log("No items in feed");
    }
  } catch (err) {
    console.error(err);
  }
}

testFeed();
