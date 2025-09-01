const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {Configuration, OpenAI } = require('openai');
const UserBot = require('./models/UserBot');

require('dotenv').config();

// 🔑 Sun'iy intellekt sozlamalari
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔌 Telegram va MongoDB sozlamalari
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const ADMIN_ID = 5174150715;
const userStates = new Map(); // <chatId, "admin_contact">
const COMPANY_LAT = 41.00491343939893;
const COMPANY_LNG = 71.68375613581506;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB ulanildi'))
  .catch((err) => console.error('❌ MongoDB xatolik:', err.message));




// 📚 AI javob olish funksiyasi
async function getAIResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1' , 
      messages: [
        {
          role: 'system',
          content: `Siz Risola Travel Lux firmasining vakili sifatida foydalanuvchilarga ma'lumot beradigan administrator siz. Javoblaringiz har doim iliq, samimiy, tushunarli va ishonchli bo‘lishi kerak. O‘zbek tilida yozing, imloviy xatolarga yo‘l qo‘ymang. Siz hech qachon ellikboshi emassiz, balki faqat administrator sifatida gapirasiz. Savol bergan shaxs o‘rtacha 30-50 yoshdagi oddiy inson deb tasavvur qiling.
🌟 Paketlar:
1. 🌟"Risola" paket:
🕌 Madinada 3 yoki 4 kunduz turiladi  
- 3 mahal milliy taom beriladi  
- Mehmonxona Haramdan 150–200 metr uzoqlikda Saraya Harmony bo‘ladi  
🕋 Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 1–1.5 km uzoqlikda joylashgan  Anan mexmonxonasi
💰 Narxi 1250$
📞 Batafsil ma’lumot uchun: +998781134444

2. 🌟"Oilaviy" paket:
🕌 Madinada  3 kunduz turiladi  
- 2 mahal milliy taom beriladi 
- Mehmonxona Haramdan 150–200 metr uzoqlikda Saraya Harmony bo‘ladi  
🕋 Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 3–4 km uzoqlikda joylashgan Snood Marva 
💰 Narxi 1100$
📞 Batafsil ma’lumot uchun: +998781134444


6 kunlik paketi 🕋✈️

💰 Hapx: 750$

📅 Uchish: 4-sentyabr

🛫 Namangan reys:
🗺 Yo‘nalish: Namangan – Madina

🏨 Madinada mehmonxona: 
📍 150–200 metr atrofida Saraya Harmony
🗓 3 kun 
🍽 2 mahal milliy taom beriladi 

🏨 Makkada mehmonxona: 3 kun turadi
🏙 Sunud Marva: 3 km atrofida, 🚶♂️ 4 minutlik yo‘l
🏙 Sunud Dana: 5 km atrofida, 🚶♂️ 5 minutlik yo‘l
🏙 Abdulhafiz: 3 km atrofida, 🚶♂️ 6 minutlik yo‘l
🍛 3 mahal o‘zbek milliy taomi 

Shu 6 kunlik haqida sorasa javob ber


📦 *Bizning xizmatlarimiz:*
- Litsenziyalangan umra hizmati №0008
- Saudya Arabistoni vizasi.
- Borish va kelish aviachiptasi.  
- Ikki Haramga yaqin va qulay mehmonxonalar.  
- Shifokor xizmati.  
- 3 mahal mazali turli milliy taomlar (taomlar mehmonxonada tayyorlanadi).  
- Ilmli va tajribali guruh rahbari.
- Madina va Makkada qo'shimcha ishchi guruhi xizmati. 
- Maxsus kiyim-bosh va sumka,beydjik,umra qo'llanmasi.
- Aeroportdan kuzatish, Madina va Makkada kutib olish. 
- Zamonaviy so'nggi  rusumdagi avtobus xizmati. 
- Makka va Madinada qo'shimcha ziyoratlar (Shahidlar qabristoni,
   Islom tarixida birinchi qurilgan masjid,10 000 sahoba dafn qilingan qabriston,
   Odam Alayhissalom va Momo Havo uchrashgan joy,Payg'ambarimiz berkingan g'or,
   Shaytonga tosh otiladigan joy va boshqa ziyoratgohlar).

✈️ Parvozlar(reyslar,reslar):
📍 To‘g‘ridan-to‘g‘ri reyslar orqali amalga oshiriladi:
➡️ Namangan ➝ Madina
⬅️ Madina ➝ Namangan

📅 Parvoz sanalari:
🗓 4-sentyabr
🗓 11-sentyabr
🗓 18-sentyabr
🗓 25-sentyabr
🗓 2-oktyabr
🗓 9-oktyabr
🗓 16-oktyabr
🗓 23-oktyabr
🗓 30-oktyabr

Reyslar milliy aviakompaniya orqali amalga oshiriladi

Agar Toshkentdan reyslar bormi desa ha bor deysan va quyidagi telefon raqamlariga murojaat qiling deysan hamda Risola paketni taqdim qilasan 



 buni mijoz sorasa keyin bering agar soramasa indamang agar mijoz chegirma haqida sorasa @risola4444 akkauntiga murojaat qilishni so'rang

 Agar mijoz manzil haqida sorasa 📍 Manzil: Namangan shahri, Uychi ko'chasi 1-uy.\nMo'ljal: "Bahor" kinoteatri ro'parasida. ushbu bizning manzil 


 Har bir text tagida Risola bilan risoladagidek safar qiling! shu jumlani qo'shib ajralib turadigan qilib  qoraytirib yoz


 Iltimos, har bir javobingizda foydalanuvchiga mos, tushunarli tarzda ma’lumot bering va kiritilgan formatda bo'lsin.

 Agar mijoz gapini salom bilan boshlaydigan bolsa sen ham Assalomu Alaykum bilan boshla gapini agar mijoz salom bermay boshlasa ham gapini sen Assalomu Alaykum bilan boshla gapini

 Agar mijoz kril tilida yozsa krillda javob berilsin agar lotinda yozsa lotinda javob berilsin.

 Agar mijoz bo'lib to'lash haqida komentariya yozsa yoki shu mavzuda nimadir sorasa indama javob bermagin

 Agar mijoz katta skidkada oganla mi deyman shunday deb yozsa javob berma.

 Agar 6 kunlik paket haqida sorashsa 6 kunlik paketni taqdim qil bizda ajoyib yanglik deb.
 6 kunlik paket hozirda 4-sentyabr   sanasiga bor keyinchalikka ham tshkil qilish rejada bor deb javob berasan agar boshqa sanaga ham bormi 6 kunlik paket deyishsa 

 Agar grupppa yoki kanal adminlari yozsa yoki video yokida rasm tashlasa shunchaki sukut saqla

 Agar bir user senga yana qayta yozsa yoki gurux yoki kanalda bir user qayta savol sorasa yokida fikr bidirsa unga yana qayta savol hamda salom berma va iloji borichia har bir usernni eslab qol va savoliga javob ber, yani bir user oldin yozgan bolsa uni savolini eslab qol yokida fikrini

 Agar mijoz senga kiritilgandan boshqa oylardagi parvoz sanalarini sorasa va mijoz soragan oydagi sanalar senga hali malum bolmasa har oyning payshanba kuniga reyslar bor Namangandan Madianaga togridan togri deb javob beraver.

 Agar mijoz diniy masalada yozsa mutaxasislardan so'ralsa yaxshi bolishii tavsiya qil.

 Agar guruh raxbarlari haqida sorasa gurux raxbarlari O'zbekiston musulmonlari  diniy idorasi tomonidan ajratilayotganini ma'lum qil.

 Agar voyaga yetmagan bolalarni umraga olib borish haqida so'rasa voyaga yetmaganlarga xizmat ko'rsata olmasligimizni aytib uzr so'ra qo'yasan.

 Agar Jamoldin domlani qachon umraga borishlari haqida so'rasa borish sanalari endi ma'lum bo'lishini aytasan Risolada ishlayabdilarmi deb so'rasa ishlayabdi deb javob qilasan 

 Agar Toshkentdan oilaviy paket haqida so'rasa faqat risola paket mavjud deb javob ber.

 Agar boshqa viloyatlarda ofisimiz borligi haqida savol berilsa hozircha Namanganda yagona bosh ofisimiz bor deb javob qil.

 Agar Ishonch savdo turi orqali bo'lib to'lash haqida so'rasa quyidagi raqam bilan bog'lanishni aytasan. 

 Agar Madinada 4 kundan ko'p turish haqida so'rasa qyidagi raqam bilan bog'lanish haqida aytasan.

 Agar qizil dengiz Qur'on bosma xonasiga borish haqida sorasa dasturda yo'q ekanligini lekin ziyoratchilarni talabiga ko'ra bonus sifatida tashkil qilib berishimizni ma'lum qilasan.

 Agar xona joylashuvi haqida so'rasa 4 kishilik joylashuv ekanligini aytasan, alohida hona so'rasa qo'shimcha to'lov orqai tashkil qilib berishimizni ma'lum qilasan.

 Uchish va qaytish soatlari haqida so'rasa quyidagi raqamga murojaat qiling deysan.

 Agar O'zbekiton hududidan tashqaridagi mijozlar murojaat qilsa telegram usernamemimizni berasan..

 Agar mijoz emoji tashlasa yoki biror videoga emoji hamda reaksiya bildirsa emoji orqali javob bermaysan.

 Agar adminlar yoki guruh egasi kanal yoki guruhga video yoki post joylasa unga javob berma hamda reaksiya bildirma.

`


        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.6, // 0.6 – barqaror va mantiqli javoblar uchun ideal
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error('❌ AI xatolik:', err.message);

    // Agar bu 429 yoki 404 bo‘lsa, foydalanuvchiga foydali xabar qaytarish:
    if (err.status === 429) {
      return '❗ Hozircha sunʼiy intellektdan foydalanish limiti oshib ketgan. Iltimos, birozdan so‘ng yana urinib ko‘ring.';
    }
    if (err.status === 404) {
      return '❗ Ushbu modelga kirish huquqiga ega emassiz. Iltimos, API sozlamalaringizni tekshiring.';
    }

    return '❗ Javob berishda texnik muammo yuz berdi. Iltimos, keyinroq yana urinib ko‘ring.';
  }
}




