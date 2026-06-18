const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const readingPool = [
  {
    content: ["The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs. Climate change is the greatest threat to the reef, causing widespread coral bleaching."],
    q1_text: "The Great Barrier Reef is threatened by climate change.", q1_ans: "True", q1_type: "tfng",
    q2_text: "How many individual reefs compose the Great Barrier Reef? (Điền số)", q2_ans: "2900", q2_type: "text"
  },
  {
    content: ["Marie Curie was a physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win a Nobel in two scientific fields."],
    q1_text: "Marie Curie won Nobel Prizes in three different fields.", q1_ans: "False", q1_type: "tfng",
    q2_text: "What did Marie Curie research? (Điền 1 từ)", q2_ans: "radioactivity", q2_type: "text"
  },
  {
    content: ["The Industrial Revolution, which began in Britain in the late 18th century, marked a major turning point in history. Almost every aspect of daily life was influenced in some way, particularly manufacturing."],
    q1_text: "The Industrial Revolution started in the 19th century.", q1_ans: "False", q1_type: "tfng",
    q2_text: "Which sector was particularly influenced? (Điền 1 từ)", q2_ans: "manufacturing", q2_type: "text"
  },
  {
    content: ["Electric vehicles (EVs) are becoming increasingly popular as a means to reduce carbon emissions. However, the lack of charging infrastructure remains a significant barrier to widespread adoption."],
    q1_text: "EVs help to reduce carbon emissions.", q1_ans: "True", q1_type: "tfng",
    q2_text: "What is a barrier to EV adoption? (Điền 2 từ)", q2_ans: "charging infrastructure", q2_type: "text"
  },
  {
    content: ["Sleep is essential for cognitive function and memory consolidation. Adults typically need 7 to 9 hours of sleep per night, though individual needs can vary."],
    q1_text: "Adults need exactly 8 hours of sleep per night.", q1_ans: "False", q1_type: "tfng",
    q2_text: "What does sleep help consolidate? (Điền 1 từ)", q2_ans: "memory", q2_type: "text"
  }
];

const writingPool = [
  {
    content: ["In IELTS Writing Task 2, using a variety of complex structures is crucial for a high band score. However, clarity should never be sacrificed for complexity."],
    q1_text: "Clarity is more important than complexity.", q1_ans: "True", q1_type: "tfng",
    q2_text: "What structures are crucial for a high score? (Điền 2 từ)", q2_ans: "complex structures", q2_type: "text"
  },
  {
    content: ["A common mistake in Writing Task 1 is failing to include an overview. The overview should summarise the main trends or differences shown in the chart."],
    q1_text: "An overview is not necessary in Task 1.", q1_ans: "False", q1_type: "tfng",
    q2_text: "What should the overview summarise? (Điền 2 từ)", q2_ans: "main trends", q2_type: "text"
  },
  {
    content: ["Linking words like 'furthermore' and 'moreover' are used to add information, while 'however' and 'on the other hand' introduce contrasting ideas."],
    q1_text: "'However' is used to add information.", q1_ans: "False", q1_type: "tfng",
    q2_text: "Which word introduces contrasting ideas? (Điền 1 từ)", q2_ans: "however", q2_type: "text"
  },
  {
    content: ["When discussing causes and effects, vocabulary such as 'result in', 'lead to', and 'stem from' are extremely useful for demonstrating range."],
    q1_text: "'Stem from' is used to discuss causes.", q1_ans: "True", q1_type: "tfng",
    q2_text: "What do these phrases demonstrate? (Điền 1 từ)", q2_ans: "range", q2_type: "text"
  }
];

