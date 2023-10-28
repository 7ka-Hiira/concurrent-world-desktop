import { Wordlist, assertArgument } from 'ethers'

const data = [
    'あいこくしん',
    'あいさつ',
    'あいだ',
    'あおぞら',
    'あかちゃん',
    'あきる',
    'あけがた',
    'あける',
    'あこがれる',
    'あさい',
    'あさひ',
    'あしあと',
    'あじわう',
    'あずかる',
    'あずき',
    'あそぶ',
    'あたえる',
    'あたためる',
    'あたりまえ',
    'あたる',
    'あつい',
    'あつかう',
    'あっしゅく',
    'あつまり',
    'あつめる',
    'あてな',
    'あてはまる',
    'あひる',
    'あぶら',
    'あぶる',
    'あふれる',
    'あまい',
    'あまど',
    'あまやかす',
    'あまり',
    'あみもの',
    'あめりか',
    'あやまる',
    'あゆむ',
    'あらいぐま',
    'あらし',
    'あらすじ',
    'あらためる',
    'あらゆる',
    'あらわす',
    'ありがとう',
    'あわせる',
    'あわてる',
    'あんい',
    'あんがい',
    'あんこ',
    'あんぜん',
    'あんてい',
    'あんない',
    'あんまり',
    'いいだす',
    'いおん',
    'いがい',
    'いがく',
    'いきおい',
    'いきなり',
    'いきもの',
    'いきる',
    'いくじ',
    'いくぶん',
    'いけばな',
    'いけん',
    'いこう',
    'いこく',
    'いこつ',
    'いさましい',
    'いさん',
    'いしき',
    'いじゅう',
    'いじょう',
    'いじわる',
    'いずみ',
    'いずれ',
    'いせい',
    'いせえび',
    'いせかい',
    'いせき',
    'いぜん',
    'いそうろう',
    'いそがしい',
    'いだい',
    'いだく',
    'いたずら',
    'いたみ',
    'いたりあ',
    'いちおう',
    'いちじ',
    'いちど',
    'いちば',
    'いちぶ',
    'いちりゅう',
    'いつか',
    'いっしゅん',
    'いっせい',
    'いっそう',
    'いったん',
    'いっち',
    'いってい',
    'いっぽう',
    'いてざ',
    'いてん',
    'いどう',
    'いとこ',
    'いない',
    'いなか',
    'いねむり',
    'いのち',
    'いのる',
    'いはつ',
    'いばる',
    'いはん',
    'いびき',
    'いひん',
    'いふく',
    'いへん',
    'いほう',
    'いみん',
    'いもうと',
    'いもたれ',
    'いもり',
    'いやがる',
    'いやす',
    'いよかん',
    'いよく',
    'いらい',
    'いらすと',
    'いりぐち',
    'いりょう',
    'いれい',
    'いれもの',
    'いれる',
    'いろえんぴつ',
    'いわい',
    'いわう',
    'いわかん',
    'いわば',
    'いわゆる',
    'いんげんまめ',
    'いんさつ',
    'いんしょう',
    'いんよう',
    'うえき',
    'うえる',
    'うおざ',
    'うがい',
    'うかぶ',
    'うかべる',
    'うきわ',
    'うくらいな',
    'うくれれ',
    'うけたまわる',
    'うけつけ',
    'うけとる',
    'うけもつ',
    'うける',
    'うごかす',
    'うごく',
    'うこん',
    'うさぎ',
    'うしなう',
    'うしろがみ',
    'うすい',
    'うすぎ',
    'うすぐらい',
    'うすめる',
    'うせつ',
    'うちあわせ',
    'うちがわ',
    'うちき',
    'うちゅう',
    'うっかり',
    'うつくしい',
    'うったえる',
    'うつる',
    'うどん',
    'うなぎ',
    'うなじ',
    'うなずく',
    'うなる',
    'うねる',
    'うのう',
    'うぶげ',
    'うぶごえ',
    'うまれる',
    'うめる',
    'うもう',
    'うやまう',
    'うよく',
    'うらがえす',
    'うらぐち',
    'うらない',
    'うりあげ',
    'うりきれ',
    'うるさい',
    'うれしい',
    'うれゆき',
    'うれる',
    'うろこ',
    'うわき',
    'うわさ',
    'うんこう',
    'うんちん',
    'うんてん',
    'うんどう',
    'えいえん',
    'えいが',
    'えいきょう',
    'えいご',
    'えいせい',
    'えいぶん',
    'えいよう',
    'えいわ',
    'えおり',
    'えがお',
    'えがく',
    'えきたい',
    'えくせる',
    'えしゃく',
    'えすて',
    'えつらん',
    'えのぐ',
    'えほうまき',
    'えほん',
    'えまき',
    'えもじ',
    'えもの',
    'えらい',
    'えらぶ',
    'えりあ',
    'えんえん',
    'えんかい',
    'えんぎ',
    'えんげき',
    'えんしゅう',
    'えんぜつ',
    'えんそく',
    'えんちょう',
    'えんとつ',
    'おいかける',
    'おいこす',
    'おいしい',
    'おいつく',
    'おうえん',
    'おうさま',
    'おうじ',
    'おうせつ',
    'おうたい',
    'おうふく',
    'おうべい',
    'おうよう',
    'おえる',
    'おおい',
    'おおう',
    'おおどおり',
    'おおや',
    'おおよそ',
    'おかえり',
    'おかず',
    'おがむ',
    'おかわり',
    'おぎなう',
    'おきる',
    'おくさま',
    'おくじょう',
    'おくりがな',
    'おくる',
    'おくれる',
    'おこす',
    'おこなう',
    'おこる',
    'おさえる',
    'おさない',
    'おさめる',
    'おしいれ',
    'おしえる',
    'おじぎ',
    'おじさん',
    'おしゃれ',
    'おそらく',
    'おそわる',
    'おたがい',
    'おたく',
    'おだやか',
    'おちつく',
    'おっと',
    'おつり',
    'おでかけ',
    'おとしもの',
    'おとなしい',
    'おどり',
    'おどろかす',
    'おばさん',
    'おまいり',
    'おめでとう',
    'おもいで',
    'おもう',
    'おもたい',
    'おもちゃ',
    'おやつ',
    'おやゆび',
    'およぼす',
    'おらんだ',
    'おろす',
    'おんがく',
    'おんけい',
    'おんしゃ',
    'おんせん',
    'おんだん',
    'おんちゅう',
    'おんどけい',
    'かあつ',
    'かいが',
    'がいき',
    'がいけん',
    'がいこう',
    'かいさつ',
    'かいしゃ',
    'かいすいよく',
    'かいぜん',
    'かいぞうど',
    'かいつう',
    'かいてん',
    'かいとう',
    'かいふく',
    'がいへき',
    'かいほう',
    'かいよう',
    'がいらい',
    'かいわ',
    'かえる',
    'かおり',
    'かかえる',
    'かがく',
    'かがし',
    'かがみ',
    'かくご',
    'かくとく',
    'かざる',
    'がぞう',
    'かたい',
    'かたち',
    'がちょう',
    'がっきゅう',
    'がっこう',
    'がっさん',
    'がっしょう',
    'かなざわし',
    'かのう',
    'がはく',
    'かぶか',
    'かほう',
    'かほご',
    'かまう',
    'かまぼこ',
    'かめれおん',
    'かゆい',
    'かようび',
    'からい',
    'かるい',
    'かろう',
    'かわく',
    'かわら',
    'がんか',
    'かんけい',
    'かんこう',
    'かんしゃ',
    'かんそう',
    'かんたん',
    'かんち',
    'がんばる',
    'きあい',
    'きあつ',
    'きいろ',
    'ぎいん',
    'きうい',
    'きうん',
    'きえる',
    'きおう',
    'きおく',
    'きおち',
    'きおん',
    'きかい',
    'きかく',
    'きかんしゃ',
    'ききて',
    'きくばり',
    'きくらげ',
    'きけんせい',
    'きこう',
    'きこえる',
    'きこく',
    'きさい',
    'きさく',
    'きさま',
    'きさらぎ',
    'ぎじかがく',
    'ぎしき',
    'ぎじたいけん',
    'ぎじにってい',
    'ぎじゅつしゃ',
    'きすう',
    'きせい',
    'きせき',
    'きせつ',
    'きそう',
    'きぞく',
    'きぞん',
    'きたえる',
    'きちょう',
    'きつえん',
    'ぎっちり',
    'きつつき',
    'きつね',
    'きてい',
    'きどう',
    'きどく',
    'きない',
    'きなが',
    'きなこ',
    'きぬごし',
    'きねん',
    'きのう',
    'きのした',
    'きはく',
    'きびしい',
    'きひん',
    'きふく',
    'きぶん',
    'きぼう',
    'きほん',
    'きまる',
    'きみつ',
    'きむずかしい',
    'きめる',
    'きもだめし',
    'きもち',
    'きもの',
    'きゃく',
    'きやく',
    'ぎゅうにく',
    'きよう',
    'きょうりゅう',
    'きらい',
    'きらく',
    'きりん',
    'きれい',
    'きれつ',
    'きろく',
    'ぎろん',
    'きわめる',
    'ぎんいろ',
    'きんかくじ',
    'きんじょ',
    'きんようび',
    'ぐあい',
    'くいず',
    'くうかん',
    'くうき',
    'くうぐん',
    'くうこう',
    'ぐうせい',
    'くうそう',
    'ぐうたら',
    'くうふく',
    'くうぼ',
    'くかん',
    'くきょう',
    'くげん',
    'ぐこう',
    'くさい',
    'くさき',
    'くさばな',
    'くさる',
    'くしゃみ',
    'くしょう',
    'くすのき',
    'くすりゆび',
    'くせげ',
    'くせん',
    'ぐたいてき',
    'くださる',
    'くたびれる',
    'くちこみ',
    'くちさき',
    'くつした',
    'ぐっすり',
    'くつろぐ',
    'くとうてん',
    'くどく',
    'くなん',
    'くねくね',
    'くのう',
    'くふう',
    'くみあわせ',
    'くみたてる',
    'くめる',
    'くやくしょ',
    'くらす',
    'くらべる',
    'くるま',
    'くれる',
    'くろう',
    'くわしい',
    'ぐんかん',
    'ぐんしょく',
    'ぐんたい',
    'ぐんて',
    'けあな',
    'けいかく',
    'けいけん',
    'けいこ',
    'けいさつ',
    'げいじゅつ',
    'けいたい',
    'げいのうじん',
    'けいれき',
    'けいろ',
    'けおとす',
    'けおりもの',
    'げきか',
    'げきげん',
    'げきだん',
    'げきちん',
    'げきとつ',
    'げきは',
    'げきやく',
    'げこう',
    'げこくじょう',
    'げざい',
    'けさき',
    'げざん',
    'けしき',
    'けしごむ',
    'けしょう',
    'げすと',
    'けたば',
    'けちゃっぷ',
    'けちらす',
    'けつあつ',
    'けつい',
    'けつえき',
    'けっこん',
    'けつじょ',
    'けっせき',
    'けってい',
    'けつまつ',
    'げつようび',
    'げつれい',
    'けつろん',
    'げどく',
    'けとばす',
    'けとる',
    'けなげ',
    'けなす',
    'けなみ',
    'けぬき',
    'げねつ',
    'けねん',
    'けはい',
    'げひん',
    'けぶかい',
    'げぼく',
    'けまり',
    'けみかる',
    'けむし',
    'けむり',
    'けもの',
    'けらい',
    'けろけろ',
    'けわしい',
    'けんい',
    'けんえつ',
    'けんお',
    'けんか',
    'げんき',
    'けんげん',
    'けんこう',
    'けんさく',
    'けんしゅう',
    'けんすう',
    'げんそう',
    'けんちく',
    'けんてい',
    'けんとう',
    'けんない',
    'けんにん',
    'げんぶつ',
    'けんま',
    'けんみん',
    'けんめい',
    'けんらん',
    'けんり',
    'こあくま',
    'こいぬ',
    'こいびと',
    'ごうい',
    'こうえん',
    'こうおん',
    'こうかん',
    'ごうきゅう',
    'ごうけい',
    'こうこう',
    'こうさい',
    'こうじ',
    'こうすい',
    'ごうせい',
    'こうそく',
    'こうたい',
    'こうちゃ',
    'こうつう',
    'こうてい',
    'こうどう',
    'こうない',
    'こうはい',
    'ごうほう',
    'ごうまん',
    'こうもく',
    'こうりつ',
    'こえる',
    'こおり',
    'ごかい',
    'ごがつ',
    'ごかん',
    'こくご',
    'こくさい',
    'こくとう',
    'こくない',
    'こくはく',
    'こぐま',
    'こけい',
    'こける',
    'ここのか',
    'こころ',
    'こさめ',
    'こしつ',
    'こすう',
    'こせい',
    'こせき',
    'こぜん',
    'こそだて',
    'こたい',
    'こたえる',
    'こたつ',
    'こちょう',
    'こっか',
    'こつこつ',
    'こつばん',
    'こつぶ',
    'こてい',
    'こてん',
    'ことがら',
    'ことし',
    'ことば',
    'ことり',
    'こなごな',
    'こねこね',
    'このまま',
    'このみ',
    'このよ',
    'ごはん',
    'こひつじ',
    'こふう',
    'こふん',
    'こぼれる',
    'ごまあぶら',
    'こまかい',
    'ごますり',
    'こまつな',
    'こまる',
    'こむぎこ',
    'こもじ',
    'こもち',
    'こもの',
    'こもん',
    'こやく',
    'こやま',
    'こゆう',
    'こゆび',
    'こよい',
    'こよう',
    'こりる',
    'これくしょん',
    'ころっけ',
    'こわもて',
    'こわれる',
    'こんいん',
    'こんかい',
    'こんき',
    'こんしゅう',
    'こんすい',
    'こんだて',
    'こんとん',
    'こんなん',
    'こんびに',
    'こんぽん',
    'こんまけ',
    'こんや',
    'こんれい',
    'こんわく',
    'ざいえき',
    'さいかい',
    'さいきん',
    'ざいげん',
    'ざいこ',
    'さいしょ',
    'さいせい',
    'ざいたく',
    'ざいちゅう',
    'さいてき',
    'ざいりょう',
    'さうな',
    'さかいし',
    'さがす',
    'さかな',
    'さかみち',
    'さがる',
    'さぎょう',
    'さくし',
    'さくひん',
    'さくら',
    'さこく',
    'さこつ',
    'さずかる',
    'ざせき',
    'さたん',
    'さつえい',
    'ざつおん',
    'ざっか',
    'ざつがく',
    'さっきょく',
    'ざっし',
    'さつじん',
    'ざっそう',
    'さつたば',
    'さつまいも',
    'さてい',
    'さといも',
    'さとう',
    'さとおや',
    'さとし',
    'さとる',
    'さのう',
    'さばく',
    'さびしい',
    'さべつ',
    'さほう',
    'さほど',
    'さます',
    'さみしい',
    'さみだれ',
    'さむけ',
    'さめる',
    'さやえんどう',
    'さゆう',
    'さよう',
    'さよく',
    'さらだ',
    'ざるそば',
    'さわやか',
    'さわる',
    'さんいん',
    'さんか',
    'さんきゃく',
    'さんこう',
    'さんさい',
    'ざんしょ',
    'さんすう',
    'さんせい',
    'さんそ',
    'さんち',
    'さんま',
    'さんみ',
    'さんらん',
    'しあい',
    'しあげ',
    'しあさって',
    'しあわせ',
    'しいく',
    'しいん',
    'しうち',
    'しえい',
    'しおけ',
    'しかい',
    'しかく',
    'じかん',
    'しごと',
    'しすう',
    'じだい',
    'したうけ',
    'したぎ',
    'したて',
    'したみ',
    'しちょう',
    'しちりん',
    'しっかり',
    'しつじ',
    'しつもん',
    'してい',
    'してき',
    'してつ',
    'じてん',
    'じどう',
    'しなぎれ',
    'しなもの',
    'しなん',
    'しねま',
    'しねん',
    'しのぐ',
    'しのぶ',
    'しはい',
    'しばかり',
    'しはつ',
    'しはらい',
    'しはん',
    'しひょう',
    'しふく',
    'じぶん',
    'しへい',
    'しほう',
    'しほん',
    'しまう',
    'しまる',
    'しみん',
    'しむける',
    'じむしょ',
    'しめい',
    'しめる',
    'しもん',
    'しゃいん',
    'しゃうん',
    'しゃおん',
    'じゃがいも',
    'しやくしょ',
    'しゃくほう',
    'しゃけん',
    'しゃこ',
    'しゃざい',
    'しゃしん',
    'しゃせん',
    'しゃそう',
    'しゃたい',
    'しゃちょう',
    'しゃっきん',
    'じゃま',
    'しゃりん',
    'しゃれい',
    'じゆう',
    'じゅうしょ',
    'しゅくはく',
    'じゅしん',
    'しゅっせき',
    'しゅみ',
    'しゅらば',
    'じゅんばん',
    'しょうかい',
    'しょくたく',
    'しょっけん',
    'しょどう',
    'しょもつ',
    'しらせる',
    'しらべる',
    'しんか',
    'しんこう',
    'じんじゃ',
    'しんせいじ',
    'しんちく',
    'しんりん',
    'すあげ',
    'すあし',
    'すあな',
    'ずあん',
    'すいえい',
    'すいか',
    'すいとう',
    'ずいぶん',
    'すいようび',
    'すうがく',
    'すうじつ',
    'すうせん',
    'すおどり',
    'すきま',
    'すくう',
    'すくない',
    'すける',
    'すごい',
    'すこし',
    'ずさん',
    'すずしい',
    'すすむ',
    'すすめる',
    'すっかり',
    'ずっしり',
    'ずっと',
    'すてき',
    'すてる',
    'すねる',
    'すのこ',
    'すはだ',
    'すばらしい',
    'ずひょう',
    'ずぶぬれ',
    'すぶり',
    'すふれ',
    'すべて',
    'すべる',
    'ずほう',
    'すぼん',
    'すまい',
    'すめし',
    'すもう',
    'すやき',
    'すらすら',
    'するめ',
    'すれちがう',
    'すろっと',
    'すわる',
    'すんぜん',
    'すんぽう',
    'せあぶら',
    'せいかつ',
    'せいげん',
    'せいじ',
    'せいよう',
    'せおう',
    'せかいかん',
    'せきにん',
    'せきむ',
    'せきゆ',
    'せきらんうん',
    'せけん',
    'せこう',
    'せすじ',
    'せたい',
    'せたけ',
    'せっかく',
    'せっきゃく',
    'ぜっく',
    'せっけん',
    'せっこつ',
    'せっさたくま',
    'せつぞく',
    'せつだん',
    'せつでん',
    'せっぱん',
    'せつび',
    'せつぶん',
    'せつめい',
    'せつりつ',
    'せなか',
    'せのび',
    'せはば',
    'せびろ',
    'せぼね',
    'せまい',
    'せまる',
    'せめる',
    'せもたれ',
    'せりふ',
    'ぜんあく',
    'せんい',
    'せんえい',
    'せんか',
    'せんきょ',
    'せんく',
    'せんげん',
    'ぜんご',
    'せんさい',
    'せんしゅ',
    'せんすい',
    'せんせい',
    'せんぞ',
    'せんたく',
    'せんちょう',
    'せんてい',
    'せんとう',
    'せんぬき',
    'せんねん',
    'せんぱい',
    'ぜんぶ',
    'ぜんぽう',
    'せんむ',
    'せんめんじょ',
    'せんもん',
    'せんやく',
    'せんゆう',
    'せんよう',
    'ぜんら',
    'ぜんりゃく',
    'せんれい',
    'せんろ',
    'そあく',
    'そいとげる',
    'そいね',
    'そうがんきょう',
    'そうき',
    'そうご',
    'そうしん',
    'そうだん',
    'そうなん',
    'そうび',
    'そうめん',
    'そうり',
    'そえもの',
    'そえん',
    'そがい',
    'そげき',
    'そこう',
    'そこそこ',
    'そざい',
    'そしな',
    'そせい',
    'そせん',
    'そそぐ',
    'そだてる',
    'そつう',
    'そつえん',
    'そっかん',
    'そつぎょう',
    'そっけつ',
    'そっこう',
    'そっせん',
    'そっと',
    'そとがわ',
    'そとづら',
    'そなえる',
    'そなた',
    'そふぼ',
    'そぼく',
    'そぼろ',
    'そまつ',
    'そまる',
    'そむく',
    'そむりえ',
    'そめる',
    'そもそも',
    'そよかぜ',
    'そらまめ',
    'そろう',
    'そんかい',
    'そんけい',
    'そんざい',
    'そんしつ',
    'そんぞく',
    'そんちょう',
    'ぞんび',
    'ぞんぶん',
    'そんみん',
    'たあい',
    'たいいん',
    'たいうん',
    'たいえき',
    'たいおう',
    'だいがく',
    'たいき',
    'たいぐう',
    'たいけん',
    'たいこ',
    'たいざい',
    'だいじょうぶ',
    'だいすき',
    'たいせつ',
    'たいそう',
    'だいたい',
    'たいちょう',
    'たいてい',
    'だいどころ',
    'たいない',
    'たいねつ',
    'たいのう',
    'たいはん',
    'だいひょう',
    'たいふう',
    'たいへん',
    'たいほ',
    'たいまつばな',
    'たいみんぐ',
    'たいむ',
    'たいめん',
    'たいやき',
    'たいよう',
    'たいら',
    'たいりょく',
    'たいる',
    'たいわん',
    'たうえ',
    'たえる',
    'たおす',
    'たおる',
    'たおれる',
    'たかい',
    'たかね',
    'たきび',
    'たくさん',
    'たこく',
    'たこやき',
    'たさい',
    'たしざん',
    'だじゃれ',
    'たすける',
    'たずさわる',
    'たそがれ',
    'たたかう',
    'たたく',
    'ただしい',
    'たたみ',
    'たちばな',
    'だっかい',
    'だっきゃく',
    'だっこ',
    'だっしゅつ',
    'だったい',
    'たてる',
    'たとえる',
    'たなばた',
    'たにん',
    'たぬき',
    'たのしみ',
    'たはつ',
    'たぶん',
    'たべる',
    'たぼう',
    'たまご',
    'たまる',
    'だむる',
    'ためいき',
    'ためす',
    'ためる',
    'たもつ',
    'たやすい',
    'たよる',
    'たらす',
    'たりきほんがん',
    'たりょう',
    'たりる',
    'たると',
    'たれる',
    'たれんと',
    'たろっと',
    'たわむれる',
    'だんあつ',
    'たんい',
    'たんおん',
    'たんか',
    'たんき',
    'たんけん',
    'たんご',
    'たんさん',
    'たんじょうび',
    'だんせい',
    'たんそく',
    'たんたい',
    'だんち',
    'たんてい',
    'たんとう',
    'だんな',
    'たんにん',
    'だんねつ',
    'たんのう',
    'たんぴん',
    'だんぼう',
    'たんまつ',
    'たんめい',
    'だんれつ',
    'だんろ',
    'だんわ',
    'ちあい',
    'ちあん',
    'ちいき',
    'ちいさい',
    'ちえん',
    'ちかい',
    'ちから',
    'ちきゅう',
    'ちきん',
    'ちけいず',
    'ちけん',
    'ちこく',
    'ちさい',
    'ちしき',
    'ちしりょう',
    'ちせい',
    'ちそう',
    'ちたい',
    'ちたん',
    'ちちおや',
    'ちつじょ',
    'ちてき',
    'ちてん',
    'ちぬき',
    'ちぬり',
    'ちのう',
    'ちひょう',
    'ちへいせん',
    'ちほう',
    'ちまた',
    'ちみつ',
    'ちみどろ',
    'ちめいど',
    'ちゃんこなべ',
    'ちゅうい',
    'ちゆりょく',
    'ちょうし',
    'ちょさくけん',
    'ちらし',
    'ちらみ',
    'ちりがみ',
    'ちりょう',
    'ちるど',
    'ちわわ',
    'ちんたい',
    'ちんもく',
    'ついか',
    'ついたち',
    'つうか',
    'つうじょう',
    'つうはん',
    'つうわ',
    'つかう',
    'つかれる',
    'つくね',
    'つくる',
    'つけね',
    'つける',
    'つごう',
    'つたえる',
    'つづく',
    'つつじ',
    'つつむ',
    'つとめる',
    'つながる',
    'つなみ',
    'つねづね',
    'つのる',
    'つぶす',
    'つまらない',
    'つまる',
    'つみき',
    'つめたい',
    'つもり',
    'つもる',
    'つよい',
    'つるぼ',
    'つるみく',
    'つわもの',
    'つわり',
    'てあし',
    'てあて',
    'てあみ',
    'ていおん',
    'ていか',
    'ていき',
    'ていけい',
    'ていこく',
    'ていさつ',
    'ていし',
    'ていせい',
    'ていたい',
    'ていど',
    'ていねい',
    'ていひょう',
    'ていへん',
    'ていぼう',
    'てうち',
    'ておくれ',
    'てきとう',
    'てくび',
    'でこぼこ',
    'てさぎょう',
    'てさげ',
    'てすり',
    'てそう',
    'てちがい',
    'てちょう',
    'てつがく',
    'てつづき',
    'でっぱ',
    'てつぼう',
    'てつや',
    'でぬかえ',
    'てぬき',
    'てぬぐい',
    'てのひら',
    'てはい',
    'てぶくろ',
    'てふだ',
    'てほどき',
    'てほん',
    'てまえ',
    'てまきずし',
    'てみじか',
    'てみやげ',
    'てらす',
    'てれび',
    'てわけ',
    'てわたし',
    'でんあつ',
    'てんいん',
    'てんかい',
    'てんき',
    'てんぐ',
    'てんけん',
    'てんごく',
    'てんさい',
    'てんし',
    'てんすう',
    'でんち',
    'てんてき',
    'てんとう',
    'てんない',
    'てんぷら',
    'てんぼうだい',
    'てんめつ',
    'てんらんかい',
    'でんりょく',
    'でんわ',
    'どあい',
    'といれ',
    'どうかん',
    'とうきゅう',
    'どうぐ',
    'とうし',
    'とうむぎ',
    'とおい',
    'とおか',
    'とおく',
    'とおす',
    'とおる',
    'とかい',
    'とかす',
    'ときおり',
    'ときどき',
    'とくい',
    'とくしゅう',
    'とくてん',
    'とくに',
    'とくべつ',
    'とけい',
    'とける',
    'とこや',
    'とさか',
    'としょかん',
    'とそう',
    'とたん',
    'とちゅう',
    'とっきゅう',
    'とっくん',
    'とつぜん',
    'とつにゅう',
    'とどける',
    'ととのえる',
    'とない',
    'となえる',
    'となり',
    'とのさま',
    'とばす',
    'どぶがわ',
    'とほう',
    'とまる',
    'とめる',
    'ともだち',
    'ともる',
    'どようび',
    'とらえる',
    'とんかつ',
    'どんぶり',
    'ないかく',
    'ないこう',
    'ないしょ',
    'ないす',
    'ないせん',
    'ないそう',
    'なおす',
    'ながい',
    'なくす',
    'なげる',
    'なこうど',
    'なさけ',
    'なたでここ',
    'なっとう',
    'なつやすみ',
    'ななおし',
    'なにごと',
    'なにもの',
    'なにわ',
    'なのか',
    'なふだ',
    'なまいき',
    'なまえ',
    'なまみ',
    'なみだ',
    'なめらか',
    'なめる',
    'なやむ',
    'ならう',
    'ならび',
    'ならぶ',
    'なれる',
    'なわとび',
    'なわばり',
    'にあう',
    'にいがた',
    'にうけ',
    'におい',
    'にかい',
    'にがて',
    'にきび',
    'にくしみ',
    'にくまん',
    'にげる',
    'にさんかたんそ',
    'にしき',
    'にせもの',
    'にちじょう',
    'にちようび',
    'にっか',
    'にっき',
    'にっけい',
    'にっこう',
    'にっさん',
    'にっしょく',
    'にっすう',
    'にっせき',
    'にってい',
    'になう',
    'にほん',
    'にまめ',
    'にもつ',
    'にやり',
    'にゅういん',
    'にりんしゃ',
    'にわとり',
    'にんい',
    'にんか',
    'にんき',
    'にんげん',
    'にんしき',
    'にんずう',
    'にんそう',
    'にんたい',
    'にんち',
    'にんてい',
    'にんにく',
    'にんぷ',
    'にんまり',
    'にんむ',
    'にんめい',
    'にんよう',
    'ぬいくぎ',
    'ぬかす',
    'ぬぐいとる',
    'ぬぐう',
    'ぬくもり',
    'ぬすむ',
    'ぬまえび',
    'ぬめり',
    'ぬらす',
    'ぬんちゃく',
    'ねあげ',
    'ねいき',
    'ねいる',
    'ねいろ',
    'ねぐせ',
    'ねくたい',
    'ねくら',
    'ねこぜ',
    'ねこむ',
    'ねさげ',
    'ねすごす',
    'ねそべる',
    'ねだん',
    'ねつい',
    'ねっしん',
    'ねつぞう',
    'ねったいぎょ',
    'ねぶそく',
    'ねふだ',
    'ねぼう',
    'ねほりはほり',
    'ねまき',
    'ねまわし',
    'ねみみ',
    'ねむい',
    'ねむたい',
    'ねもと',
    'ねらう',
    'ねわざ',
    'ねんいり',
    'ねんおし',
    'ねんかん',
    'ねんきん',
    'ねんぐ',
    'ねんざ',
    'ねんし',
    'ねんちゃく',
    'ねんど',
    'ねんぴ',
    'ねんぶつ',
    'ねんまつ',
    'ねんりょう',
    'ねんれい',
    'のいず',
    'のおづま',
    'のがす',
    'のきなみ',
    'のこぎり',
    'のこす',
    'のこる',
    'のせる',
    'のぞく',
    'のぞむ',
    'のたまう',
    'のちほど',
    'のっく',
    'のばす',
    'のはら',
    'のべる',
    'のぼる',
    'のみもの',
    'のやま',
    'のらいぬ',
    'のらねこ',
    'のりもの',
    'のりゆき',
    'のれん',
    'のんき',
    'ばあい',
    'はあく',
    'ばあさん',
    'ばいか',
    'ばいく',
    'はいけん',
    'はいご',
    'はいしん',
    'はいすい',
    'はいせん',
    'はいそう',
    'はいち',
    'ばいばい',
    'はいれつ',
    'はえる',
    'はおる',
    'はかい',
    'ばかり',
    'はかる',
    'はくしゅ',
    'はけん',
    'はこぶ',
    'はさみ',
    'はさん',
    'はしご',
    'ばしょ',
    'はしる',
    'はせる',
    'ぱそこん',
    'はそん',
    'はたん',
    'はちみつ',
    'はつおん',
    'はっかく',
    'はづき',
    'はっきり',
    'はっくつ',
    'はっけん',
    'はっこう',
    'はっさん',
    'はっしん',
    'はったつ',
    'はっちゅう',
    'はってん',
    'はっぴょう',
    'はっぽう',
    'はなす',
    'はなび',
    'はにかむ',
    'はぶらし',
    'はみがき',
    'はむかう',
    'はめつ',
    'はやい',
    'はやし',
    'はらう',
    'はろうぃん',
    'はわい',
    'はんい',
    'はんえい',
    'はんおん',
    'はんかく',
    'はんきょう',
    'ばんぐみ',
    'はんこ',
    'はんしゃ',
    'はんすう',
    'はんだん',
    'ぱんち',
    'ぱんつ',
    'はんてい',
    'はんとし',
    'はんのう',
    'はんぱ',
    'はんぶん',
    'はんぺん',
    'はんぼうき',
    'はんめい',
    'はんらん',
    'はんろん',
    'ひいき',
    'ひうん',
    'ひえる',
    'ひかく',
    'ひかり',
    'ひかる',
    'ひかん',
    'ひくい',
    'ひけつ',
    'ひこうき',
    'ひこく',
    'ひさい',
    'ひさしぶり',
    'ひさん',
    'びじゅつかん',
    'ひしょ',
    'ひそか',
    'ひそむ',
    'ひたむき',
    'ひだり',
    'ひたる',
    'ひつぎ',
    'ひっこし',
    'ひっし',
    'ひつじゅひん',
    'ひっす',
    'ひつぜん',
    'ぴったり',
    'ぴっちり',
    'ひつよう',
    'ひてい',
    'ひとごみ',
    'ひなまつり',
    'ひなん',
    'ひねる',
    'ひはん',
    'ひびく',
    'ひひょう',
    'ひほう',
    'ひまわり',
    'ひまん',
    'ひみつ',
    'ひめい',
    'ひめじし',
    'ひやけ',
    'ひやす',
    'ひよう',
    'びょうき',
    'ひらがな',
    'ひらく',
    'ひりつ',
    'ひりょう',
    'ひるま',
    'ひるやすみ',
    'ひれい',
    'ひろい',
    'ひろう',
    'ひろき',
    'ひろゆき',
    'ひんかく',
    'ひんけつ',
    'ひんこん',
    'ひんしゅ',
    'ひんそう',
    'ぴんち',
    'ひんぱん',
    'びんぼう',
    'ふあん',
    'ふいうち',
    'ふうけい',
    'ふうせん',
    'ぷうたろう',
    'ふうとう',
    'ふうふ',
    'ふえる',
    'ふおん',
    'ふかい',
    'ふきん',
    'ふくざつ',
    'ふくぶくろ',
    'ふこう',
    'ふさい',
    'ふしぎ',
    'ふじみ',
    'ふすま',
    'ふせい',
    'ふせぐ',
    'ふそく',
    'ぶたにく',
    'ふたん',
    'ふちょう',
    'ふつう',
    'ふつか',
    'ふっかつ',
    'ふっき',
    'ふっこく',
    'ぶどう',
    'ふとる',
    'ふとん',
    'ふのう',
    'ふはい',
    'ふひょう',
    'ふへん',
    'ふまん',
    'ふみん',
    'ふめつ',
    'ふめん',
    'ふよう',
    'ふりこ',
    'ふりる',
    'ふるい',
    'ふんいき',
    'ぶんがく',
    'ぶんぐ',
    'ふんしつ',
    'ぶんせき',
    'ふんそう',
    'ぶんぽう',
    'へいあん',
    'へいおん',
    'へいがい',
    'へいき',
    'へいげん',
    'へいこう',
    'へいさ',
    'へいしゃ',
    'へいせつ',
    'へいそ',
    'へいたく',
    'へいてん',
    'へいねつ',
    'へいわ',
    'へきが',
    'へこむ',
    'べにいろ',
    'べにしょうが',
    'へらす',
    'へんかん',
    'べんきょう',
    'べんごし',
    'へんさい',
    'へんたい',
    'べんり',
    'ほあん',
    'ほいく',
    'ぼうぎょ',
    'ほうこく',
    'ほうそう',
    'ほうほう',
    'ほうもん',
    'ほうりつ',
    'ほえる',
    'ほおん',
    'ほかん',
    'ほきょう',
    'ぼきん',
    'ほくろ',
    'ほけつ',
    'ほけん',
    'ほこう',
    'ほこる',
    'ほしい',
    'ほしつ',
    'ほしゅ',
    'ほしょう',
    'ほせい',
    'ほそい',
    'ほそく',
    'ほたて',
    'ほたる',
    'ぽちぶくろ',
    'ほっきょく',
    'ほっさ',
    'ほったん',
    'ほとんど',
    'ほめる',
    'ほんい',
    'ほんき',
    'ほんけ',
    'ほんしつ',
    'ほんやく',
    'まいにち',
    'まかい',
    'まかせる',
    'まがる',
    'まける',
    'まこと',
    'まさつ',
    'まじめ',
    'ますく',
    'まぜる',
    'まつり',
    'まとめ',
    'まなぶ',
    'まぬけ',
    'まねく',
    'まほう',
    'まもる',
    'まゆげ',
    'まよう',
    'まろやか',
    'まわす',
    'まわり',
    'まわる',
    'まんが',
    'まんきつ',
    'まんぞく',
    'まんなか',
    'みいら',
    'みうち',
    'みえる',
    'みがく',
    'みかた',
    'みかん',
    'みけん',
    'みこん',
    'みじかい',
    'みすい',
    'みすえる',
    'みせる',
    'みっか',
    'みつかる',
    'みつける',
    'みてい',
    'みとめる',
    'みなと',
    'みなみかさい',
    'みねらる',
    'みのう',
    'みのがす',
    'みほん',
    'みもと',
    'みやげ',
    'みらい',
    'みりょく',
    'みわく',
    'みんか',
    'みんぞく',
    'むいか',
    'むえき',
    'むえん',
    'むかい',
    'むかう',
    'むかえ',
    'むかし',
    'むぎちゃ',
    'むける',
    'むげん',
    'むさぼる',
    'むしあつい',
    'むしば',
    'むじゅん',
    'むしろ',
    'むすう',
    'むすこ',
    'むすぶ',
    'むすめ',
    'むせる',
    'むせん',
    'むちゅう',
    'むなしい',
    'むのう',
    'むやみ',
    'むよう',
    'むらさき',
    'むりょう',
    'むろん',
    'めいあん',
    'めいうん',
    'めいえん',
    'めいかく',
    'めいきょく',
    'めいさい',
    'めいし',
    'めいそう',
    'めいぶつ',
    'めいれい',
    'めいわく',
    'めぐまれる',
    'めざす',
    'めした',
    'めずらしい',
    'めだつ',
    'めまい',
    'めやす',
    'めんきょ',
    'めんせき',
    'めんどう',
    'もうしあげる',
    'もうどうけん',
    'もえる',
    'もくし',
    'もくてき',
    'もくようび',
    'もちろん',
    'もどる',
    'もらう',
    'もんく',
    'もんだい',
    'やおや',
    'やける',
    'やさい',
    'やさしい',
    'やすい',
    'やすたろう',
    'やすみ',
    'やせる',
    'やそう',
    'やたい',
    'やちん',
    'やっと',
    'やっぱり',
    'やぶる',
    'やめる',
    'ややこしい',
    'やよい',
    'やわらかい',
    'ゆうき',
    'ゆうびんきょく',
    'ゆうべ',
    'ゆうめい',
    'ゆけつ',
    'ゆしゅつ',
    'ゆせん',
    'ゆそう',
    'ゆたか',
    'ゆちゃく',
    'ゆでる',
    'ゆにゅう',
    'ゆびわ',
    'ゆらい',
    'ゆれる',
    'ようい',
    'ようか',
    'ようきゅう',
    'ようじ',
    'ようす',
    'ようちえん',
    'よかぜ',
    'よかん',
    'よきん',
    'よくせい',
    'よくぼう',
    'よけい',
    'よごれる',
    'よさん',
    'よしゅう',
    'よそう',
    'よそく',
    'よっか',
    'よてい',
    'よどがわく',
    'よねつ',
    'よやく',
    'よゆう',
    'よろこぶ',
    'よろしい',
    'らいう',
    'らくがき',
    'らくご',
    'らくさつ',
    'らくだ',
    'らしんばん',
    'らせん',
    'らぞく',
    'らたい',
    'らっか',
    'られつ',
    'りえき',
    'りかい',
    'りきさく',
    'りきせつ',
    'りくぐん',
    'りくつ',
    'りけん',
    'りこう',
    'りせい',
    'りそう',
    'りそく',
    'りてん',
    'りねん',
    'りゆう',
    'りゅうがく',
    'りよう',
    'りょうり',
    'りょかん',
    'りょくちゃ',
    'りょこう',
    'りりく',
    'りれき',
    'りろん',
    'りんご',
    'るいけい',
    'るいさい',
    'るいじ',
    'るいせき',
    'るすばん',
    'るりがわら',
    'れいかん',
    'れいぎ',
    'れいせい',
    'れいぞうこ',
    'れいとう',
    'れいぼう',
    'れきし',
    'れきだい',
    'れんあい',
    'れんけい',
    'れんこん',
    'れんさい',
    'れんしゅう',
    'れんぞく',
    'れんらく',
    'ろうか',
    'ろうご',
    'ろうじん',
    'ろうそく',
    'ろくが',
    'ろこつ',
    'ろじうら',
    'ろしゅつ',
    'ろせん',
    'ろてん',
    'ろめん',
    'ろれつ',
    'ろんぎ',
    'ろんぱ',
    'ろんぶん',
    'ろんり',
    'わかす',
    'わかめ',
    'わかやま',
    'わかれる',
    'わしつ',
    'わじまし',
    'わすれもの',
    'わらう',
    'われる'
]

function loadWords(): string[] {
    return data.map((w) => w.normalize('NFKD'))
}

let wordlist: null | LangJa = null

/**
 *  The [[link-bip39-ja]] for [mnemonic phrases](link-bip-39).
 *
 *  @_docloc: api/wordlists
 */
export class LangJa extends Wordlist {
    /**
     *  Creates a new instance of the Japanese language Wordlist.
     *
     *  This should be unnecessary most of the time as the exported
     *  [[langJa]] should suffice.
     *
     *  @_ignore:
     */
    constructor() {
        super('ja')
    }

    getWord(index: number): string {
        const words = loadWords()
        assertArgument(index >= 0 && index < words.length, `invalid word index: ${index}`, 'index', index)
        return words[index]
    }

    getWordIndex(word: string): number {
        return loadWords().indexOf(word)
    }

    split(phrase: string): string[] {
        return phrase.split(' ')
    }

    join(words: string[]): string {
        return words.join(' ')
    }

    /**
     *  Returns a singleton instance of a ``LangJa``, creating it
     *  if this is the first time being called.
     */
    static wordlist(): LangJa {
        if (wordlist == null) {
            wordlist = new LangJa()
        }
        return wordlist
    }
}