// 🟢 /start komandasi
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const keyboard = [
    [{ text: '📦 Xizmatlar', callback_data: 'xizmat' }],
    [{ text: '💳 Tariflar', callback_data: 'tariflar' }],
    [{ text: '🍽 Ovqatlar haqida', callback_data: 'ovqat' }],
    [{ text: '🛏 Sharoitlar', callback_data: 'sharoit' }],
    [{ text: '📍 Bizning manzil', callback_data: 'send_location' }],
    [{ text: '📞 Admin bilan bog‘lanish', callback_data: 'admin_contact' }]
  ];
  
  if (msg.from.id === ADMIN_ID) {
    keyboard.push([{ text: '🛠 Admin panel', callback_data: 'admin_panel' }]);
  }

  await bot.sendMessage(chatId, 'Assalomu alaykum! Bo‘limlardan birini tanlang:', {
    reply_markup: { inline_keyboard: keyboard }
  });
});

// 🔁 Har qanday xabarni qabul qilish
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || '';
    const { id, first_name, username } = msg.from;

  // Boshqa kodlardan oldin saqlab qo'yamiz
  try {
    const exists = await UserBot.findOne({ userId: id });
    if (!exists) {
      await UserBot.create({
        userId: id,
        firstName: first_name,
        username: username
      });
    }
  } catch (err) {
    console.error('Foydalanuvchini saqlashda xatolik:', err.message);
  }

  
  
