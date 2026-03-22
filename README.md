# Lab 7: Intro to TypeScript

## Commands

- `npm install`: installs any Node dependencies
- `npm run compile`: compiles the TypeScript program into a JavaScript program
- `npm run start` or `npm run start -- <arguments>`: runs the JavaScript program. NOTE: you will need to re-run `npm run compile` after you make changes to the program
- `npm run lint` or `npx ts-standard`: runs the `ts-standard` linter. If the linter finds errors, it can often automatically fix them using the `npx ts-standard --fix` command
- `npm run test`: runs the `jest` test framework. When your implementation is complete, all of the tests should pass
1. <img width="719" height="292" alt="Screenshot 2026-03-20 161355" src="https://github.com/user-attachments/assets/425272aa-3c42-4188-bc67-bf46e5dd3eb5" />
node.js болон TypeScript татаж суулгасан.
2. Test-д байсан нэг алдааг зассан.
<img width="1063" height="578" alt="Screenshot 2026-03-20 170540" src="https://github.com/user-attachments/assets/bc37f533-342b-48b8-b9f0-808a7d2b6df7" />
Даалгавар 1. Командын мөрийн интерфэйс хөгжүүлсэн.
npm run start -- --help командаар тусламжийн мэдээлэл гарч ирнэ.
npm run start -- cards/designpatterns.csv --order recent-mistakes-first командаар өмнөх үе дээр алдсан card-ууд эхэнд гарч ирнэ.
npm run start -- cards/designpatterns.csv --repetitions 2 командаар хэдэн удаа давтан асуухыг заана.
npm run start -- cards/designpatterns.csv --invertcards командаар хариултыг харуулж асуултыг нь хэрэглэгчээс асууна.
<img width="999" height="431" alt="image" src="https://github.com/user-attachments/assets/1bf8af42-d314-4156-912c-64253024ce5a" />
Даалгавар 2: Карт зохион байгуулагч interface тодорхойлж класуудаар хэрэгжүүлэх
 Өмнөх шатанд буруу хариулсан картууд эхэнд гарч ирнэ.
<img width="1543" height="910" alt="Screenshot 2026-03-21 161819" src="https://github.com/user-attachments/assets/16737ccc-7dad-4186-8209-6b6fb3fc336d" />
Даалгавар 3: Нэмэлт амжилтууд хэрэгжүүлэх.
Correct, Repeat, Confident амжилтуудыг нэмсэн.

