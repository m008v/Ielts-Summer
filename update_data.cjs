const fs = require('fs');

const passage = {
  id: "passage_1",
  title: "Passage 1 - Short-form videos and attention",
  content: [
    "In the last decade, short-form video platforms have become one of the most influential forms of entertainment for teenagers. Their appeal is easy to understand. Videos are brief, visually engaging, and often personalised by algorithms that learn what each user is likely to watch next. For a tired student, opening an app and watching a few clips may feel like a harmless way to relax after school.",
    "However, some educators have become concerned about the effect of this habit on students' attention. The problem is not simply that young people are \"lazy\" or that entertainment is bad. Rather, short videos provide frequent rewards in a very compressed form. A joke, a surprising fact, a dance, a dramatic story and an advertisement can all appear within a few minutes. When the brain becomes used to this pace, slower tasks such as reading a long article or writing an essay may feel unusually demanding.",
    "This does not mean that short-form content is always harmful. Some teachers use short videos to introduce new topics, demonstrate scientific processes or make historical events more memorable. A well-designed one-minute video can spark curiosity and help students approach a subject they previously found boring. The educational value depends largely on whether the video is used as a doorway into deeper learning or as a replacement for it.",
    "Another issue is the social nature of these platforms. Teenagers do not only watch videos; they also comment on them, share them and compare their lives with the lives of others. This can create a feeling of connection, especially for students who are shy or isolated at school. Yet it can also increase anxiety when users constantly compare themselves with people who appear more attractive, successful or confident.",
    "For parents and teachers, banning short videos completely may not be realistic. A more useful approach is to help students become aware of how they use these platforms. This might include setting time limits, turning off notifications during study periods, and discussing the difference between active learning and passive scrolling. The goal is not to remove entertainment from students' lives, but to make sure it does not quietly train them to avoid every task that requires patience."
  ],
  questions: [
    { id: 1, type: "tfng", text: "1. Short-form videos are usually personalised by algorithms.", answer: "True" },
    { id: 2, type: "tfng", text: "2. The passage says teenagers watch short videos mainly because they are lazy.", answer: "False" },
    { id: 3, type: "tfng", text: "3. Short videos can sometimes be used to introduce educational topics.", answer: "True" },
    { id: 4, type: "tfng", text: "4. Teachers in most countries have banned short videos in classrooms.", answer: "Not Given" },
    { id: 5, type: "tfng", text: "5. Social comparison on video platforms may increase anxiety.", answer: "True" },
    { id: 6, type: "tfng", text: "6. The writer believes entertainment should be removed from students' lives.", answer: "False" },
    { id: 7, type: "short", text: "7. What kind of tasks may feel unusually demanding after exposure to fast-paced videos?", answer: "reading a long article/writing an essay" },
    { id: 8, type: "short", text: "8. What can a well-designed one-minute video spark?", answer: "curiosity" },
    { id: 9, type: "short", text: "9. What do teenagers do with videos besides watching and commenting on them?", answer: "share them" },
    { id: 10, type: "short", text: "10. What should students turn off during study periods?", answer: "notifications" },
    { id: 11, type: "short", text: "11. What kind of scrolling does the passage contrast with active learning?", answer: "passive scrolling" },
    { id: 12, type: "short", text: "12. What quality do demanding tasks require?", answer: "patience" }
  ]
};

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
data.practice_tests = [passage];
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Successfully updated data.json');