// / 🔁 Kanalga ulangan guruhdagi kommentariyaga AI javob berish
  if (
    msg.chat.type === 'supergroup' &&
    msg.reply_to_message &&
    msg.reply_to_message.sender_chat
  ) {
    try {
      const aiReply = await getAIResponse(text);
      await bot.sendMessage(chatId, aiReply, {
        reply_to_message_id: msg.message_id
      });
    } catch (error) {
      console.error('❌ Kanal komment javobida xato:', error.message);
    }
    return;
  }

  // Admin javob qaytaryaptimi?
 const state = userStates.get(chatId);
  if (state && state.startsWith('replying_to_') && msg.from.id === ADMIN_ID && msg.reply_to_message) {
    const targetUserId = state.split('_')[2];
    await bot.sendMessage(targetUserId, `✉️ Admin javobi:\n${msg.text}`);
    await bot.sendMessage(chatId, '✅ Javob foydalanuvchiga yuborildi.');
    userStates.delete(chatId);
    return;
  }

  
  // Foydalanuvchi "admin bilan bog‘lanish" rejimida bo‘lsa
  if (userStates.get(chatId) === 'admin_contact') {
    await bot.sendMessage(ADMIN_ID, `📩 Yangi xabar:\n${msg.text}\n\n👤 ID: ${chatId}`, {
      reply_markup: { 
        inline_keyboard: [
           [{ text: '✉️ Javob yozish', callback_data: `reply_${chatId}` }],
          [{ text: '❌ Suhbatni tugatish', callback_data: `end_chat_${chatId}` }]
        ]
       }
    });
    await bot.sendMessage(chatId, '✅ Xabaringiz adminga yuborildi. Javobni shu yerda kuting.');

    userStates.delete(chatId); // holatini tozalaymiz
    return;
  }

  // AI javobi
  // if (text.length > 5) {
  //   const aiReply = await getAIResponse(text);
  //   await bot.sendMessage(chatId, aiReply);
  // } else {
  //   await bot.sendMessage(chatId, '🤖 Qanday yordam bera olishim mumkin? Iltimos, savolingizni yozing.');
  // }
});



