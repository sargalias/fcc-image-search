"use strict";
const express = require('express');
const path = require('path');
const request = require('request');
const googleConfig = require('./config/google');


// Google config and setup
const GOOGLE_API_KEY = googleConfig.API_KEY;
const GOOGLE_SE_ID = googleConfig.SEARCH_ENGINE_ID;
const baseUrl = 'https://www.googleapis.com/customsearch/v1';
const keyParam = `key=${GOOGLE_API_KEY}`;
const cxParam = `cx=${GOOGLE_SE_ID}`;
const safe = 'safe=medium';
const fields = 'fields=items(title, snippet, link, pagemap)';

const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

const sampleGoogleResponse = {
        "items": [
            {
                "title": "LOLCats - Funny cat pictures",
                "link": "http://www.lolcats.com/",
                "snippet": "Taste good but I can't feel my whiskers! by Jessica (Caption by Tove). Taste good \nbut I can't feel my whiskers! 0 Comments. Like! Dislike! Thanks for your rating! \n8478 likes, 1941 dislikes. Merry Christmas from LOLCats.com! by earlnbaker. \nMerry Christmas from LOLCats.com! 0 Comments. Like! Dislike! Thanks for your \nrating ...",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "222",
                            "height": "227",
                            "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR8hkDSbxoKKNODgZDDb_nZyi6WEMvIH3x-bbcRmXrGwdDTQ397HuQg2cc"
                        }
                    ],
                    "metatags": [
                        {
                            "fb:app_id": "129294947206929",
                            "og:title": "LOLCats.com - Funny cat pictures",
                            "og:site_name": "LOLCats.com",
                            "og:image": "http://www.lolcats.com/images/logo.png",
                            "fb:page_id": "271571096186890"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "http://www.lolcats.com/images/u/13/39/tastegood.jpg"
                        }
                    ]
                }
            },
            {
                "title": "Lolcats - LOL at Funny Cat Memes - Funny cat pictures with words ...",
                "link": "http://icanhas.cheezburger.com/lolcats",
                "snippet": "LOLcats is the best place to find and submit funny cat memes and other silly cat \nmaterials to share with the world. We find the funny cats that make you LOL so \nthat you don't have to.",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "275",
                            "height": "183",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSCKTTB726sNDw1nZ4yGtgmYtalyCrbZkaVDWBSfSCLIFhUXEDwdyIiAZ0"
                        }
                    ],
                    "metatags": [
                        {
                            "handheldfriendly": "True",
                            "mobileoptimized": "320",
                            "viewport": "width=device-width,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes",
                            "fb:app_id": "151927811548639",
                            "fb:pages": "34729731472",
                            "msapplication-id": "Cheezburger.Cheezburger",
                            "msapplication-packagefamilyname": "Cheezburger.Cheezburger_a2ma4xw3wqp06",
                            "p:domain_verify": "8b17fa9140551390d0f75e01dcf78693",
                            "apple-itunes-app": "app-id=",
                            "og:site_name": "Lolcats",
                            "og:url": "http://icanhas.cheezburger.com/lolcats",
                            "og:title": "Lolcats",
                            "og:description": "LOLcats is the best place to find and submit funny cat memes and other silly cat materials to share with the world. We find the funny cats that make you LOL so that you don't have to.",
                            "og:type": "website",
                            "og:image": "https://i.chzbgr.com/original/9148348416/h492905E4/",
                            "og:image:width": "625",
                            "og:image:height": "416"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://i.chzbgr.com/original/9148348416/h492905E4/"
                        }
                    ]
                }
            },
            {
                "title": "Lolcat - Wikipedia",
                "link": "https://en.wikipedia.org/wiki/Lolcat",
                "snippet": "A lolcat is an image macro of one or more cats. The image's text is often \nidiosyncratic and grammatically incorrect, and is known as lolspeak. Lolcat is a \ncompound word of the acronymic abbreviation for LOL (laugh out loud) and the \nword cat. A synonym for lolcat is cat macro, since the images are a type of image \nmacro.",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "259",
                            "height": "194",
                            "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8LUEt5uOijLCeeboL0hqtZpiUaB7DFanHJqdlKw6OgjkypAo5FFsfTSo"
                        }
                    ],
                    "metatags": [
                        {
                            "referrer": "origin",
                            "og:image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cat_crying_%28Lolcat%29.jpg"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cat_crying_%28Lolcat%29.jpg"
                        }
                    ]
                }
            },
            {
                "title": "I Can Has Cheezburger? - Funny Animals Online - Cheezburger",
                "link": "http://icanhas.cheezburger.com/",
                "snippet": "World's largest collection of cat memes and other animals.",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "310",
                            "height": "163",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWgbeiuKj7GqXc6FXlFsBnxWuNpXXQ_4aA7wFbnEQBLZS8LD25E3qVSQkr"
                        }
                    ],
                    "metatags": [
                        {
                            "handheldfriendly": "True",
                            "mobileoptimized": "320",
                            "viewport": "width=device-width,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes",
                            "fb:app_id": "151927811548639",
                            "fb:pages": "34729731472",
                            "msapplication-id": "Cheezburger.Cheezburger",
                            "msapplication-packagefamilyname": "Cheezburger.Cheezburger_a2ma4xw3wqp06",
                            "p:domain_verify": "8b17fa9140551390d0f75e01dcf78693",
                            "apple-itunes-app": "app-id=",
                            "og:site_name": "I Can Has Cheezburger?",
                            "og:url": "http://icanhas.cheezburger.com",
                            "og:title": "I Can Has Cheezburger?",
                            "og:description": "World's largest collection of cat memes and other animals",
                            "og:type": "website",
                            "og:image": "https://i.chzbgr.com/thumb800/5277701/hF5CD71FC/",
                            "og:image:width": "800",
                            "og:image:height": "420"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://i.chzbgr.com/thumb800/5277701/hF5CD71FC/"
                        }
                    ]
                }
            },
            {
                "title": "Urban Dictionary: lolcat",
                "link": "https://www.urbandictionary.com/define.php?term=lolcat",
                "snippet": "A photo of a cat doing a seemingly-innocuous thing, with large text superimposed\n. Sort of an offshoot of the orly owl. Also called cat macros.",
                "pagemap": {
                    "metatags": [
                        {
                            "viewport": "width=device-width, initial-scale=1.0, user-scalable = no",
                            "apple-mobile-web-app-title": "UrbanDict",
                            "apple-mobile-web-app-capable": "yes",
                            "fb:app_id": "169142139769391",
                            "twitter:description": "A photo of a cat doing a seemingly-innocuous thing, with large text superimposed. Sort of an offshoot of the orly owl. Also called cat macros",
                            "twitter:title": "Urban Dictionary: lolcat",
                            "og:title": "Urban Dictionary: lolcat",
                            "twitter:site": "@urbandictionary",
                            "og:site_name": "Urban Dictionary"
                        }
                    ]
                }
            },
            {
                "title": "LOLcats | Know Your Meme",
                "link": "http://knowyourmeme.com/memes/lolcats",
                "snippet": "Apr 1, 2009 ... LOLcats are a series of image macros consisting of humorous photos of cats with \nsuperimposed text written in a form of broken English known as lolspeak.",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "186",
                            "height": "271",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4QxMKw15gaj4UdKCBNReoJ4DSuY0fzW1D0MAKnR4KYikr0Sisiu70xZo"
                        }
                    ],
                    "metatags": [
                        {
                            "og:title": "LOLcats",
                            "og:site_name": "Know Your Meme",
                            "og:image": "http://i0.kym-cdn.com/entries/icons/facebook/000/000/018/happycat.jpg",
                            "og:image:width": "600",
                            "og:image:height": "315",
                            "og:type": "article",
                            "fb:app_id": "104675392961482",
                            "fb:pages": "88519108736",
                            "article:publisher": "http://facebook.com/knowyourmeme",
                            "og:url": "http://knowyourmeme.com/memes/lolcats",
                            "og:description": "LOLcats are a series of image macros consisting of humorous photos of cats with superimposed text written in a form of broken English known as lolspeak.",
                            "p:domain_verify": "3fa925d06e2f3c4af076ced1e6e951cf"
                        }
                    ],
                    "article": [
                        {
                            "mainentityofpage": "http://knowyourmeme.com/memes/lolcats",
                            "headline": "LOLcats",
                            "thumbnailurl": "http://i0.kym-cdn.com/entries/icons/original/000/000/018/happycat.jpg",
                            "datecreated": "2008-12-12T15:11:45-05:00",
                            "datepublished": "2008-12-12T15:11:45-05:00",
                            "datemodified": "2018-03-20T15:25:28-04:00",
                            "interactioncount": "UserComments:43"
                        }
                    ],
                    "imageobject": [
                        {
                            "url": "http://a.kym-cdn.com/assets/logo.jpg",
                            "height": "720",
                            "width": "720"
                        },
                        {
                            "url": "http://i0.kym-cdn.com/entries/icons/original/000/000/018/happycat.jpg",
                            "height": "397",
                            "width": "273"
                        }
                    ],
                    "person": [
                        {
                            "name": "Jamie Dubs",
                            "url": "http://knowyourmeme.com/users/jamie-dubs"
                        }
                    ],
                    "organization": [
                        {
                            "name": "Know Your Meme"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "http://i0.kym-cdn.com/entries/icons/facebook/000/000/018/happycat.jpg"
                        }
                    ]
                }
            },
            {
                "title": "GitHub - busyloop/lolcat: Rainbows and unicorns!",
                "link": "https://github.com/busyloop/lolcat",
                "snippet": "GitHub is where people build software. More than 27 million people use GitHub \nto discover, fork, and contribute to over 80 million projects.",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "225",
                            "height": "225",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT32hux3dC5kPpHVhJltts2L126kjzfSq9BVAkxKhDrIJIew9h5ZLKSml8"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width",
                            "fb:app_id": "1401488693436528",
                            "og:image": "https://avatars0.githubusercontent.com/u/969557?s=400&v=4",
                            "og:site_name": "GitHub",
                            "og:type": "object",
                            "og:title": "busyloop/lolcat",
                            "og:url": "https://github.com/busyloop/lolcat",
                            "og:description": "Rainbows and unicorns! Contribute to lolcat development by creating an account on GitHub.",
                            "pjax-timeout": "1000",
                            "request-id": "9527:9808:D1C3C:13E04D:5ACC8B4B",
                            "google-analytics": "UA-3769691-2",
                            "octolytics-host": "collector.githubapp.com",
                            "octolytics-app-id": "github",
                            "octolytics-event-url": "https://collector.githubapp.com/github-external/browser_event",
                            "octolytics-dimension-request_id": "9527:9808:D1C3C:13E04D:5ACC8B4B",
                            "octolytics-dimension-region_edge": "sea",
                            "octolytics-dimension-region_render": "iad",
                            "hydro-events-url": "https://github.com/hydro_browser_events",
                            "analytics-location": "/<user-name>/<repo-name>",
                            "dimension1": "Logged Out",
                            "hostname": "github.com",
                            "expected-hostname": "github.com",
                            "js-proxy-site-detection-payload": "ZjQ2ZDNhMTcwNzM0ODE2NmI1MTFlYmU3NjBjZGQ5MjE1NWJkODU3OGMwN2IyZDJkN2VjNzgxZjgyYjk0MzBjMHx7InJlbW90ZV9hZGRyZXNzIjoiNjYuMjQ5Ljc5LjY3IiwicmVxdWVzdF9pZCI6Ijk1Mjc6OTgwODpEMUMzQzoxM0UwNEQ6NUFDQzhCNEIiLCJ0aW1lc3RhbXAiOjE1MjMzNTQ0NDMsImhvc3QiOiJnaXRodWIuY29tIn0=",
                            "enabled-features": "UNIVERSE_BANNER,FREE_TRIALS,MARKETPLACE_INSIGHTS,MARKETPLACE_SELF_SERVE,MARKETPLACE_INSIGHTS_CONVERSION_PERCENTAGES",
                            "html-safe-nonce": "901b4fd5edb55e5ce1d353425275e3e07c761779",
                            "go-import": "github.com/busyloop/lolcat git https://github.com/busyloop/lolcat.git",
                            "octolytics-dimension-user_id": "969557",
                            "octolytics-dimension-user_login": "busyloop",
                            "octolytics-dimension-repository_id": "2185269",
                            "octolytics-dimension-repository_nwo": "busyloop/lolcat",
                            "octolytics-dimension-repository_public": "true",
                            "octolytics-dimension-repository_is_fork": "false",
                            "octolytics-dimension-repository_network_root_id": "2185269",
                            "octolytics-dimension-repository_network_root_nwo": "busyloop/lolcat",
                            "octolytics-dimension-repository_explore_github_marketplace_ci_cta_shown": "false",
                            "browser-stats-url": "https://api.github.com/_private/browser/stats",
                            "browser-errors-url": "https://api.github.com/_private/browser/errors",
                            "theme-color": "#1e2327"
                        }
                    ],
                    "listitem": [
                        {
                            "url": "Code",
                            "name": "Code",
                            "position": "1"
                        },
                        {
                            "url": "Issues 1",
                            "name": "Issues",
                            "position": "2"
                        },
                        {
                            "url": "Pull requests 0",
                            "name": "Pull requests",
                            "position": "3"
                        }
                    ],
                    "softwaresourcecode": [
                        {
                            "author": "busyloop",
                            "name": "lolcat",
                            "about": "Rainbows and unicorns!",
                            "keywords": "Ruby",
                            "datemodified": "a day ago",
                            "license": "LICENSE",
                            "text": "What? Screenshot Installation $ gem install lolcat"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://avatars0.githubusercontent.com/u/969557?s=400&v=4"
                        }
                    ]
                }
            },
            {
                "title": "lolcats",
                "link": "https://www.reddit.com/r/lolcats/",
                "snippet": "limit my search to r/lolcats. use the following search parameters to narrow your \nresults: subreddit:subreddit: find submissions in \"subreddit\"; author:username: \nfind submissions by \"username\"; site:example.com: find submissions from \"\nexample.com\"; url:text: search for \"text\" in url; selftext:text: search for \"text\" in self \npost ...",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "225",
                            "height": "225",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmlcAvu2a2ZymPNT9DRuLZVfS9RfmNbEMNun3XiGEGnPfh0-cvMpEcu_o"
                        }
                    ],
                    "metatags": [
                        {
                            "referrer": "always",
                            "viewport": "width=1024",
                            "og:image": "https://www.redditstatic.com/icon.png",
                            "og:site_name": "reddit",
                            "og:description": "reddit: the front page of the internet",
                            "og:title": "lolcats • r/lolcats",
                            "twitter:site": "reddit",
                            "twitter:card": "summary",
                            "twitter:title": "lolcats • r/lolcats",
                            "msapplication-tilecolor": "#ffffff",
                            "msapplication-tileimage": "//www.redditstatic.com/desktop2x/img/favicon/ms-icon-144x144.png",
                            "theme-color": "#ffffff"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://www.redditstatic.com/icon.png"
                        }
                    ]
                }
            },
            {
                "title": "lolcats, cat macros | Flickr",
                "link": "https://www.flickr.com/groups/lolcats/pool",
                "snippet": "pictures of cats with captions - that's right; lolcats cat macros caturday cats \nbrought to you by.. \"wez in ur flickr postin ur catz\" lolcatz do not swearz (no \nprofaniteez plz) kthxbai see also our other groups: www.flickr.com/groups/\nthekittenchannel/ www.flickr.com/groups/techno-cats/ www.flickr.com/groups/boo-\nalikes/ we set this ...",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "276",
                            "height": "183",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4W_wCohdDOTooJJ8qS5XWYJrwTjiTKvG--x5jF-Oc2lFlzDRFn2UHKTs"
                        }
                    ],
                    "metatags": [
                        {
                            "fb:app_id": "137206539707334",
                            "og:site_name": "Flickr",
                            "og:updated_time": "2018-04-07T19:37:17.006Z",
                            "al:ios:app_name": "Flickr",
                            "al:ios:app_store_id": "328407587",
                            "twitter:app:name:iphone": "Flickr",
                            "twitter:app:id:iphone": "328407587",
                            "twitter:site": "@flickr",
                            "application-name": "lolcats, cat macros | Flickr",
                            "msapplication-tilecolor": "#ffffff",
                            "msapplication-tileimage": "https://s.yimg.com/pw/images/favicon-msapplication-tileimage.png",
                            "theme-color": "black",
                            "title": "lolcats, cat macros",
                            "og:title": "lolcats, cat macros",
                            "og:description": "pictures of cats with captions - that's right; lolcats cat macros caturday cats  brought to you by..   &quot;wez in ur flickr postin ur catz&quot;  lolcatz do not swearz (no profaniteez plz) kthxbai  see also our other groups:  www.flickr.com/groups/thekittenchannel/ www.flickr.com/groups/techno-cats/ www.flickr.com/groups/boo-alikes/  we set this group up in March as we had made a few lolcats of our own and amazingly couldn't find any groups to put them in! there was a group called lolcats but it was invite-only and more for funny cat pictures rather than the captionning meme craze that was sweeping the intarwebs.",
                            "og:type": "flickr_photos:group",
                            "og:url": "https://www.flickr.com/groups/lolcats/",
                            "og:image": "https://c1.staticflickr.com/4/3906/15357747322_714f849ced_z.jpg",
                            "og:image:width": "620",
                            "og:image:height": "410",
                            "flickr_photos:by": "https://www.flickr.com/groupslolcats",
                            "al:ios:url": "flickr://flickr.com/groups/lolcats/",
                            "twitter:card": "summary",
                            "twitter:description": "pictures of cats with captions - that's right; lolcats cat macros caturday cats  brought to you by..   &quot;wez in ur flickr postin ur catz&quot;  lolcatz do not swearz (no profaniteez plz) kthxbai  see also our other groups:  www.flickr.com/groups/thekittenchannel/ www.flickr.com/groups/techno-cats/ www.flickr.com/groups/boo-alikes/  we set this group up in March as we had made a few lolcats of our own and amazingly couldn't find any groups to put them in! there was a group called lolcats but it was invite-only and more for funny cat pictures rather than the captionning meme craze that was sweeping the intarwebs.",
                            "twitter:app:url:iphone": "flickr://flickr.com/groups/lolcats/",
                            "viewport": "width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://c1.staticflickr.com/4/3906/15357747322_714f849ced_z.jpg"
                        }
                    ]
                }
            },
            {
                "title": "Lolcat's cattery",
                "link": "https://www.lolcatscattery.com/",
                "snippet": "meillä on pentuja - We have kittens. Lisätietoja pennut-sivulla ja kissalan \nfacebook sivulla! - More info on kitten page and on cattery's Facebook page. \nTervetuloa Lolcat's kissalan sivuille! Lolcat's on pieni FIFé rekisteröity kissala. \nKasvatan pienimuotoisesti venäjänsinisiä ja norjalaisia metsäkissoja. \nTarkoituksenani on ...",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "275",
                            "height": "183",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRC-oSsuFAIvCK49yKlTXajxthajtvtP7b9-PMkczAFDfinI25R0UYAGhit"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width, initial-scale=1"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://www.lolcatscattery.com/files/lolcats.kotisivukone.com/ryhmakuva14.jpg"
                        }
                    ]
                }
            }
        ]
    }

app.get('/test', (req, res) => {
    const q = `q=lolcats`;
    const finalUrl = `${baseUrl}?${keyParam}&${cxParam}&${safe}&${q}&${fields}`;
    let formattedBody = parseGoogleResponse(sampleGoogleResponse);
    res.send(formattedBody);
    // request.get(finalUrl, (err, req, body) => {
    //     if (err) {
    //         return res.json(err);
    //     }
    //     let formattedBody = parseGoogleResponse(body);
    //     res.send(formattedBody);
    // });
});

function parseGoogleResponse(body) {
    let json = body;
    // let json = JSON.parse(body);
    let formatted = [];
    json.items.forEach((el) => {
        let item = {
            title: el.title,
            description: el.snippet,
            link: el.link,
        };
        if (el.pagemap.cse_thumbnail) {
            item.thumbnail = el.pagemap.cse_thumbnail[0].src;
        }
        if (el.pagemap.cse_image) {
            item.image = el.pagemap.cse_image[0].src;
        }
        formatted.push(item);
    });
    return formatted;
}




const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});