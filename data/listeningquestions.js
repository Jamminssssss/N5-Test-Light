const listeningQuestions = [
    {
      question: '1 ばん',
      image: require('../assets/audioimages/audioquestionimage1.png'), // 이미지 경로
      audio: 'n5q1.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 3,
    },
    {
      question: '2 ばん',
      image: require('../assets/audioimages/audioquestionimage2.png'), // 이미지 경로
      audio: 'n5q2.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 1,
    },
    {
      question: '3 ばん',
      image: require('../assets/audioimages/audioquestionimage3.png'), // 이미지 경로
      audio: 'n5q3.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 4,
    },
    {
      question: '4 ばん',
      image: require('../assets/audioimages/audioquestionimage4.png'), // 이미지 경로
      audio: 'n5q4.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 2,
    },
    {
      question: '5 ばん',
      audio: 'n5q5.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'げつようび' },
        { id: 2, text: 'かようび' },
        { id: 3, text: 'もくようび' },
        { id: 4, text: 'きんようび' },
      ],
      correctAnswer: 1,
    },
    {
      question: '6 ばん',
      audio: 'n5q6.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '1 かいの 3 ばん' },
        { id: 2, text: '1 かいの 4 ばん' },
        { id: 3, text: '2 かいの 3 ばん' },
        { id: 4, text: '2 かいの 4 ばん' },
      ],
      correctAnswer: 4,
    },
    {
      question: '7 ばん',
      image: require('../assets/audioimages/audioquestionimage5.png'), // 이미지 경로
      audio: 'n5q7.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 3,
    },
    {
      question: '1 ばん',
      image: require('../assets/audioimages/audioquestionimage6.png'), // 이미지 경로
      audio: 'n5q8.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 4,
    },
    {
      question: '2 ばん',
      audio: 'n5q9.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'ひとり' },
        { id: 2, text: 'ふたり' },
        { id: 3, text: 'さんにん' },
        { id: 4, text: 'よにん' },
      ],
      correctAnswer: 1,
    },
    {
      question: '3 ばん',
      image: require('../assets/audioimages/audioquestionimage7.png'), // 이미지 경로
      audio: 'n5q10.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 3,
    },
    {
      question: '4 ばん',
      image: require('../assets/audioimages/audioquestionimage8.png'), // 이미지 경로
      audio: 'n5q11.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '①' },
        { id: 2, text: '②' },
        { id: 3, text: '③' },
        { id: 4, text: '④' },
      ],
      correctAnswer: 1,
    },
    {
      question: '5 ばん',
      audio: 'n5q12.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '1 じかんはん' },
        { id: 2, text: '3 じかんはん' },
        { id: 3, text: '5 じかん' },
        { id: 4, text: '6 じかん' },
      ],
      correctAnswer: 2,
    },
    {
      question: '6 ばん',
      audio: 'n5q13.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'カレー' },
        { id: 2, text: 'ピザ' },
        { id: 3, text: 'すし' },
        { id: 4, text: 'そば' },
      ],
      correctAnswer: 2,
    },
    {
      question: '1 ばん',
      image: require('../assets/audioimages/audioquestionimage9.png'), // 이미지 경로
      audio: 'n5q14.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'あまり休みません。' },
        { id: 2, text: '今いま、休んでいますか。' },
        { id: 3, text: '少すこし休みましょう。' },
      ],
      correctAnswer: 3,
    },
    {
      question: '2 ばん',
      image: require('../assets/audioimages/audioquestionimage10.png'), // 이미지 경로
      audio: 'n5q15.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'どんなチョコレートですか。' },
        { id: 2, text: 'チョコレート、あげませんか。' },
        { id: 3, text: 'チョコレート、いかがですか。' },
      ],
      correctAnswer: 3,
    },
    {
      question: '3 ばん',
      image: require('../assets/audioimages/audioquestionimage11.png'), // 이미지 경로
      audio: 'n5q16.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'あ、乗のります。' },
        { id: 2, text: 'さあ、乗のりましょう。' },
        { id: 3, text: 'すぐ乗のってください。' },
      ],
      correctAnswer: 1,
    },
    {
      question: '4 ばん',
      image: require('../assets/audioimages/audioquestionimage12.png'), // 이미지 경로
      audio: 'n5q17.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '見ませんよ。' },
        { id: 2, text: '危ないですよ。' },
        { id: 3, text: '痛いたいですよ。' },
      ],
      correctAnswer: 2,
    },
    {
      question: '5 ばん',
      image: require('../assets/audioimages/audioquestionimage13.png'), // 이미지 경로
      audio: 'n5q18.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'コーヒーを持ってきますよ。' },
        { id: 2, text: 'コーヒーはまだですか。' },
        { id: 3, text: 'コーヒーを飲みませんか。' },
      ],
      correctAnswer: 2,
    },
    {
      question: '1 ばん',
      audio: 'n5q192.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '去年です。' },
        { id: 2, text: '5時間です。' },
        { id: 3, text: '3か月です。' },
      ],
      correctAnswer: 1,
    },
    {
      question: '2 ばん',
      audio: 'n5q19.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'そうしましょう。' },
        { id: 2, text: '食堂ですよ。' },
        { id: 3, text: 'いえ、今からです。' },
      ],
      correctAnswer: 3,
    },
    {
      question: '3 ばん',
      audio: 'n5q20.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'デパートで 買いましょう。' },
        { id: 2, text: 'はい、そうです。' },
        { id: 3, text: 'わたしが 作りました。' },
      ],
      correctAnswer: 3,
    },
    {
      question: '4 ばん',
      audio: 'n5q21.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'はい、飛行機で 行いきますよ。' },
        { id: 2, text: '4時半の 飛行機です。' },
        { id: 3, text: '1時間ぐらい 乗ります。' },
      ],
      correctAnswer: 2,
    },
    {
      question: '5 ばん',
      audio: 'n5q22.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: 'はい、分かりますよ。' },
        { id: 2, text: 'え、知りませんでした。' },
        { id: 3, text: '電話をしていません。' },
      ],
      correctAnswer: 1,
    },
    {
      question: '6 ばん',
      audio: 'n5q23.mp3', // Android raw 리소스 파일 이름 (확장자 제외)
      options: [
        { id: 1, text: '旅行しましょう。' },
        { id: 2, text: 'どこへも行きませんでした。' },
        { id: 3, text: '外国から来きました。' },
      ],
      correctAnswer: 2,
    },
  ];
  
  export default listeningQuestions;
  