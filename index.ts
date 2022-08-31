// Monitoring with Checkly
// Demonstrates Standard Package usage
import * as checkly from "@checkly/pulumi";
import * as fs from "fs";

// Deploy Website to S3 with CloudFront
// Also shows the challenger how to build a ComponentResource
import { CdnWebsite } from "./cdn-website";

import { Swag } from "./swag-provider";

const website = new CdnWebsite("your-startup", {});
const SIZE = "L";

export const websiteUrl = website.url;

new checkly.Check("index-page", {
  activated: true,
  frequency: 10,
  type: "BROWSER",
  locations: ["eu-west-2"],
  script: websiteUrl.apply((url) =>
    fs
      .readFileSync("checkly-embed.js")
      .toString("utf8")
      .replace("{{websiteUrl}}", url)
  ),
});

const swag = new Swag("your-startup", {
  name: "Danny Suarez",
  email: "dsuarezlogans@gmail.com",
  address: "Av. General Rivera 4185, Apartment 401, 11400 Montevideo, Uruguay",
  size: SIZE,
});