const grammarPool = [
  {
    content: ["The Present Perfect tense is used to describe actions that started in the past and continue to the present, or actions with a result in the present."],
    q1_text: "Chia động từ: I (work) ______ here for five years.", q1_ans: "have worked", q1_type: "text",
    q2_text: "Present Perfect focuses on the exact time an action happened.", q2_ans: "False", q2_type: "tfng"
  },
  {
    content: ["Relative clauses provide extra information about a noun. 'Who' is used for people, 'which' for things, and 'where' for places."],
    q1_text: "Điền từ: The book ______ I bought yesterday is great.", q1_ans: "which", q1_type: "text",
    q2_text: "'Who' can be used for animals.", q2_ans: "False", q2_type: "tfng"
  },
  {
    content: ["Conditionals express hypothetical situations. The Second Conditional (If + past, would + base verb) describes unreal present situations."],
    q1_text: "Chia động từ: If I (have) ______ a million dollars, I would travel the world.", q1_ans: "had", q1_type: "text",
    q2_text: "The Second Conditional is used for realistic future events.", q2_ans: "False", q2_type: "tfng"
  },
  {
    content: ["Passive voice shifts the focus from the 'doer' of an action to the 'receiver'. It is heavily used in Academic Writing Task 1 to describe processes."],
    q1_text: "Chuyển sang bị động: People speak English here -> English ______ here.", q1_ans: "is spoken", q1_type: "text",
    q2_text: "Passive voice focuses on the doer.", q2_ans: "False", q2_type: "tfng"
  },
  {
    content: ["Articles (a/an/the) are notoriously difficult. 'The' is used for specific nouns that the listener already knows."],
    q1_text: "Điền mạo từ: I saw ______ moon last night.", q1_ans: "the", q1_type: "text",
    q2_text: "'A' is used for plural nouns.", q2_ans: "False", q2_type: "tfng"
  }
];

const vocabPool = [
  {
    content: ["Collocations are words that naturally go together. For example, we say 'make a mistake' not 'do a mistake'."],
    q1_text: "We say 'do a mistake'.", q1_ans: "False", q1_type: "tfng",
    q2_text: "Điền động từ: ______ an effort.", q2_ans: "make", q2_type: "text"
  },
  {
    content: ["Idioms should be used carefully in IELTS Speaking, and generally avoided in IELTS Writing because they are informal."],
    q1_text: "Idioms are great for IELTS Writing.", q1_ans: "False", q1_type: "tfng",
    q2_text: "In which skill should idioms be used carefully? (Điền 1 từ)", q2_ans: "speaking", q2_type: "text"
  },
  {
    content: ["Paraphrasing is the skill of rewriting a phrase using different words while keeping the same meaning. It shows vocabulary flexibility."],
    q1_text: "Paraphrasing means changing the core meaning of a sentence.", q1_ans: "False", q1_type: "tfng",
    q2_text: "What does paraphrasing show? (Điền 1 từ)", q2_ans: "flexibility", q2_type: "text"
  }
];

function getPoolItem(pool, dayIndex) {
  // Use dayIndex to cyclically pick an item, so it looks random but is deterministic
  return pool[dayIndex % pool.length];
}

function generateMiniPractice(routeId, weekIndex, dayIndex, topic, task) {
  const idStr = `mini_${routeId}_w${weekIndex}_d${dayIndex}`;
  const lowerTopic = topic.toLowerCase();
  const lowerTask = task.toLowerCase();
  
  let practice = {
    id: idStr,
    title: `Mini-test Ngày ${dayIndex}: ${task}`,
    content: [],
    questions: []
  };

  let selectedItem;

  // Determine which pool to use
  if (lowerTopic.includes('reading') || lowerTask.includes('reading') || lowerTask.includes('skimming') || lowerTask.includes('scanning')) {
    selectedItem = getPoolItem(readingPool, dayIndex + weekIndex);
  } else if (lowerTopic.includes('writing') || lowerTask.includes('writing') || lowerTopic.includes('paragraph') || lowerTask.includes('task')) {
    selectedItem = getPoolItem(writingPool, dayIndex + weekIndex);
  } else if (lowerTopic.includes('grammar') || lowerTask.includes('tenses') || lowerTask.includes('sentence') || lowerTask.includes('noun') || lowerTask.includes('verb')) {
    selectedItem = getPoolItem(grammarPool, dayIndex + weekIndex);
  } else {
    selectedItem = getPoolItem(vocabPool, dayIndex + weekIndex);
  }

  practice.content = selectedItem.content;
  practice.questions = [
    {
      id: `${idStr}_q1`,
      text: selectedItem.q1_text,
      type: selectedItem.q1_type,
      answer: selectedItem.q1_ans
    },
    {
      id: `${idStr}_q2`,
      text: selectedItem.q2_text,
      type: selectedItem.q2_type,
      answer: selectedItem.q2_ans
    }
  ];

  return practice;
}

function processRoute(routeArray, routeId) {
  routeArray.forEach(week => {
    if (week.daily_plan) {
      week.daily_plan.forEach(day => {
        // Sinh bài tập luyện tập
        day.practice = generateMiniPractice(routeId, week.week, day.day, week.topic, day.task);
      });
    }
  });
}

processRoute(data.route_a, 'A');
processRoute(data.route_b, 'B');

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Successfully generated DYNAMIC 112 mini practice tests!');