// 🟢 Admin uchun /ai komanda (sun'iy intellektni sinash)
bot.onText(/\/ai (.+)/, async (msg, match) => {
  if (msg.from.id !== ADMIN_ID) return;
  const userInput = match[1];
  const aiResponse = await getAIResponse(userInput);
  await bot.sendMessage(msg.chat.id, `🤖 AI: ${aiResponse}`);
});

// 🔁 Oddiy foydalanuvchi matn yozsa
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text?.toLowerCase() || '';

//   // ✅ Kalit so‘z bo‘lsa — media yuboriladi
//   const matchedKeyword = keywords.find(word => text.includes(word));
//   if (matchedKeyword) {
//     await bot.sendMessage(chatId, `📦 Bu *${matchedKeyword}* bo‘yicha maʼlumotlar:`, { parse_mode: 'Markdown' });
//     await sendAllMediaToUser(chatId);
//     return;
//   }

//   // 🔮 Kalit so‘z topilmasa — AI javobi qaytariladi
//   if (text.length > 5) {
//     const aiReply = await getAIResponse(text);
//     await bot.sendMessage(chatId, aiReply);
//   } else {
//     await bot.sendMessage(chatId, "🤖 Qanday yordam bera olishim mumkin? Iltimos, savolingizni yozing.");
//   }
// });

