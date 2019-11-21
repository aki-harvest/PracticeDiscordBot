//==========================================================
//ログイン処理
//npm installでインストーしたdiscord.jsこのファイルでDiscordという名前で使えるようにします
const Discord = require('discord.js');

//discord bot用の材料がたくさん詰まったDiscordを呼び出し、使いたい材料(client())を取り出す
const client = new Discord.Client();

//このtokenに入るトークンは人それぞれです
const token = 'ここにBotのToken';

//
const Eris = require("eris");
const bot = new Eris(token);

//client.onでイベントを監視する。
//'ready'はbotがdiscordに接続したとき。
client.on('ready', () => {
    console.log('ready...');
});

//'message'はメッセージが送られてきたとき
//2つ目の引数のmessageにはいろんな情報が詰まっている
client.on('message', message => {

    //自身の発言は無視する
    if (message.author.bot) {
        return;
    } else {
        /**送られてきたメッセージの内容 */
        let msg = message.content;

        /**メッセージを送るチャンネル */
        let channel = message.channel;

        /**メッセージを送ってきた人の名前 */
        let author = message.author.username;

        if (msg === 'hoge') {
            let replyText = '完全一致 : hoge';
            message.reply(replyText);
            return;
        }

        // TODO:指定した語句の場合返信する(完全一致)(メンション有り)
        if (msg.match(/hoge/)) {
            let replyText = 'hoge';
            message.reply(replyText);
            return;
        }

        // TODO:指定した語句の場合返信する(メンション無し)
        if (msg === 'hoge') {
            //部分一致の場合はif(message.content.match(/hoge/)){}
            let replyText = 'hogeを受け取りました';
            message.channel.send(replyText);
            return;
        }

        // TODO:指定した語句を含む場合投稿を削除する
        if (msg.match(/fuga/)) {
            message.delete(100);
            return;
        }

        // TODO:発言者の名前を抜き出す
        if (msg.match(/hoge/)) {
            message.channnel.send('${author}さんより、hoge発言がありました。');
            return;
        }

        // TODO:
        bot.on("presenceUpdate", (other, oldPresence) => {
            const textChannel = other.guild.channels.find((channel) => channel.type === 0);
            const userName = other.user.username;

            if (other.game) {
                const gameName = other.game.name;
                bot.createMessage(textChannel.id, userName + "が" + gameName + "を始めました");
            } else if (oldPresence.game) {
                const gameName = oldPresence.game.name;
                bot.createMessage(textChannel.id, userName + "が" + gameName + "を終了しました");
            }
        });
        //↑ここに任意の処理を記述する↑
    }
});
client.login(token);