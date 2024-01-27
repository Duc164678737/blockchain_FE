import React from "react";
import NextHead from "next/head";
import { LinkConstant } from "const";
import { ImageAssets } from "public";

const AppHead = (props: AppHeadProps) => {
  const ogImageUrl = LinkConstant.APP_URL + ImageAssets.LogoImage;
  const absoluteUrl = LinkConstant.APP_URL + props.url;

  return (
    <NextHead>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:title" content={props.title || ""} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.ogImage || ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || ogImageUrl} />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="600" />
    </NextHead>
  );
};

export type AppHeadProps = {
  title: string;
  description: string;
  url?: string;
  ogImage?: string;
  ogType?: string;
};

AppHead.defaultProps = {
  title: "TZU",
  description: "React Application",
};

export default AppHead;
