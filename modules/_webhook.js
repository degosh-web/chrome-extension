const version = '1.5.7';
const defPic = 'https://degosh.com/imgs/logo3D.png';
const logURL = 'https://discordapp.com/api/webhooks/874599481700679701/TzovaAlwrqy5xC-jPsFYoF-ogMysKZy41S6t5JwV01d1nXIh-nJQd3D5SSZk5dDEsKIh';

class Webhook {
    _vesion = version;
    
    msg = {
        "username": "Chrome Extension",
        "avatar_url": "https://degosh.com/imgs/logo3D.png",
        "embeds": [
            {
                "title": '',
                "description": ``,
                "color": '',
                "fields": [],
                "thumbnail": {},
                "footer": {
                    text: '© DEGOSH 2021, ready to cook',
                },
                "timestamp": new Date()
            },
        ]
    };

    constructor(url) {
        this._url = url;
    }

    send() {
        fetch(this._url + "?wait=true",
            {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(this.msg)
            });
    }
}

class Testhook extends Webhook {
    constructor(url) {
        super(url);
        this.msg.embeds[0].title = 'Testing webhook';
        this.msg.embeds[0].description = 'Everything is ok with your Discord webhook URL if you see this message.';
        this.msg.embeds[0].color = '9987839';
        this.msg.embeds[0].thumbnail = { url: "https://degosh.com/imgs/webhooks/discordLogo.png" };
        this.msg.embeds[0].fields = [
            {
                name: "Version",
                value: this._vesion,
                inline: true
            },
            {
                name: "Guide",
                value: `[Here](https://guide.degosh.com/)`,
                inline: true
            }
        ];
    }
}

class Successhook extends Webhook {
    constructor(url, module, product, order, profile, pic = defPic) {
        super(url);
        this.msg.embeds[0].title = product;
        this.msg.embeds[0].description = '**Checked out. Congratulations!** \n Please make sure to post the success to the channel on our Discord server.';
        this.msg.embeds[0].color = '2807386';
        this.msg.embeds[0].thumbnail = { url: pic };
        this.msg.embeds[0].fields = [
            {
                name: "Module",
                value: module,
                inline: true
            },
            {
                name: "Order ID",
                value: `||${order}||`,
                inline: true
            },
            {
                name: "Profile",
                value: `||${profile}||`,
                inline: true
            },
            {
                name: "Version",
                value: this._vesion,
                inline: true
            }
        ];
    }
}

class Successloghook extends Webhook {
    constructor(key, module, product, pic = defPic, url = logURL) {
        super(url);
        this.msg.embeds[0].title = product;
        this.msg.embeds[0].description = '**User checked out**';
        this.msg.embeds[0].color = '2807386';
        this.msg.embeds[0].thumbnail = { url: pic };
        this.msg.embeds[0].fields = [
            {
                name: "User's key",
                value: `||${key}||`,
                inline: true
            },
            {
                name: "Module",
                value: module,
                inline: true
            }
        ];
    }
}

//new Testhook('https://discordapp.com/api/webhooks/885519051877666897/8cpfozX4f_-6JK2-jsOLOC1GD0gR5D_hLu11xFy0u1wJY2T5dbsQG1P8TJpmt2H97OYO').send();

//new Successhook('https://discordapp.com/api/webhooks/885519051877666897/8cpfozX4f_-6JK2-jsOLOC1GD0gR5D_hLu11xFy0u1wJY2T5dbsQG1P8TJpmt2H97OYO', 'adidas', 'YEEZY SLIDE', '131314', 'Main').send();

//new Successloghook('https://discordapp.com/api/webhooks/874599481700679701/TzovaAlwrqy5xC-jPsFYoF-ogMysKZy41S6t5JwV01d1nXIh-nJQd3D5SSZk5dDEsKIh', 'MDOK3-4NQZL-7T3A4-N4V1O', 'YEEZY SLIDE').send();