// 🟢 Callback tugmalar uchun misol (boshqasini ham o‘zingiz qo‘shishingiz mumkin)
bot.on('callback_query', async (query) => {
  const userId = query.from.id;
  const data = query.data;
    if (data === 'admin_panel' && userId === ADMIN_ID) {
    const panelKeyboard = {
      inline_keyboard: [
        [{ text: '📊 Statistikani ko‘rish', callback_data: 'show_stats' }],
        [{ text: '👥 Foydalanuvchilar ro‘yxati', callback_data: 'user_list' }]
      ]
    };

    await bot.sendMessage(userId, "🛠 Admin paneliga xush kelibsiz!", {
      reply_markup: panelKeyboard
    });
  }

  else if (data === 'show_stats' && userId === ADMIN_ID) {
    const count = await UserBot.countDocuments();
    await bot.sendMessage(userId, `📊 Foydalanuvchilar soni: *${count}* ta`, {
      parse_mode: 'Markdown'
    });
  }

  else if (data === 'user_list' && userId === ADMIN_ID) {
    const users = await UserBot.find();
    const userList = users.map(u =>
      `🧑💻 ${u.firstName || ''} @${u.username || ''} [${u.userId}]`
    ).join('\n');

    await bot.sendMessage(userId,
      userList.length ? userList : '❌ Hali foydalanuvchilar yo‘q.');
  }

  if (data === 'xizmat') {
    await bot.sendMessage(userId,
       `📦 *Bizning xizmatlarimiz:*
- Litsenziyalangan umra hizmati №0008
- 3 oylik viza(Umra viza).
- 1 yillik viza(Sayyohlik vizasi)  
- Borish va kelish aviachiptasi.  
- Ikki Haramga yaqin va qulay mehmonxonalar.  
- Shifokor xizmati.  
- 3 mahal mazali turli milliy taomlar (taomlar mehmonxonada tayyorlanadi).  
- Ilmli va tajribali guruh rahbari.
- Madina va Makkada qo'shimcha ishchi guruhi xizmati. 
- Maxsus kiyim-bosh va sumka,beydjik,umra qo'llanmasi.
- Aeroportdan kuzatish, Madina va Makkada kutib olish. 
- Zamonaviy so'nggi  rusumdagi avtobus xizmati. 
- Makka va Madinada qo'shimcha ziyoratlar (Shahidlar qabristoni,
   Islom tarixida birinchi qurilgan masjid,10 000 sahoba dafn qilingan qabriston,
   Odam Alayhissalom va Momo Havo uchrashgan joy,Payg'ambarimiz berkingan g'or,
   Shaytonga tosh otiladigan joy va boshqa ziyoratgohlar).`, );
  } else if (data === 'tariflar') {
    await bot.sendMessage(userId, `💳 Bizda 2 xil paket mavjud: Oilaviy  va Risola . 

 💼 *"Oilaviy" paket:*

"Oilaviy" paket ichiga quyidagilar kiradi:
- Madinada 2 kecha va 3 kunduz turiladi  
- 2 mahal ovqat beriladi (nonushta va kechki) 
- Mehmonxonalar Haramdan 200–250 metr uzoqlikda bo‘ladi  

Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 3–4 km uzoqlikda joylashgan  
- Narxi 1075$


⭐ *"Risola" paket:*

"Risola" paket ichiga quyidagilar kiradi:
- Madinada 3 kecha va 4 kunduz turiladi  
- 3 mahal taom beriladi  
- Mehmonxonalar Haramdan 200–250 metr uzoqlikda bo‘ladi  

Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 1–1.5 km uzoqlikda joylashgan  
- Narxi 1250$

🕋Risola bilan risoladagidek safar qiling🕋
`
);
  } else if (data === 'ovqat') {
  await bot.answerCallbackQuery(query.id);

  const ovqatFolder = './media/ovqat';

  try {
    const ovqatFiles = fs.readdirSync(ovqatFolder);

    const media = ovqatFiles
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(file => ({
        type: 'photo',
        media: fs.createReadStream(`${ovqatFolder}/${file}`)
      }));

    if (media.length > 0) {
      const chunkSize = 10;
      for (let i = 0; i < media.length; i += chunkSize) {
        const chunk = media.slice(i, i + chunkSize);
        await bot.sendMediaGroup(userId, chunk);
      }

      await bot.sendMessage(userId, '🍽 Ovqatlarimiz rasmlarda ko‘rsatilgan. Yoqimli ishtaha!', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '💳 Tariflar', callback_data: 'tariflar' },
              { text: '🛏 Sharoitlar', callback_data: 'sharoit' }
            ],
           
          ]
        }
      });
    } else {
      await bot.sendMessage(userId, '❗ Ovqat rasmlari topilmadi.');
    }
  } catch (err) {
    console.error('❌ Ovqat rasmlarini yuborishda xatolik:', err.message);
    await bot.sendMessage(userId, '❌ Rasm yuborishda xatolik yuz berdi.');
  }


} else if (data === 'sharoit') {
  await bot.answerCallbackQuery(query.id);

  const sharoitFolder = './media/sharoit';

  try {
    const sharoitFiles = fs.readdirSync(sharoitFolder);

    const media = sharoitFiles
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(file => ({
        type: 'photo',
        media: fs.createReadStream(`${sharoitFolder}/${file}`)
      }));

    if (media.length > 0) {
      const chunkSize = 10;
      for (let i = 0; i < media.length; i += chunkSize) {
        const chunk = media.slice(i, i + chunkSize);
        await bot.sendMediaGroup(userId, chunk);
      }

      await bot.sendMessage(userId, '🛏 Sharoitlarimiz rasmlarda ko‘rsatilgan. Maroqli hordiq tilaymiz!', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '💳 Tariflar', callback_data: 'tariflar' },
              { text: '📦 Xizmatlar', callback_data: 'xizmat' }
            ],
           
          ]
        }
      });

    } else {
      await bot.sendMessage(userId, '❗ Sharoit rasmlari topilmadi.');
    }
  } catch (err) {
    console.error('❌ Sharoit rasmlarini yuborishda xatolik:', err.message);
    await bot.sendMessage(userId, '❌ Rasm yuborishda xatolik yuz berdi.');
  }

  }if (data === 'admin_contact') {
      userStates.set(userId, 'admin_contact');
      await bot.sendMessage(userId, '✍️ Xabaringizni yozing. Siz yuborgan har bir xabar adminga yetkaziladi. Javob ham shu bot orqali qaytadi.', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '❌ Suhbatni to‘xtatish', callback_data: 'cancel_chat' }]
          ]
        }
      });
      
    }else if (data === 'cancel_chat') {
  userStates.delete(userId);
  await bot.sendMessage(userId, '❌ Siz admin bilan suhbatni to‘xtatdingiz.');
} 

