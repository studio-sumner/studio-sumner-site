# Editing the site

Every word on the portfolio site lives in Sanity, the content editor built into the site. You change it there; you never need to touch code.

## Opening the editor

- **Live site:** add `/admin` to the site address, for example `https://studio-sumner-site.vercel.app/admin`.
- **On this Mac:** run `yarn start` in this folder, then open `http://localhost:3000/admin`.

Sign in with the Sanity account that owns the project (project `ms2q3iub`). Both addresses edit the same content, so a change made locally shows on the live site too.

## Where everything is

The left-hand menu has **Pages**, **Header** and **Footer**.

| On the page | In the editor |
| --- | --- |
| "Studio Sumner" at the top left | Header → Site Title |
| The line that replaces it on hover ("For ambitious founders") | Header → Hover Title |
| The large opening statement | Pages → Info → Components → Statement |
| Selected clients | Pages → Info → Components → Clients and Services → Clients |
| Services (Brand, Websites…) | Pages → Info → Components → Clients and Services → Services |
| About, New business, Studio | Pages → Info → Components → Details |
| The big wordmark at the bottom | Footer → Wordmark (from tablet width up) and Wordmark (Phones) |
| The copyright line | Footer → Copyright |

The smiley icon, the colours, the Light/Dark toggle, the round menu button and the layout are part of the design and live in code.

## Common edits

**Change a link, such as The Digital Stronghold or the email address.** Click the linked words in the text, then click the link marker that appears. Edit the URL. For email, keep the `mailto:` at the start, as in `mailto:christopher@wearesumner.com`. Tick "Open In New Window" for links to other sites.

**Add a link.** Select the words, click the link button in the small toolbar and paste the URL.

**Start a new line without a gap,** as in "Sumner / Los Angeles, California": press Shift + Enter. A plain Enter starts a new paragraph.

**Reorder clients or services.** Hover over an item and drag the handle (the dotted grip at its left) up or down. The site shows them in exactly this order, so keep clients A–Z by hand.

**Add or remove a client.** Click "Add item" under the list, or open an item's menu (the three dots) and choose Remove.

**Services.** Each service has a Name (Brand) and a Detail, shown on the line below it (Identity, naming, strategy).

**Navigation.** Header → Navigation still holds Info, Work and Contact, but the header no longer shows them. The round menu button is a placeholder for now.

**Wordmark.** Type it normally; the site shows it in capitals and sizes it automatically so it spans the page edge to edge. Keep the phone version short, as one word fits best.

## Drafts and publishing

As you type, Sanity saves a **draft**. The live site doesn't change until you click **Publish** at the bottom right. To throw away a draft, open the menu next to Publish and choose "Discard changes".

Each document (the Info page, the Header, the Footer) publishes on its own, so if you edit the header and the page, publish both.

## Previewing a draft

To see unpublished changes on the real page, open the Info page in Pages and switch to the **Draft Preview** tab at the top of the editor. It shows the page with your draft in place of the published copy. Preview only covers the page's own content; draft changes to the Header or Footer show once they're published.

Preview mode lasts five minutes, then switches back to the published page. Reopen the Draft Preview tab to see the latest draft again.

## When changes show up

The live site checks Sanity for new content at most once a minute. After you publish, wait about a minute, then refresh the page; if it still shows the old text, refresh once more, because the first visit after the minute triggers the update. Locally (`yarn start`) changes appear on the next refresh.

## Changes to the design or code

Content edits in Sanity never need a deploy. Code changes go through staging first:

1. Changes are pushed to the `staging` branch. Vercel builds a preview at https://studio-sumner-site-git-staging-studio-sumner.vercel.app, usually within two or three minutes. The address stays the same, so it can be bookmarked or shared with a client.
2. Review the preview. The staging preview reads the same published content as the live site.
3. Once approved, `staging` is merged into `main`, and Vercel deploys the live site automatically.

Nothing is pushed straight to `main`. Previews ask for a Vercel login; to show one to someone without an account, create a shareable link from the deployment's Share button in Vercel.

## Resetting to the original copy

`yarn migrate:initialize:production` puts back the copy from the original design. It **overwrites** the Info page, header and footer, so only use it if you want to start over.
