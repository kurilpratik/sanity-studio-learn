import { defineLive } from "next-sanity";
import { client } from "@/sanity/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "vX" }),
});

// This setup helps us in updating the frontend as soon as the content changes (published) in Sanity i.e. live updates
