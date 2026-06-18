const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Helper function to generate deep dive markdown
function generateDeepDive(topic, task, detail) {
  let resources = [];
  const lowerTopic = topic.toLowerCase();
  const lowerTask = task.toLowerCase();

  if (lowerTopic.includes('reading') || lowerTask.includes('reading')) {
    resources = [
      "- 📖 [IELTS Reading Strategies (British Council)](https://takeielts.britishcouncil.org/take-ielts/prepare/tips-videos/reading)",
      "- 📚 [Cambridge Dictionary Online](https://dictionary.cambridge.org/)",
      "- 📰 [BBC News - Practice Reading](https://www.bbc.com/news)"
    ];
  } else if (lowerTopic.includes('writing') || lowerTask.includes('writing')) {
    resources = [
      "- ✍️ [IELTS Simon Writing Task 2 Archive](https://www.ielts-simon.com/ielts-help-and-english-pr/ielts-writing-task-2/)",
      "- 📝 [Grammarly Blog: Writing Clear Sentences](https://www.grammarly.com/blog/)",
      "- 🏛️ [IELTS Liz - Writing Tips](https://ieltsliz.com/ielts-writing-task-2/)"
    ];
  } else if (lowerTopic.includes('speaking') || lowerTask.includes('speaking')) {
    resources = [
      "- 🗣️ [IELTS Speaking Band Descriptors (Official PDF)](https://www.ielts.org/-/media/pdfs/speaking-band-descriptors.ashx)",
      "- 🎙️ [BBC Learning English - Pronunciation](https://www.bbc.co.uk/learningenglish/english/features/pronunciation)",
      "- 🎬 [TED Talks (Luyện ngữ điệu và Idea)](https://www.ted.com/)"
    ];
  } else if (lowerTopic.includes('grammar') || lowerTask.includes('grammar') || lowerTopic.includes('sentence')) {
    resources = [
      "- 📘 [Cambridge English Grammar in Use](https://www.cambridge.org/gb/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/english-grammar-use-5th-edition)",
      "- 🧩 [British Council - English Grammar](https://learnenglish.britishcouncil.org/grammar)"
    ];
  } else {
    resources = [
      "- 🧠 [Oxford Learner's Dictionaries](https://www.oxfordlearnersdictionaries.com/)",
      "- 🌍 [IELTS Official Preparation Materials](https://www.ielts.org/for-test-takers/sample-test-questions)"
    ];
  }

  return `### 🎯 Mục tiêu Trọng tâm
Trong ngày hôm nay, nhiệm vụ chính của bạn là **${task}**. 
Yêu cầu cụ thể: *${detail}*

---

### 📚 Hướng dẫn Thực hành Chi tiết
Để hoàn thành tốt nội dung của ngày hôm nay, hãy làm theo các bước chuẩn hoá sau:

1. **Bước 1: Rà soát & Chuẩn bị (10 Phút)**
   - Đừng vội vàng lao vào làm bài tập ngay. Hãy dành ít phút để đọc lại lý thuyết nền tảng liên quan đến **${topic}**.
   - Nếu đây là kỹ năng bạn đang yếu, hãy tự hỏi: *Lỗi sai thường gặp nhất của mình ở phần này là gì?* (Ví dụ: Hay sai thì, viết lan man, hay đọc chậm do dịch tiếng Việt).

2. **Bước 2: Tập trung sâu - Deep Work (30-45 Phút)**
   - **Môi trường:** Tắt mọi thông báo điện thoại, đóng các tab mạng xã hội.
   - **Thực thi:** Tiến hành hoàn thành nhiệm vụ: **${task}**. Quá trình này đòi hỏi sự tập trung cao độ, không vừa học vừa làm việc khác.

3. **Bước 3: Tự chấm & Rút kinh nghiệm (15 Phút)**
   - Sau khi làm xong, tuyệt đối không được bỏ qua bước check đáp án.
   - Ghi chú lại những từ vựng mới, những cụm ngữ pháp hay hoặc những lỗi sai ngớ ngẩn vào cuốn sổ **Bảng Lỗi (Error Log)**.

---

### 💡 Lời khuyên (Expert Tip)
> Khi bạn xử lý dạng bài về **${topic}**, một sai lầm rất phổ biến là cố gắng làm thật nhanh để lấy số lượng. Thay vào đó, ở giai đoạn này, hãy ưu tiên **Độ Chính Xác (Accuracy)** trước **Tốc Độ (Speed)**. Một câu viết đúng ngữ pháp hoàn toàn còn giá trị hơn một đoạn văn dài chi chít lỗi.

---

### 🔗 Nguồn Tài Liệu Bổ Trợ (Khuyên dùng)
Dưới đây là các tài liệu uy tín trên mạng đã được chọn lọc để giúp bạn hiểu sâu hơn về bài học hôm nay. Hãy click vào để tham khảo:
${resources.join('\n')}
`;
}

// Enhance Route A
data.route_a.forEach(week => {
  if (week.daily_plan) {
    week.daily_plan.forEach(day => {
      day.deep_dive = generateDeepDive(week.topic, day.task, day.detail);
    });
  }
});

// Enhance Route B
data.route_b.forEach(week => {
  if (week.daily_plan) {
    week.daily_plan.forEach(day => {
      day.deep_dive = generateDeepDive(week.topic, day.task, day.detail);
    });
  }
});

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Successfully expanded all daily plans with deep_dive markdown.');
