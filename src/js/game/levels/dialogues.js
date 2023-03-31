const dialogues = {
  benjamin: {
    npc: 'Benjamin',
    start: {
      name: 'benjamin',
      text: "Hello, traveler. I am the headman of this village. Do you know what's going on here?",
      next: 'message-1',
      answers: [
        // { text: 'Test answer 1', next: 'message-1' },
        // { text: 'Test answer 2', next: 'message-2' },
      ],
    },
    'message-1': {
      name: 'player',
      text: 'Yes, I heard that the residents left the village because of some incident.',
      next: 'message-2',
      answers: [],
    },
    'message-2': {
      name: 'benjamin',
      text: "Yes, it's true. We have been living in fear of the dungeon for several months and hope for salvation. Can you help us?",
      next: '',
      answers: [
        { text: 'Of course, I am ready to help.', next: 'message-3' },
        { text: 'I need to think.', next: 'message-4' },
      ],
    },
    'message-3': {
      name: 'benjamin',
      text: 'Great, I am very grateful for your help. The dungeon is to the east of here. Be careful, there are many dangers there.',
      next: 'message-5',
      answers: [],
    },
    'message-4': {
      name: 'benjamin',
      text: 'I understand that this is not an easy decision. But here not only our village is in danger, but also the whole neighborhood. Please consider your decision as soon as possible.',
      next: 'message-5',
      answers: [],
    },
    'message-5': {
      name: 'player',
      text: 'Hmm... I need more information.',
      next: '',
      answers: [
        {
          text: 'What dangers can be encountered on the way?',
          next: 'message-6',
        },
        {
          text: 'What kind of reward will I have for my help?',
          next: 'message-7',
        },
      ],
    },
    'message-6': {
      name: 'benjamin',
      text: "The dungeon is inhabited by various monsters and traps. But the most dangerous thing is the main villain who controls all these creatures. There were rumors that he wasn't human.",
      next: 'message-8',
      answers: [],
    },
    'message-7': {
      name: 'benjamin',
      text: 'I understand that you are not ready to risk your life for free. I offer you a generous reward if you can defeat the main villain and clear the dungeon of dangers.',
      next: 'message-8',
      answers: [],
    },
    'message-8': {
      name: 'player',
      text: 'Okay, I get it.',
      next: 'final',
      answers: [],
    },
    final: {
      name: 'benjamin',
      text: 'Be careful and good luck to you.',
      next: '',
      answers: [],
    },
  },
  merchant: {
    npc: 'Merchant',
    start: {
      name: 'merchant',
      text: 'Hello, traveler. What brings you to our village?',
      next: 'message-1',
      answers: [],
    },
    'message-1': {
      name: 'player',
      text: 'I heard rumors about a terrible accident. What happened here?',
      next: 'message-2',
      answers: [],
    },
    'message-2': {
      name: 'merchant',
      text: "Yes, we really need help. Evil appeared next to us in the dungeon, and the residents decided to leave. More precisely, those who were able to survive. I got injured and I can't handle the danger myself. But I am ready to provide you with my weapons if you decide to help us.",
      next: 'message-3',
      answers: [],
    },
    'message-3': {
      name: 'player',
      text: "I'm ready to help. How can I get into the dungeon?",
      next: 'message-4',
      answers: [],
    },
    'message-4': {
      name: 'merchant',
      text: 'I have a map and a key to the entrance. I will give you everything you need so that you can get to evil. Be careful, traveler. Evil is very dangerous.',
      next: 'message-5',
      answers: [],
    },
    'message-5': {
      name: 'player',
      text: 'Thanks for the warning. I will do everything in my power to protect your village.',
      next: 'final',
      answers: [],
    },
    final: {
      name: 'merchant',
      text: 'Thank you, traveler. I will pray for your safety and success in the battle against evil.',
      next: '',
      answers: [],
    },
  },
  eleni: {
    npc: 'Eleni',
    start: {
      name: 'eleni',
      text: 'Hello, traveler. Have you decided to help us? We need strong and brave people.',
      next: 'message-1',
      answers: [],
    },
    'message-1': {
      name: 'player',
      text: 'Yes, I heard about your trouble. What happened to you?',
      next: 'message-2',
      answers: [],
    },
    'message-2': {
      name: 'eleni',
      text: 'My husband died defending the village and me. I miraculously managed to survive and escape. I decided to stay to help Benjamin and Frank. But there are too few of us and we ourselves will not be able to cope with evil.',
      next: 'message-3',
      answers: [],
    },
    'message-3': {
      name: 'player',
      text: 'I understand, can you tell me anything else?',
      next: 'message-4',
      answers: [],
    },
    'message-4': {
      name: 'eleni',
      text: "I don't think so. I was too scared that night, you'd better talk to Benjamin or Frank.",
      next: 'message-5',
      answers: [],
    },
    'message-5': {
      name: 'player',
      text: "I wouldn't mind any help.",
      next: 'message-6',
      answers: [],
    },
    'message-6': {
      name: 'eleni',
      text: "I understand, but we can't find you a partner. Frank was seriously injured, and there were no other residents left.",
      next: 'message-7',
      answers: [],
    },
    'message-7': {
      name: 'player',
      text: "It's okay, I'll try to cope on my own.",
      next: 'final',
      answers: [],
    },
    final: {
      name: 'eleni',
      text: 'You are very brave, but be careful, evil is very dangerous. Let the apparent calmness not mislead you. Good luck to you.',
      next: '',
      answers: [],
    },
  },
};

export default dialogues;
