import { createClient } from "contentful";

const client = createClient({
  space: "x0aigtiomhhn",
  accessToken: "HoK3JaEhoUdiL2xUx6bKCfyhwHmn-FJ6HLavstAUPZY",
  host: "cdn.contentful.com",
});

export default client;

client.getEntries().then(function (entries: any) {
  // log the title for all the entries that have it
  entries.items.forEach(function (entry: any) {
    if (entry.fields.productName) {
      console.log(entry.fields.productName);
    }
  });
});