else if (data.startsWith('reply_') && userId === ADMIN_ID) {
  const targetUserId = data.split('_')[1];
  userStates.set(userId, `replying_to_${targetUserId}`);
  
  await bot.sendMessage(userId, `✍️ Foydalanuvchiga javob yozing:`, {
    reply_markup: {
      force_reply: true
    }
  });
 

    } else if (data.startsWith('end_chat_') && userId === ADMIN_ID) {
      const targetId = parseInt(data.split('_')[2]);
      userStates.delete(targetId);
      await bot.sendMessage(targetId, '❌ Admin siz bilan suhbatni to‘xtatdi.');
      await bot.sendMessage(userId, `✅ Foydalanuvchi bilan suhbat tugatildi (ID: ${targetId})`);
    
  userStates.set(userId, 'admin_contact');

}else if (data === 'send_location') {
  await bot.sendLocation(userId, COMPANY_LAT, COMPANY_LNG);
  await bot.sendMessage(
    userId,
    `📍 Manzil: Namangan shahri, Uychi ko'chasi 1-uy.\nMo'ljal: "Bahor" kinoteatri ro'parasida.`
  );
}else if (data === 'cancel_chat') {
  userStates.delete(userId);
  await bot.sendMessage(userId, '❌ Siz admin bilan suhbatni to‘xtatdingiz.');
}



  // } catch (err) {
  //   console.error('❌ Callback xatoligi:', err.message);
  // }

  await bot.answerCallbackQuery(query.id);
});






