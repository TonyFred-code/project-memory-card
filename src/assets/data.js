const placeHolderData = [
  {
    code: 'U+1F923',
    character: '🤣',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F923.png',
    name: 'rolling on the floor laughing',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F602',
    character: '😂',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F602.png',
    name: 'face with tears of joy',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F642',
    character: '🙂',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F642.png',
    name: 'slightly smiling face',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F643',
    character: '🙃',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F643.png',
    name: 'upside-down face',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1FAE0',
    character: '🫠',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1FAE0.png',
    name: 'melting face',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F609',
    character: '😉',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F609.png',
    name: 'winking face',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F60A',
    character: '😊',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F60A.png',
    name: 'smiling face with smiling eyes',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F607',
    character: '😇',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F607.png',
    name: 'smiling face with halo',
    group: 'smileys_emotion',
    subgroup: 'face_smiling',
  },
  {
    code: 'U+1F970',
    character: '🥰',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F970.png',
    name: 'smiling face with hearts',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F60D',
    character: '😍',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F60D.png',
    name: 'smiling face with heart-eyes',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F929',
    character: '🤩',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F929.png',
    name: 'star-struck',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F618',
    character: '😘',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F618.png',
    name: 'face blowing a kiss',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F617',
    character: '😗',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F617.png',
    name: 'kissing face',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+263A',
    character: '☺',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B263A.png',
    name: 'smiling face',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F61A',
    character: '😚',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F61A.png',
    name: 'kissing face with closed eyes',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F619',
    character: '😙',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F619.png',
    name: 'kissing face with smiling eyes',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F972',
    character: '🥲',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F972.png',
    name: 'smiling face with tear',
    group: 'smileys_emotion',
    subgroup: 'face_affection',
  },
  {
    code: 'U+1F60B',
    character: '😋',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F60B.png',
    name: 'face savoring food',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F61B',
    character: '😛',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F61B.png',
    name: 'face with tongue',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F61C',
    character: '😜',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F61C.png',
    name: 'winking face with tongue',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F92A',
    character: '🤪',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F92A.png',
    name: 'zany face',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F61D',
    character: '😝',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F61D.png',
    name: 'squinting face with tongue',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F911',
    character: '🤑',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F911.png',
    name: 'money-mouth face',
    group: 'smileys_emotion',
    subgroup: 'face_tongue',
  },
  {
    code: 'U+1F917',
    character: '🤗',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F917.png',
    name: 'smiling face with open hands',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1F92D',
    character: '🤭',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F92D.png',
    name: 'face with hand over mouth',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1FAE2',
    character: '🫢',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1FAE2.png',
    name: 'face with open eyes and hand over mouth',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1FAE3',
    character: '🫣',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1FAE3.png',
    name: 'face with peeking eye',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1F92B',
    character: '🤫',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F92B.png',
    name: 'shushing face',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1F914',
    character: '🤔',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1F914.png',
    name: 'thinking face',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
  {
    code: 'U+1FAE1',
    character: '🫡',
    image:
      'https://api-ninjas-data.s3.us-west-2.amazonaws.com/emojis/U%2B1FAE1.png',
    name: 'saluting face',
    group: 'smileys_emotion',
    subgroup: 'face_hand',
  },
];

export default placeHolderData;
